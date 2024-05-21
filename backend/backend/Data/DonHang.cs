namespace backend.Data
{
    public enum TinhTrangDonHang
    {
        New = 0, Payment = 1, Shipping = 2, Complete = 3, Cancel = -1
    }
    public class DonHang
    {
        public Guid MaDonHang { get; set; }
        public DateTime NgayDat { get; set; }
        public DateTime? NgayGiao { get; set; }
        public int TinhTrangDonHang { get; set; }
        public string UserId {  get; set; }
        public ICollection<ChiTietDonHang> ChiTietDonHangs { get; set; }
        public DonHang()
        {
            ChiTietDonHangs = [];
            UserId = string.Empty;
        }
    }
}
