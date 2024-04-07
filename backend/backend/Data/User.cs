using System.ComponentModel.DataAnnotations;

namespace backend.Data
{
    public class User
    {
        [Key]
        public int UserId { get; set; }
        public string UserName { get; set; }
        [Required]
        [Range(9,10)]
        public string PhoneNumber { get; set; }
        public string Password { get; set; }
        public string DiaChi { get; set; }
    }
}
