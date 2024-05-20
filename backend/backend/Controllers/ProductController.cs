using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly MyDbContext _context;
        public ProductController(MyDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public IActionResult Get(Guid? id)
        {
            if(id == null)
            {
                var products = _context.HangHoas.ToList();
                return Ok(products);
            }
            else
            {
                var product = _context.HangHoas.FirstOrDefault(p => p.MaHangHoa == id);
                if (product == null)
                {
                    return NotFound();
                }
                else return Ok(product);
            }
        }
        [HttpPost]
        public IActionResult AddProduct([FromBody] HangHoa model)
        {
            if (ModelState.IsValid)
            {
                var product = new HangHoa
                {
                    ChiTietDonHangs = model.ChiTietDonHangs,
                    Gia = model.Gia,
                    HangSanXuat = model.HangSanXuat,
                    LoaiHangHoa = model.LoaiHangHoa,
                    TenHangHoa = model.TenHangHoa,
                    ThongSo = model.ThongSo,
                    ThongTin = model.ThongTin,
                    Variants = model.Variants,
                    Star1 = model.Star1,
                    Star2 = model.Star2,
                    Star3 = model.Star3,
                    Star4 = model.Star4,
                    Star5 = model.Star5,
                };
                _context.HangHoas.Add(product);
                _context.SaveChanges();

                return Ok(product);
            }
            else
            {
                return BadRequest();
            }
        }
        [HttpPut("{id}")]
        public IActionResult fixProduct(Guid id, [FromBody] HangHoa model)
        {
            var product = _context.HangHoas.FirstOrDefault(p => p.MaHangHoa == id);
            if(product == null)
            {
                return Ok(new ApiResponse
                {
                    Success = false,
                    Message = "Product does not exist"
                });
            }
            else
            {
                product.ChiTietDonHangs = model.ChiTietDonHangs;
                product.Gia = model.Gia;
                product.HangSanXuat = model.HangSanXuat;
                product.LoaiHangHoa = model.LoaiHangHoa;
                product.TenHangHoa = model.TenHangHoa;
                product.ThongSo = model.ThongSo;
                product.ThongTin = model.ThongTin;
                product.Variants = model.Variants;
                product.Star1 = model.Star1;
                product.Star2 = model.Star2;
                product.Star3 = model.Star3;
                product.Star4 = model.Star4;
                product.Star5 = model.Star5;
                _context.SaveChanges();
                return Ok(new ApiResponse
                {
                    Success = true,
                    Message = "Updated the product",
                    Data = product
                });
            }
        }
        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(Guid id)
        {
            var product = _context.HangHoas.FirstOrDefault(p => p.MaHangHoa == id);
            if (product == null)
            {
                return NotFound();
            }
            else
            {
                _context.HangHoas.Remove(product);
                _context.SaveChanges();

                return Ok();
            }
        }
    }
}
