using Microsoft.Identity.Client;

namespace backend.Data
{
    public class Admin
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Account { get; set; }
        public string Password { get; set; }
    }
}
