using backend.Data;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly MyDbContext _context;

        public AdminController(MyDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_context.Admins);
        }
        [HttpPost]
        public IActionResult Post([FromBody] Admin a)
        {
            if (string.IsNullOrEmpty(a.Name) || string.IsNullOrEmpty(a.Account) || string.IsNullOrEmpty(a.Password))
            {
                return BadRequest("Name or Account or Password cannot be null or empty.");
            }

            Admin admin = new Admin
            {
                Name = a.Name,
                Account = a.Account,
                Password = a.Password
            };

            _context.Admins.Add(admin);
            _context.SaveChanges();

            // Return the created Admin object if needed
            return Ok(_context.Admins);
        }
    }
}