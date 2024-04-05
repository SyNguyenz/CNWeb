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

        public string ThongTin {  get; set; }

        [Range(0, double.MaxValue)]
        public double Gia {  get; set; }

        public byte GiamGia { get; set; }

        [Required]
        public int SoLuongTon { get; set; }

        public ICollection<ChiTietDonHang> ChiTietDonHangs { get; set; }
        public HangHoa()
        {
            ChiTietDonHangs = new List<ChiTietDonHang>();
        }
    }
}
