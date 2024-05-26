using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
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
        private readonly UserManager<User> _userManager;
        public OrderController(MyDbContext context, IHubContext<NotificationHub> hubContext, UserManager<User> userManager)
        {
            _context = context;
            _hubContext = hubContext;
            _userManager = userManager;
        }
        [Authorize(Roles = "admin")]
        [HttpGet]
        public IActionResult Get(int? id)
        {
            if (id.HasValue)
            {
                var order = _context.DonHangs
                    .Include(o => o.ChiTietDonHangs)
                    .ThenInclude(od => od.Variant)
                    .FirstOrDefault(o => o.MaDonHang == id);
                if (order == null)
                {
                    return NotFound();
                }
                return Ok(order);
            }
            else
            {
                var order = _context.DonHangs
                    .Include(o => o.ChiTietDonHangs)
                    .ThenInclude(od => od.Variant)
                    .ToList();
                return Ok(order);
            }
        }

        [HttpGet("UserId{id}")]
        public IActionResult GetUserOrder(string id)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == id);
            if (user == null)
            {
                return BadRequest(new ApiResponse
                {
                    Success = false,
                    Message = "User not found",
                });
            }
            else
            {
                var orders = _context.DonHangs
                    .Include(o => o.ChiTietDonHangs)
                    .ThenInclude(od => od.Variant)
                    .ThenInclude(v => v.HangHoa)
                    .Where(o => o.UserId == id).ToList();
                return Ok(orders);
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddOrder([FromBody] OrderRequestModel model)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return BadRequest("not signed in");
            }
            var UserId = user.Id;
            var ids = model.ids;
            var numbers = model.numbers;
            if (ids.Count != numbers.Count)
            {
                return BadRequest(new ApiResponse
                {
                    Success = false,
                    Message = "each product needs exactly a number",
                });
            }
            if (ids.Count == 0 || numbers.Count == 0)
            {
                return BadRequest(new ApiResponse
                {
                    Success = false,
                    Message = "no products",
                });
            }
            var order = new DonHang
            {
                UserId = UserId,
                TinhTrangDonHang = 0,
                DaThanhToan = false
            };

            _context.DonHangs.Add(order);
            _context.SaveChanges();
            for(int i = 0; i < ids.Count; i++)
            {
                var id = ids[i];
                var number = numbers[i];
                var variant = _context.Variants.Include(v => v.HangHoa).FirstOrDefault(p => p.id == id);
                if (variant == null)
                {
                    return Ok(new ApiResponse
                    {
                        Success = false,
                        Message = "Variant not found"
                    });
                }
                if (variant.quantity < number)
                {
                    _context.ChiTietDonHangs.RemoveRange(order.ChiTietDonHangs);
                    _context.DonHangs.Remove(order);
                    return BadRequest("Not enough available products");
                }
                var orderDetails = new ChiTietDonHang
                {
                    MaDonHang = order.MaDonHang,
                    VariantId = variant.id,
                    SoLuong = number,
                    Total = variant.HangHoa.Gia * (1 - (double)variant.sale / 100) * number,
                    GiamGia = number * (variant.sale / 100),
                    DonHang = order,
                    Variant = variant
                };
                order.ChiTietDonHangs.Add(orderDetails);
                variant.ChiTietDonHangs.Add(orderDetails);
                variant.quantity -= number;
                _context.SaveChanges();
            }
            await _hubContext.Clients.Client(user.ConnectionId).SendAsync("ReceiveMessage", "New Order Created");

            return Ok(order);
        }
        [Authorize(Roles = "admin")]
        [HttpPut("UpdateOrderState{id}")]
        public async Task<IActionResult> UpdateOrderState(int id)
        {
            // Tìm trong cơ sở dữ liệu bằng ID
            var order = _context.DonHangs.FirstOrDefault(o => o.MaDonHang == id);
            if (order == null)
            {
                return NotFound();
            }

            if(order.TinhTrangDonHang == 2)
            {
                return BadRequest("Order has been delivered");
            }

            var user = await _userManager.FindByIdAsync(order.UserId);
            if(user == null)
            {
                return BadRequest(new { message = "User not exist", order, user });
            }

            //Update
            order.TinhTrangDonHang++;
            if (order.TinhTrangDonHang == 2)
            {
                order.NgayGiao = DateTime.Now;
                await _hubContext.Clients.Client(user.ConnectionId).SendAsync("ReceiveMessage", "Delivered at " + order.NgayGiao);
            }
            else
            {
                await _hubContext.Clients.Client(user.ConnectionId).SendAsync("ReceiveMessage", "Shipping");
            }

            _context.SaveChanges();

            return Ok(order);
        }
        [Authorize(Roles = "admin")]
        [HttpPut("UpdateOrder")]
        public IActionResult UpdateOrder(int variantId, int orderId, int number)
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
        [Authorize(Roles = "admin")]
        [HttpDelete]
        public async Task<IActionResult> DeleteOrder(int OrderId)
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
                    var user = await _userManager.FindByIdAsync(order.UserId);
                    if (user == null)
                    {
                        return BadRequest("User not exist");
                    }
                    foreach (var details in order.ChiTietDonHangs)
                    {
                        details.Variant.quantity += details.SoLuong;
                        _context.ChiTietDonHangs.Remove(details);
                    }

                    _context.DonHangs.Remove(order);
                    _context.SaveChanges();

                    transaction.Commit();
                    await _hubContext.Clients.Client(user.ConnectionId).SendAsync("ReceiveMessage", "Your order has been canceled");
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
