namespace FoodOrdering.Models.Dtos
{
    public class OrderItemResponseDto
    {
        public int OrderId { get; set; }

        public FoodItemResponseDto FoodItem { get; set; }

        public int Quantity { get; set; }
    }
}
