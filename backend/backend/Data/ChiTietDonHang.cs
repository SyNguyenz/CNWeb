namespace backend.Data
{
    public class ChiTietDonHang
    {
        public Guid MaHangHoa { get; set; }
        public Guid MaDonHang { get; set; }
        public int SoLuong { get; set; }
        public double Total { get; set; }
        public byte GiamGia { get; set; }

        //relationship
        public DonHang DonHang { get; set; }
        public HangHoa HangHoa { get; set; }
    }
}
