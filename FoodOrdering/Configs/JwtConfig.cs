namespace FoodOrdering.Configs
{
    public class JwtConfig
    {
        public string Secret { get; set; }
        public TimeSpan ExpiryTimeFrame { get; set; }
    }
}
