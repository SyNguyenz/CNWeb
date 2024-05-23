using backend.Data;
using backend.Models;
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

        [HttpGet]
        public IActionResult Get(string? phone)
        {
            // Kiểm tra xem phone có giá trị không và có đúng định dạng không
            if (!string.IsNullOrEmpty(phone))
            {
                // Kiểm tra độ dài của phone và xác định rằng nó phải có 10 ký tự và tất cả là số
                if (phone.Length == 10 && phone.All(char.IsDigit) && phone.StartsWith('0'))
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

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(string id,string currentPassword, [FromBody] UserModel model)
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

            var result = await _userManager.ChangePasswordAsync(user, currentPassword, model.Password);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            // Cập nhật thông tin người dùng với thông tin mới từ model
            user.UserName = model.UserName;
            user.PhoneNumber = model.PhoneNumber;
            user.DiaChi = model.DiaChi;
            
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
