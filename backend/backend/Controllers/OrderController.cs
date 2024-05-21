using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly MyDbContext _context;

        public OrderController(MyDbContext context)
        {
            _context = context;
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

        [HttpGet("UserId{id}")]
        public IActionResult GetUserOrder(string id)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == id);
            if (user == null)
            {
                return Ok(new ApiResponse
                {
                    Success = false,
                    Message = "User not found",
                });
            }
            else
            {
                var orders = _context.DonHangs.Where(o => o.UserId == id).ToList();
                return Ok(orders);
            }
        }

        [HttpPost]
        public IActionResult AddOrder(int id, int number, [FromBody] DonHang model)
        {
            var order = new DonHang
            {
                NgayGiao = model.NgayGiao,
                UserId = model.UserId,
                TinhTrangDonHang = 0,
            };

            _context.DonHangs.Add(order);
            _context.SaveChanges();

            var variant = _context.Variants.FirstOrDefault(p => p.id == id);
            if (variant == null)
            {
                return Ok(new ApiResponse
                {
                    Success = false,
                    Message = "Variant not found"
                });
            }
            var orderDetails = new ChiTietDonHang
            {
                MaDonHang = order.MaDonHang,
                MaHangHoa = variant.ProductId,
                SoLuong = number,
                Total = variant.HangHoa.Gia * (1 - variant.sale / 100) * number,
                GiamGia = number * (variant.sale / 100),
                DonHang = order,
                HangHoa = variant.HangHoa
            };
            order.ChiTietDonHangs.Add(orderDetails);
            variant.HangHoa.ChiTietDonHangs.Add(orderDetails);
            variant.quantity -= number;
            _context.SaveChanges();

            return Ok(new {order});
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
            order.TinhTrangDonHang++;
            if (order.TinhTrangDonHang == 3)
            {
                order.NgayGiao = DateTime.Now;
            }

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
            _context.ChiTietDonHangs.RemoveRange(order.ChiTietDonHangs);
            _context.DonHangs.Remove(order);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
