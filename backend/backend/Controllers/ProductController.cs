using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
                var products = _context.HangHoas.Include(h => h.Variants).ToList();
                return Ok(products);
            }
            else
            {
                var product = _context.HangHoas.Include(h => h.Variants).FirstOrDefault(p => p.MaHangHoa == id);
                if (product == null)
                {
                    return NotFound();
                }
                else return Ok(product);
            }
        }

        [HttpGet("Comments{id}")]
        public IActionResult GetComment(Guid id)
        {
            var comments = _context.Comments.Include(c => c.User).Where(p => p.ProductId == id).ToList();
            return Ok(comments);
        }

        [HttpPost]
        public IActionResult AddProduct([FromBody] ProductModel productModel)
        {
            if (ModelState.IsValid)
            {
                using (var transaction = _context.Database.BeginTransaction())
                {
                    try
                    {
                        var product = new HangHoa
                        {
                            Gia = productModel.Gia,
                            HangSanXuat = productModel.HangSanXuat,
                            LoaiHangHoa = productModel.LoaiHangHoa,
                            TenHangHoa = productModel.TenHangHoa,
                            ThongSo = productModel.ThongSo,
                            ThongTin = productModel.ThongTin,
                            Star1 = productModel.Star1,
                            Star2 = productModel.Star2,
                            Star3 = productModel.Star3,
                            Star4 = productModel.Star4,
                            Star5 = productModel.Star5,
                        };

                        _context.HangHoas.Add(product);
                        _context.SaveChanges();

                        foreach (var variantModel in productModel.Variants)
                        {
                            var variant = new VariantModel
                            {
                                image = variantModel.image,
                                color = variantModel.color,
                                quantity = variantModel.quantity,
                                sale = variantModel.sale,
                                ProductId = product.MaHangHoa,
                                HangHoa = product
                            };

                            _context.Variants.Add(variant); 
                        }

                        _context.SaveChanges();
                        transaction.Commit();

                        return Ok(product);
                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                        return StatusCode(500, ex.Message);
                    }
                }
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [HttpPut("UpdateProduct{id}")]
        public IActionResult UpdateProduct(Guid id, [FromBody] ProductModel model)
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
                product.Gia = model.Gia;
                product.HangSanXuat = model.HangSanXuat;
                product.LoaiHangHoa = model.LoaiHangHoa;
                product.TenHangHoa = model.TenHangHoa;
                product.ThongSo = model.ThongSo;
                product.ThongTin = model.ThongTin;
                product.Star1 = model.Star1;
                product.Star2 = model.Star2;
                product.Star3 = model.Star3;
                product.Star4 = model.Star4;
                product.Star5 = model.Star5;

                _context.Update(product);
                _context.SaveChanges();
                return Ok(new ApiResponse
                {
                    Success = true,
                    Message = "Updated the product",
                    Data = product
                });
            }
        }
        [HttpPut("UpdateVariants{id}")]
        public IActionResult UpdateProductVariants(int id, [FromBody] VariantInputModel model)
        {
            var variant = _context.Variants.FirstOrDefault(p => p.id == id);
            if (variant == null)
            {
                return NotFound();
            }
            else
            {
                variant.image = model.image;
                variant.quantity = model.quantity;
                variant.sale = model.sale;
                variant.color = model.color;
            }
            _context.Update(variant);
            _context.SaveChanges();
            return Ok(variant);
        }
        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(Guid id)
        {
            var product = _context.HangHoas.Include(h => h.Variants).FirstOrDefault(p => p.MaHangHoa == id);
            if (product == null)
            {
                return NotFound();
            }
            else
            {
                _context.Variants.RemoveRange(product.Variants);
                _context.HangHoas.Remove(product);
                _context.SaveChanges();

                return Ok();
            }
        }
        [HttpDelete("DeleteVariant{id}")]
        public IActionResult DeleteVariant(int id)
        {
            var variant = _context.Variants.FirstOrDefault(v => v.id == id);
            if(variant == null)
            {
                return NotFound();
            }
            else
            {
                _context.Remove(variant);
                _context.SaveChanges();
                return Ok();
            }
        }
    }
}
