namespace FoodOrdering.Models.Dtos
{
    public class FoodItemResponseDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public float Price { get; set; }

        public TimeSpan AveragePrepationTime { get; set; }

        public string ImageUrl { get; set; }
    }
}
