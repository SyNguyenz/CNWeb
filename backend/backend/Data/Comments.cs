namespace backend.Data
{
    public class Comments
    {
        public Guid Id { get; set; }
        public string Comment { get; set; }
        public int Rating { get; set; }
        public DateTime Created { get; set; }
        public Guid ProductId { get; set; }
        public string UserId { get; set; }
        public HangHoa Product { get; set; }
        public User User { get; set; }
        public Comments()
        {
            Comment = string.Empty;
            UserId = string.Empty;
            Product = new HangHoa();
            User = new User();
        }
    }
}
