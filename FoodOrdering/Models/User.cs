using Microsoft.AspNetCore.Identity;

namespace FoodOrdering.Models
{
    public class User : IdentityUser
    {
        public float Credit { get; set; } = 1000f;

        public ICollection<Order> Orders { get; set; } = new List<Order>();
    }
}
