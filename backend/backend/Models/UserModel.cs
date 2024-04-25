using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class UserModel
    {
        public string UserName { get; set; }
        public string PhoneNumber { get; set; }
        public string Password { get; set; }
        public string DiaChi { get; set; }
    }
}
