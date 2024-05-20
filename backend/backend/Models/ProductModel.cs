using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class ProductModel
    {
        public string TenHangHoa { get; set; }
        public string LoaiHangHoa { get; set; }

        public List<string> HangSanXuat { get; set; }
        public List<string> ThongTin { get; set; }
        public List<string> ThongSo { get; set; }
        public double Gia { get; set; }

        public int Star5 { get; set; }

        public int Star4 { get; set; }

        public int Star3 { get; set; }
        public int Star2 { get; set; }
        public int Star1 { get; set; }
    }
}
