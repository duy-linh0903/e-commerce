using System.ComponentModel.DataAnnotations;

namespace E_commerce.DTOs.User
{
    public class AdminCreateUserRequest
    {
        [Required(ErrorMessage = "Name can't be empty")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Email can't be empty")]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Phone number can't be empty")]
        [StringLength(10, ErrorMessage = "Phone number must be 10 digits")]
        public string PhoneNumber { get; set; } = string.Empty;

        [Required, MinLength(6, ErrorMessage = "Password has at least 6 characters")]
        public string Password { get; set; } = string.Empty;

        [Required(ErrorMessage = "Role is required")]
        public string RoleName { get; set; } = string.Empty;
    }
}
