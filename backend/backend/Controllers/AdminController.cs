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
        public IActionResult Get(int? id)
        {
            if (id.HasValue)
            {
                var admin = _context.Admins.FirstOrDefault(a => a.Id == id);
                if (admin == null)
                {
                    return NotFound();
                }
                return Ok(admin);
            }
            else
            {
                return Ok(_context.Admins);
            }
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

        [HttpPut("{id}")]
        public IActionResult UpdateAdmin(int id, [FromBody] Admin a)
        {
            var admin = _context.Admins.FirstOrDefault(a => a.Id == id);
            if(admin == null)
            {
                return NotFound();
            }
            else
            {
                admin.Name = a.Name;
                admin.Account = a.Account;
                admin.Password = a.Password;
                _context.SaveChanges();
                return Ok(admin);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteAdmin(int id)
        {
            var admin = _context.Admins.FirstOrDefault(a => a.Id == id);
            if (admin == null)
            {
                return NotFound();
            }
            else
            {
                _context.Admins.Remove(admin);
                _context.SaveChanges(); 
                return Ok(admin);
            }
        }

    }
}