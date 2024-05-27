using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography.X509Certificates;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly MyDbContext _context;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        public UserController(MyDbContext context, UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Validate(LoginModel model)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.PhoneNumber == model.PhoneNumber);
            if (user == null)
            {
                return Ok(new ApiResponse
                {
                    Success = false,
                    Message = "Invalid phonenumber",
                });
            }

            var result = await _userManager.CheckPasswordAsync(user, model.Password);
            if (!result)
            {
                return Ok(new ApiResponse
                {
                    Success = false,
                    Message = "Wrong password",
                });
            }

            await _signInManager.SignInAsync(user, true);
            Console.Write(new ApiResponse
            {
                Success = true,
                Message = user.UserName,
                Data = await _userManager.GetRolesAsync(user),
            });
            return Ok(new ApiResponse
            {
                Success = true,
                Message = user.UserName,
                Data = await _userManager.GetRolesAsync(user),
            });
        }

        [Authorize(Roles = "admin")]
        [HttpGet]
        public async Task<IActionResult> Get(string? id)
        {
            // Kiểm tra xem phone có giá trị không và có đúng định dạng không
            if (!string.IsNullOrEmpty(id))
            {
                var user = await _userManager.FindByIdAsync(id);
                
                if (user == null)
                {
                    return NotFound(); // Trả về mã lỗi 404 nếu không tìm thấy user với số điện thoại đã cung cấp
                }
                var role = await _userManager.GetRolesAsync(user);
                if (role[0] == "admin") { return BadRequest("User is admin"); }
                return Ok(user); // Trả về user tìm thấy
            }
            else
            {
                var allUsers = _userManager.Users.ToList();
                var usersWithoutAdminRole = new List<User>();

                foreach (var user in allUsers)
                {
                    var roles = await _userManager.GetRolesAsync(user);
                    if (!roles.Contains("admin"))
                    {
                        usersWithoutAdminRole.Add(user);
                    }
                }

                return Ok(usersWithoutAdminRole);
            }
        }

        [HttpGet("CurrentUser")]
        public async Task<IActionResult> GetCurrentUser()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return NotFound("User not found.");
            }
            return Ok(user);
        }


        [HttpPost]
        public async Task<IActionResult> AddUser([FromBody] UserModel model)
        {
            var existingUser = _context.Users.FirstOrDefault(u => u.PhoneNumber == model.PhoneNumber);
            if (existingUser != null)
            {
                return Ok(new ApiResponse
                {
                    Success = false,
                    Message = "User existed",
                    Data = existingUser
                }); //nếu người dùng đã tồn tại
            }

            var user = new User
            {
                PhoneNumber = model.PhoneNumber,
                DiaChi = model.DiaChi,
                UserName = model.UserName,
                Password = model.Password,
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                return Ok(new ApiResponse
                {
                    Success = true,
                    Data = user
                });
            }
            else
            {
                return Ok(new ApiResponse
                {
                    Success = false,
                    Message = result.ToString()
                });
            }
        }

        [HttpPost("Comments")]
        public async Task<IActionResult> AddComment([FromBody] CommentModel model)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return BadRequest("Not signed in");
            }
            var product = _context.HangHoas.FirstOrDefault(p => p.MaHangHoa == model.ProductId);
            if (product == null)
            {
                return BadRequest("Product not exist");
            }
            var orders = _context.DonHangs
                .Include(o => o.ChiTietDonHangs)
                .ThenInclude(o => o.Variant)
                .ThenInclude(v => v.HangHoa)
                .Where(o => o.UserId == user.Id).ToList();
            bool notBought = true;
            foreach(var order in orders)
            {
                foreach(var detail in order.ChiTietDonHangs)
                {
                    if(detail.Variant.ProductId == model.ProductId)
                    {
                        notBought = false;
                    }
                }
            }
            if (notBought)
            {
                return BadRequest("Not purchased");
            }

            var comment = new Comments
            {
                Comment = model.Comment,
                Rating = model.Rating,
                UserId = user.Id,
                ProductId = model.ProductId,
                User = user,
                Product = product
            };
            switch(model.Rating)
            {
                case 1: product.Star1++; break;
                case 2: product.Star2++; break;
                case 3: product.Star3++; break;
                case 4: product.Star4++; break;
                case 5: product.Star5++; break;
            }
            _context.Comments.Add(comment);
            _context.SaveChanges();
            return Ok(comment);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(string id, string currentPassword, [FromBody] UserModel model)
        {
            // Kiểm tra xem model có hợp lệ không
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Tìm người dùng trong cơ sở dữ liệu bằng ID
            var user = _context.Users.FirstOrDefault(u => u.Id == id);
            if (user == null)
            {
                return NotFound(); // Trả về mã lỗi 404 nếu không tìm thấy user với ID đã cung cấp
            }

            var checkPassword = await _userManager.CheckPasswordAsync(user, currentPassword);
            if (!checkPassword)
            {
                return BadRequest("Password incorrect");
            }

            var result = await _userManager.ChangePasswordAsync(user, currentPassword, model.Password);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            // Cập nhật thông tin người dùng với thông tin mới từ model
            user.UserName = model.UserName;
            user.PhoneNumber = model.PhoneNumber;
            user.DiaChi = model.DiaChi;
            user.Password = model.Password;

            // Lưu thay đổi vào cơ sở dữ liệu
            _context.Update(user);
            _context.SaveChanges();

            return Ok(user); // Trả về thông tin người dùng sau khi được cập nhật
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteUser(string id)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == id);
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
