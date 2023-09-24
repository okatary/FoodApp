using FoodOrdering.Data;
using FoodOrdering.Models;
using FoodOrdering.Models.Dtos;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FoodOrdering.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly UserManager<User> _userManager;

        public UsersController(
            AppDbContext context,
            UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet("getCurrentUser")]
        public async Task<ActionResult<IList<UserResponseDto>>> GetCurrentUser()
        {
            var userEmail = _userManager.GetUserId(HttpContext.User);
            var user = _context.Users
                .First(u => u.Email == userEmail);

            var result = new UserResponseDto
            {
                Id = user.Id,
                Email = user.Email,
                Name = user.UserName,
                Credit = user.Credit
            };

            return Ok(result);
        }
    }
}
