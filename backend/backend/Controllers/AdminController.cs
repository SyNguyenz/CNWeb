using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using System.Numerics;
using System.Reflection.Metadata.Ecma335;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "admin")]
    public class AdminController : ControllerBase
    {
        private readonly MyDbContext _context;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        public AdminController(MyDbContext context, UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager; 
        }
        [HttpGet]
        public async Task<IActionResult> Get(string? id)
        {
            var admin = await _userManager.GetUsersInRoleAsync("admin");
            if (!string.IsNullOrEmpty(id))
            {
                foreach (var a in admin)
                {
                    if (a.Id == id) return Ok(a);
                }
                return NotFound();
            }
            else
            {
                return Ok(admin);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] User model)
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

            await AssignAdminRole(user.Id);

            return CreatedAtAction(nameof(Get), new { id = user.Id }, user); // Trả về mã lỗi 201 nếu thành công
        }

        

        [HttpPut("{id}")]
        public IActionResult UpdateAdmin(string id, [FromBody] User a)
        {
            var admin = _context.Users.FirstOrDefault(a => a.Id == id);
            if(admin == null)
            {
                return NotFound();
            }
            else
            {
                admin.UserName = a.UserName;
                admin.PhoneNumber = a.PhoneNumber;
                admin.Password = a.Password;
                admin.DiaChi = a.DiaChi;
                _context.SaveChanges();
                return Ok(admin);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteAdmin(string id)
        {
            var admin = _context.Users.FirstOrDefault(a => a.Id == id);
            if (admin == null)
            {
                return NotFound();
            }
            else
            {
                _context.Users.Remove(admin);
                _context.SaveChanges(); 
                return Ok(admin);
            }
        }

        [HttpPost("AssignAdmin")]
        public async Task<IActionResult> AssignAdminRole(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user != null)
            {
                var result = await _userManager.AddToRoleAsync(user, "admin");

                return Ok(result);
            }
            else
            {
                // Xử lý khi không tìm thấy người dùng
                return Ok(new ApiResponse
                {
                    Success = false,
                    Message = "User Not Found",
                });
            }
        }
    }
}