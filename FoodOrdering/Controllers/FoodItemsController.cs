using FoodOrdering.Data;
using FoodOrdering.Models;
using FoodOrdering.Models.Dtos;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FoodOrdering.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    [Route("api/[controller]")]
    public class FoodItemsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FoodItemsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<IList<FoodItemResponseDto>>> GetById(int id)
        {
            var foodItem = _context.FoodItems.Find(id);

            if(foodItem == null)
            {
                return NotFound(new ErrorResponseDto{
                    ErrorMessages = new List<string> { $"Food item with id `{id}` not found" }
                });
            }

            var result = new FoodItemResponseDto
            {
                Id = foodItem.Id,
                Name = foodItem.Name,
                Price = foodItem.Price,
                Description = foodItem.Description,
                AveragePrepationTime = foodItem.AveragePrepationTime,
                ImageUrl = foodItem.ImageUrl
            };

            return Ok(result);
        }

        [HttpGet]
        public async Task<ActionResult<IList<FoodItemResponseDto>>> Index()
        {
            var result = _context.FoodItems.Select(fi => new FoodItemResponseDto
            {
                Id = fi.Id,
                Name = fi.Name,
                Price = fi.Price,
                Description = fi.Description,
                AveragePrepationTime = fi.AveragePrepationTime,
                ImageUrl = fi.ImageUrl
            }).ToList();

            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<FoodItemResponseDto>> Add([FromBody] FoodItemRequestDto foodItemRequest)
        {
            var foodItem = new FoodItem
            {
                Name = foodItemRequest.Name,
                Price = foodItemRequest.Price,
                Quantity = foodItemRequest.Quantity,
                Description = foodItemRequest.Description,
                AveragePrepationTime = foodItemRequest.AveragePrepationTime,
                ImageUrl = foodItemRequest.ImageUrl
            };

            _context.FoodItems.Add(foodItem);
            _context.SaveChanges();

            var result = new FoodItemResponseDto
            {
                Id = foodItem.Id,
                Name = foodItemRequest.Name,
                Price = foodItemRequest.Price,
                Description = foodItemRequest.Description,
                AveragePrepationTime = foodItemRequest.AveragePrepationTime,
                ImageUrl = foodItemRequest.ImageUrl
            };

            return Ok(result);
        }
    }
}
