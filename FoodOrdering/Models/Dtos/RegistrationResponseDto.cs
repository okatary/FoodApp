namespace FoodOrdering.Models.Dtos
{
    public class RegistrationResponseDto
    {
        public string Email { get; set; }

        public string UserName { get; set; }

        public float Credit { get; set; }


        public string Token { get; set; }

        public string RefreshToken { get; set; }

        public bool Success { get; set; }

        public IEnumerable<string> Errors { get; set; }

    }
}
