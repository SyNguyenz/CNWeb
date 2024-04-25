using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly MyDbContext _context;
        private readonly string _appSettings;

        public OrderController(MyDbContext context, IConfiguration configuration)
        {
            _context = context;
            _appSettings = configuration["AppSettings:SecretKey"];
        }

        [HttpGet]
        public IActionResult Get(Guid? id)
        {
            if (id.HasValue)
            {
                var order = _context.DonHangs.FirstOrDefault(o => o.MaDonHang == id);
                if (order == null)
                {
                    return NotFound();
                }
                return Ok(order);
            }
            else
            {
                var order = _context.DonHangs.ToList();
                return Ok(order);
            }
        }

        [HttpPost]
        public IActionResult AddOrder([FromBody] DonHang model)
        {
            var existingOrder = _context.DonHangs.FirstOrDefault(u => u.MaDonHang == model.MaDonHang);
            if (existingOrder != null)
            {
                return Conflict(); // Trả về mã lỗi 409 nếu người dùng đã tồn tại
            }

            var order = new DonHang
            {
                NgayDat = model.NgayDat,
                NgayGiao = model.NgayGiao,
                UserId = model.UserId,
                TinhTrangDonHang = model.TinhTrangDonHang,
                ChiTietDonHangs = model.ChiTietDonHangs,
            };

            _context.DonHangs.Add(order);
            _context.SaveChanges();

            return CreatedAtAction(nameof(Get), new { id = order.UserId }, order); // Trả về mã lỗi 201 nếu thành công
        }

        [HttpPut("{id}")]
        public IActionResult UpdateOrder(Guid id, [FromBody] DonHang model)
        {
            // Kiểm tra xem model có hợp lệ không
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Tìm trong cơ sở dữ liệu bằng ID
            var order = _context.DonHangs.FirstOrDefault(o => o.MaDonHang == id);
            if (order == null)
            {
                return NotFound();
            }

            //Update
            order.TinhTrangDonHang = model.TinhTrangDonHang;
            order.NgayDat = model.NgayDat;
            order.NgayGiao = model.NgayGiao;
            order.UserId = model.UserId;
            order.ChiTietDonHangs = model.ChiTietDonHangs;

            _context.SaveChanges();

            return Ok(order);
            
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteOrder(Guid id)
        {
            var order = _context.DonHangs.FirstOrDefault(o => o.MaDonHang == id);
            if (order == null)
            {
                return NotFound();
            }

            _context.DonHangs.Remove(order);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
