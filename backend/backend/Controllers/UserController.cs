using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Linq.Expressions;
using System.Runtime.InteropServices;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly MyDbContext _context;
        private readonly string _appSettings;

        public UserController(MyDbContext context, IConfiguration configuration)
        {
            _context = context;
            _appSettings = configuration["AppSettings:SecretKey"];
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Validate(LoginModel model)
        {
            var user = _context.Users.SingleOrDefault(p => p.PhoneNumber == model.PhoneNumber && p.Password == model.Password);
            if (user == null)
            {
                return Ok(new ApiResponse
                {
                    Success = false,
                    Message = "Invalid phonenumber/password",
                });
            }

            //cấp token
            var token = await GenerateToken(user);

            return Ok(new ApiResponse
            {
                Success = true,
                Message = "Authenticate success",
                Data = token
            });
        }

        private async Task<TokenModel> GenerateToken(User User)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var secretKeyBytes = Encoding.UTF8.GetBytes(_appSettings);

            var tokenDescription = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("UserName", User.UserName),
                    new Claim("PhoneNumber", User.PhoneNumber),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim("Id", User.UserId.ToString()),

                    //roles

                }),
                Expires = DateTime.UtcNow.AddMinutes(2),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(secretKeyBytes), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = jwtTokenHandler.CreateToken(tokenDescription);

            var accessToken = jwtTokenHandler.WriteToken(token);
            var refreshToken = GenerateRefreshToken();

            //Store in Database
            var refreshTokenEntity = new RefreshToken
            {
                Id = Guid.NewGuid(),
                JwtId = token.Id,
                Token = refreshToken,
                UserId = User.UserId,
                IsUsed = false,
                IsRevoked = false,
                IssueAt = DateTime.UtcNow,
                ExpireAt = DateTime.UtcNow.AddDays(1),
            };

            await _context.RefreshTokens.AddAsync(refreshTokenEntity);
            await _context.SaveChangesAsync();

            return new TokenModel
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken,
            };
        }
        private string GenerateRefreshToken()
        {
            var random = new byte[32];
            using (var randomNumber = RandomNumberGenerator.Create())
            {
                randomNumber.GetBytes(random);
                return Convert.ToBase64String(random);
            }
        }

        [HttpPost("RenewToken")]
        public async Task<IActionResult> RenewToken(TokenModel model)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var secretKeyBytes = Encoding.UTF8.GetBytes(_appSettings);
            var tokenValidateParam = new TokenValidationParameters
            {
                //tự cấp token
                ValidateIssuer = false,
                ValidateAudience = false,

                //ký vào token
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(secretKeyBytes),

                ClockSkew = TimeSpan.Zero,

                ValidateLifetime = false // dont check expired token
            };
            try
            {
                //check 1: AccessToken valid format
                var tokenInVerification = jwtTokenHandler.ValidateToken(model.AccessToken, tokenValidateParam, out var validatedToken);

                //check 2: Check algorithm
                if (validatedToken is JwtSecurityToken jwtSecurityToken)
                {
                    var result = jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase);
                    if (!result)
                    {
                        return Ok(new ApiResponse
                        {
                            Success = false,
                            Message = "Invalid token"
                        });
                    }
                }
                //check 3: Check accessToken expired?
                var utcExpireDate = long.Parse(tokenInVerification.Claims.FirstOrDefault(x =>
                x.Type == JwtRegisteredClaimNames.Exp).Value);

                var expireDate = ConvertUnixTimeToDateTime(utcExpireDate);
                if (expireDate > DateTime.UtcNow) 
                {
                    return Ok(new ApiResponse
                    {
                        Success = false,
                        Message = "Access token has not expired yet"
                    });
                }

                //check 4: Check refreshtoken exist in DB
                var storedToken = _context.RefreshTokens.FirstOrDefault(x => x.Token == model.RefreshToken);
                if (storedToken == null)
                {
                    return Ok(new ApiResponse
                    {
                        Success = false,
                        Message = "Refresh token does not exist"
                    });
                }

                //check 5: check refreshToken is used/revoked?
                if (storedToken.IsUsed)
                {
                    return Ok(new ApiResponse
                    {
                        Success = false,
                        Message = "Refresh token has been used"
                    });
                }
                if (storedToken.IsRevoked)
                {
                    return Ok(new ApiResponse
                    {
                        Success = false,
                        Message = "Refresh token has been revoked"
                    });
                }

                //check 6: access token match the refresh token
                var jti = tokenInVerification.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Jti).Value;
                if (storedToken.JwtId != jti)
                {
                    return Ok(new ApiResponse
                    {
                        Success = false,
                        Message = "Token does not match"
                    });
                }

                //update token is used
                storedToken.IsUsed = true;
                storedToken.IsRevoked = true;
                _context.Update(storedToken);
                await _context.SaveChangesAsync();

                //create new token
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserId == storedToken.UserId);
                var token = await GenerateToken(user);

                return Ok(new ApiResponse
                {
                    Success = true,
                    Message = "Renew token success",
                    Data = token
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse
                {
                    Success = false,
                    Message = "Something went wrong"
                });
            }
        }

        private DateTime ConvertUnixTimeToDateTime(long utcExpireDate)
        {
            var dateTimeInterval = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
            dateTimeInterval.AddSeconds(utcExpireDate).ToUniversalTime();
            return dateTimeInterval;
        }

        [HttpGet]
        public IActionResult Get(string? phone)
        {
            // Kiểm tra xem phone có giá trị không và có đúng định dạng không
            if (!string.IsNullOrEmpty(phone))
            {
                // Kiểm tra độ dài của phone và xác định rằng nó phải có 10 ký tự và tất cả là số
                if (phone.Length == 10 && phone.All(char.IsDigit) && phone.StartsWith("0"))
                {
                    var user = _context.Users.FirstOrDefault(u => u.PhoneNumber == phone);
                    if (user == null)
                    {
                        return NotFound(); // Trả về mã lỗi 404 nếu không tìm thấy user với số điện thoại đã cung cấp
                    }
                    return Ok(user); // Trả về user tìm thấy
                }
                else
                {
                    return BadRequest(); // Trả về mã lỗi 400 nếu số điện thoại không đúng định dạng
                }
            }
            else
            {
                var users = _context.Users.ToList();
                return Ok(users); // Trả về toàn bộ danh sách users nếu không có số điện thoại được cung cấp
            }
        }

        [HttpPost]
        public IActionResult AddUser([FromBody] User model)
        {
            var existingUser = _context.Users.FirstOrDefault(u => u.PhoneNumber == model.PhoneNumber);
            if (existingUser != null)
            {
                return Conflict(); // Trả về mã lỗi 409 nếu người dùng đã tồn tại
            }

            var user = new User
            {
                PhoneNumber = model.PhoneNumber,
                Password = model.Password,
                DiaChi = model.DiaChi,
                UserName = model.UserName
            };

            _context.Users.Add(user);
            _context.SaveChanges();

            return CreatedAtAction(nameof(Get), new { id = user.UserId }, user); // Trả về mã lỗi 201 nếu thành công
        }

        [HttpPut("{id}")]
        public IActionResult UpdateUser(int id, [FromBody] UserModel model)
        {
            // Kiểm tra xem model có hợp lệ không
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Tìm người dùng trong cơ sở dữ liệu bằng ID
            var user = _context.Users.FirstOrDefault(u => u.UserId == id);
            if (user == null)
            {
                return NotFound(); // Trả về mã lỗi 404 nếu không tìm thấy user với ID đã cung cấp
            }

            // Cập nhật thông tin người dùng với thông tin mới từ model
            user.UserName = model.UserName;
            user.PhoneNumber = model.PhoneNumber;
            user.Password = model.Password;
            user.DiaChi = model.DiaChi;
            // Cập nhật các trường thông tin khác tùy theo nhu cầu

            // Lưu thay đổi vào cơ sở dữ liệu
            _context.SaveChanges();

            return Ok(user); // Trả về thông tin người dùng sau khi được cập nhật
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            var user = _context.Users.FirstOrDefault(u => u.UserId == id);
            if (user == null)
            {
                return NotFound(); // Trả về mã lỗi 404 nếu không tìm thấy người dùng với ID đã cung cấp
            }

            _context.Users.Remove(user);
            _context.SaveChanges();

            return NoContent(); // Trả về mã lỗi 204 (No Content) nếu xóa thành công
        }
    }
}
