using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly MyDbContext _context;
        private readonly IHubContext<NotificationHub> _hubContext;

        public OrderController(MyDbContext context, IHubContext<NotificationHub> hubContext)
        {
            _context = context;
            _hubContext = hubContext;
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
        public async Task<IActionResult> AddOrder([FromQuery] List<int> ids,[FromQuery] List<int> numbers, string UserId)
        {
            if(ids.Count != numbers.Count)
            {
                return Ok(new ApiResponse
                {
                    Success = false,
                    Message = "each product needs exactly a number",
                });
            }
            var order = new DonHang
            {
                UserId = UserId,
                TinhTrangDonHang = 0,
            };

            _context.DonHangs.Add(order);
            _context.SaveChanges();
            for(int i = 0; i < ids.Count; i++)
            {
                var id = ids[i];
                var number = numbers[i];
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
                    VariantId = variant.id,
                    SoLuong = number,
                    Total = variant.HangHoa.Gia * (1 - variant.sale / 100) * number,
                    GiamGia = number * (variant.sale / 100),
                    DonHang = order,
                    Variant = variant
                };
                order.ChiTietDonHangs.Add(orderDetails);
                variant.ChiTietDonHangs.Add(orderDetails);
                variant.quantity -= number;
                _context.SaveChanges();
            }

            await _hubContext.Clients.All.SendAsync("NewOrderCreated", "New order created");

            return Ok(new {order});
        }

        [HttpPut("UpdateOrderState{id}")]
        public IActionResult UpdateOrderState(Guid id)
        {
            // Tìm trong cơ sở dữ liệu bằng ID
            var order = _context.DonHangs.FirstOrDefault(o => o.MaDonHang == id);
            if (order == null)
            {
                return NotFound();
            }

            //Update
            order.TinhTrangDonHang++;
            if (order.TinhTrangDonHang == 2)
            {
                order.NgayGiao = DateTime.Now;
            }

            _context.SaveChanges();

            return Ok(order);
        }
        [HttpPut("UpdateOrder")]
        public IActionResult UpdateOrder(int variantId, Guid orderId, int number)
        {
            var order = _context.ChiTietDonHangs.FirstOrDefault(o => o.VariantId == variantId && o.MaDonHang == orderId);
            if (order == null)
            {
                return NotFound();
            }
            var variant = order.Variant;

            order.SoLuong = number;
            order.Total = variant.HangHoa.Gia * (1 - variant.sale / 100) * number;
            order.GiamGia = number * (variant.sale / 100);
            _context.Update(order);
            _context.SaveChanges();
            return Ok(order);
        }

        [HttpDelete]
        public IActionResult DeleteOrder(Guid OrderId)
        {
            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    var order = _context.DonHangs
                .Include(o => o.ChiTietDonHangs)
                .ThenInclude(od => od.Variant)
                .FirstOrDefault(o => o.MaDonHang == OrderId);
                    if (order == null)
                    {
                        return NotFound();
                    }
                    foreach (var details in order.ChiTietDonHangs)
                    {
                        details.Variant.quantity += details.SoLuong;
                        _context.ChiTietDonHangs.Remove(details);
                    }

                    _context.DonHangs.Remove(order);
                    _context.SaveChanges();

                    transaction.Commit();

                    return Ok();
                }
                catch (Exception)
                {
                    // Rollback the transaction in case of an error
                    transaction.Rollback();
                    return StatusCode(500, "An error occurred while deleting the order.");
                }
            }
             
        }
    }
}
