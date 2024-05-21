using backend.Controllers;

namespace backend.Data
{
    public class VariantModel
    {
        public int id { get; set; }
        public string image { get; set; }
        public string color { get; set; }
        public int quantity { get; set; }
        public byte sale { get; set; }

        public Guid ProductId { get; set; }
        public HangHoa HangHoa { get; set; }
    }
}
