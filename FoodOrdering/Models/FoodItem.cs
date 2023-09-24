using System.Globalization;

namespace FoodOrdering.Models
{
    public class FoodItem
    {
        public int Id { get; set; }

        public string Name { get; set; }
        
        public string Description { get; set; }

        public float Price { get; set; }

        public int Quantity { get; set; }

        public TimeSpan AveragePrepationTime{ get; set; }

        public string ImageUrl { get; set; }

    }
}
