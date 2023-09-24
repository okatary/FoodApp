namespace FoodOrdering.Models
{
    public enum OrderStatus
    {
        Unknown = 0,
        NewOrder = 1,
        Preparing = 2,
        Ready = 3,
        PickedUp = 4,
        Completed = 5,
        Cancelled = 6
    }
}
