namespace backend.Models
{
    public class OrderRequestModel
    {
        public List<int> ids { get; set; }
        public List<int> numbers { get; set; }
        public OrderRequestModel()
        {
            ids = new List<int>();
            numbers = new List<int>();
        }
    }
}
