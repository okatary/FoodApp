namespace FoodOrdering.Models
{
    public class OrderItem
    {
        public int Id { get; set; }

        public Order Order { get; set; }

        public FoodItem FoodItem { get; set; }

        public int Quantity { get; set; }
    }
}
