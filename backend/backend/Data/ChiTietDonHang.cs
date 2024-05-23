namespace backend.Data
{
    public class ChiTietDonHang
    {
        public int VariantId { get; set; }
        public Guid MaDonHang { get; set; }
        public int SoLuong { get; set; }
        public double Total { get; set; }
        public double GiamGia { get; set; }
        

        //relationship
        public DonHang DonHang { get; set; }
        public VariantModel Variant { get; set; }
        public ChiTietDonHang()
        {
            DonHang = new DonHang();
            Variant = new VariantModel();
        }
    }
}
