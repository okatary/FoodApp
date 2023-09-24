namespace FoodOrdering.Models.Dtos
{
    public class AddFoodItemToOrderRequestDto
    {
        public int FoodItemId { get; set; }
        public int Quantity { get; set; }
    }
}
