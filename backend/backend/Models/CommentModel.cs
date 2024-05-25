namespace backend.Models
{
    public class CommentModel
    {
        public string Comment { get; set; } = string.Empty;
        public int Rating { get; set; }
        public Guid ProductId { get; set; }
    }
}
