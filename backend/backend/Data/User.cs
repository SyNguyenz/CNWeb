using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace backend.Data
{
    public class User : IdentityUser
    {
        public override string UserName { get; set; }
        [Required]
        [StringLength(10, MinimumLength = 9)]
        public override string PhoneNumber { get; set; }
        public string Password { get; set; }
        public string DiaChi { get; set; }
        public User()
        {
            UserName = string.Empty;
            PhoneNumber = string.Empty;
            DiaChi = string.Empty;
            Password = string.Empty;
        }
    }
}
