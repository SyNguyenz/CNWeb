using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Data
{
    [Table("HangHoa")]
    public class HangHoa
    {
        [Key]
        public Guid MaHangHoa { get; set; }

        [Required]
        [MaxLength(100)]
        public string TenHangHoa { get; set; }

        [Required]
        public string LoaiHangHoa { get; set; }

        public string ThongTin { get; set; }

        [Range(0, double.MaxValue)]
        public double Gia { get; set; }

        public byte GiamGia { get; set; }

        [Required]
        public int SoLuongTon { get; set; }

        public int Star5 { get; set; }

        public int Star4 { get; set; }

        public int Star3 { get; set; }
        public int Star2 { get; set; }
        public int Star1 { get; set; }
        public double Ratings {  get
            {
                int totalStars = Star5 + Star4 + Star3 + Star2 + Star1;
                if (totalStars == 0)
                {
                    // Tránh chia cho 0
                    return 0;
                }
                else
                {
                    // Tính trung bình cộng của các đánh giá sao
                    double average = (5 * Star5 + 4 * Star4 + 3 * Star3 + 2 * Star2 + 1 * Star1) / (double)totalStars;
                    return Math.Round(average, 1); // Làm tròn đến 1 chữ số sau dấu thập phân
                }
            }
        }

        public ICollection<string> img {  get; set; }

        public ICollection<ChiTietDonHang> ChiTietDonHangs { get; set; }
        public HangHoa()
        {
            ChiTietDonHangs = new List<ChiTietDonHang>();
            img = new List<string>();
        }
    }
}
