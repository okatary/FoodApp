namespace FoodOrdering.Models
{
    public class Order
    {
        public int Id { get; set; }

        public User User { get; set; } = null!;

        public OrderStatus Status { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
        
        public ICollection<OrderItem> Items { get; set; } = new List<OrderItem>();
    }
}
