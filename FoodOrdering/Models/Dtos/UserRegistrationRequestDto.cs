using System.ComponentModel.DataAnnotations;

namespace FoodOrdering.Models.Dtos
{
    public class UserRegistrationRequestDto
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string Name { get; set; }
    }
}
