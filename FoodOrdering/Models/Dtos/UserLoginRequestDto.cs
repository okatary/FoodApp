using System.ComponentModel.DataAnnotations;

namespace FoodOrdering.Models.Dtos
{
    public class UserLoginRequestDto
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
