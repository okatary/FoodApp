namespace FoodOrdering.Models.Dtos
{
    public class OrderResponseDto
    {
        public int Id { get; set; }

        public OrderStatus Status { get; set; }

        public DateTime CreatedAt { get; set; }

        public List<OrderItemResponseDto> OrderItems { get; set; }

        public float TotalCost { get; set; }

        public UserResponseDto User { get; set; }
    }
}
