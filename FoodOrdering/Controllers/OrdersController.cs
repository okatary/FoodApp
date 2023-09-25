using FoodOrdering.Data;
using FoodOrdering.Models.Dtos;
using FoodOrdering.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace FoodOrdering.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly UserManager<User> _userManager;

        public OrdersController(
            AppDbContext context,
            UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<ActionResult<IList<OrderResponseDto>>> GetUserOrders()
        {
            var userEmail = _userManager.GetUserId(HttpContext.User);
            var user = _context.Users
                .Include(u => u.Orders)
                    .ThenInclude(o => o.Items)
                    .ThenInclude(oi => oi.FoodItem)
                .First( u => u.Email == userEmail);

            var orders = user.Orders.ToList();

            var results = new List<OrderResponseDto>();

            foreach (var order in orders)
            {
                results.Add(GetOrderResponse(order)); 
            }

            return Ok(results);
        }

        [HttpGet("getCurrentOrder")]
        public async Task<ActionResult<OrderResponseDto>> GetOrCreateCurrentOrder()
        {
            var order = await GetOrCreateCurrentOrderHelper();
            return Ok(GetOrderResponse(order));
        }

        [HttpPost("addFoodItemToCurrentOrder")]
        public async Task<ActionResult<OrderResponseDto>> AddFoodItemToCurrentOrder([FromBody] AddFoodItemToOrderRequestDto foodItemRequest)
        {
            var order = await GetOrCreateCurrentOrderHelper();

            if(order.Status != OrderStatus.NewOrder)
            {
                return BadRequest(new ErrorResponseDto
                {
                    ErrorMessages = new List<string> { "Cannot add items to an order that is not in the NewOrder state" }
                });
            }

            var orderItems = order.Items.ToList();
            var foodItem = await _context.FoodItems.FindAsync(foodItemRequest.FoodItemId);

            var existingOrderItem = orderItems.SingleOrDefault(oi => oi.FoodItem.Id == foodItemRequest.FoodItemId);

            if (existingOrderItem != null)
            {
                existingOrderItem.Quantity += foodItemRequest.Quantity;
            }
            else
            {
                var orderItem = new OrderItem
                {
                    Order = order,
                    FoodItem = foodItem,
                    Quantity = foodItemRequest.Quantity
                };
                _context.OrderItems.Add(orderItem);
            }
            _context.SaveChanges();

            order = _context.Orders
                .Include(o => o.Items)
                    .ThenInclude(oi => oi.FoodItem)
                .Include(o => o.User)
                .First(o => o.Id == order.Id);

            return Ok(GetOrderResponse(order));
        }

        [HttpPost("subtractFoodItemToCurrentOrder")]
        public async Task<ActionResult<OrderResponseDto>> subtractFoodItemToCurrentOrder([FromBody] AddFoodItemToOrderRequestDto foodItemRequest)
        {
            var order = await GetOrCreateCurrentOrderHelper();

            if (order.Status != OrderStatus.NewOrder)
            {
                return BadRequest(new ErrorResponseDto
                {
                    ErrorMessages = new List<string> { "Cannot remove items from an order that is not in the NewOrder state" }
                });
            }

            var orderItems = order.Items.ToList();
            var foodItem = await _context.FoodItems.FindAsync(foodItemRequest.FoodItemId);

            var existingOrderItem = orderItems.SingleOrDefault(oi => oi.FoodItem.Id == foodItemRequest.FoodItemId);

            if (existingOrderItem != null)
            {
                if (existingOrderItem.Quantity > foodItemRequest.Quantity)
                {
                    existingOrderItem.Quantity -= foodItemRequest.Quantity;
                }
                else
                {
                    _context.OrderItems.Remove(existingOrderItem);
                }
            }
            else
            {
                return BadRequest(new ErrorResponseDto
                {
                    ErrorMessages = new List<string> { "Order item does not exist" }
                });
            }

            _context.SaveChanges();

            order = _context.Orders
                .Include(o => o.Items)
                    .ThenInclude(oi => oi.FoodItem)
                .Include(o => o.User)
                .First(o => o.Id == order.Id);

            return Ok(GetOrderResponse(order));
        }

        [HttpGet("checkoutOrder")]
        public async Task<ActionResult<OrderResponseDto>> CheckoutOrder()
        {
            var userEmail = _userManager.GetUserId(HttpContext.User);
            var user = _context.Users
                .First(u => u.Email == userEmail);

            var orders = _context.Orders
                .Include(c => c.User)
                .Where(o => o.User.Id == user.Id)
                .Include(o => o.Items)
                    .ThenInclude(oi => oi.FoodItem)
                .ToList();
            var order = orders.SingleOrDefault(o => !IsTerminalState(o.Status));

            if (order == null)
            {
               // handle no order
            }
            var totalCost = CalculateOrderTotalCost(order);
            user.Credit -= totalCost;
            foreach (var item in order.Items)
            {
                if(item.Quantity < item.FoodItem.Quantity)
                {
                    // handle
                }
                item.FoodItem.Quantity -= item.Quantity;
            }

            order.Status = OrderStatus.Preparing;

            _context.SaveChanges();

            return Ok(GetOrderResponse(order));
        }

        [HttpGet("setOrderReady")]
        public async Task<ActionResult<OrderResponseDto>> SetOrderReady()
        {
            var order = await GetOrCreateCurrentOrderHelper();
            order.Status = OrderStatus.Ready;
            _context.SaveChanges();

            return Ok(GetOrderResponse(order));
        }

        [HttpGet("setOrderPickedUp")]
        public async Task<ActionResult<OrderResponseDto>> SetOrderPickedUp()
        {
            var order = await GetOrCreateCurrentOrderHelper();
            order.Status = OrderStatus.PickedUp;
            _context.SaveChanges();

            return Ok(GetOrderResponse(order));
        }

        [HttpGet("setOrderCompleted")]
        public async Task<ActionResult<OrderResponseDto>> SetOrderCompleted()
        {
            var order = await GetOrCreateCurrentOrderHelper();
            order.Status = OrderStatus.Completed;
            _context.SaveChanges();
            
            return Ok(GetOrderResponse(order));
        }

        private float CalculateOrderTotalCost(Order order)
        {
            var cost = 0f;

            foreach(var item in order.Items)
            {
                cost += item.Quantity * item.FoodItem.Price;
            }
            return cost;
        }

        private bool IsTerminalState(OrderStatus status)
        {
            return status == OrderStatus.Completed || status == OrderStatus.Cancelled;
        }

        private async Task<Order> GetOrCreateCurrentOrderHelper()
        {
            var userEmail = _userManager.GetUserId(HttpContext.User);
            var user = _context.Users
                .Include(u => u.Orders)
                .First(u => u.Email == userEmail);

            var order = user.Orders.SingleOrDefault(o => !IsTerminalState(o.Status));
            var orderId = order?.Id;

                

            if (order == null)
            {
                order = new Order
                {
                    User = user,
                    Status = OrderStatus.NewOrder,
                    CreatedAt = DateTime.UtcNow
                };

                _context.Orders.Add(order);
                _context.SaveChanges();
            }

            return _context.Orders
                .Where(o => o.Id == order.Id)
                .Include(o => o.Items)
                    .ThenInclude(oi => oi.FoodItem)
                .Include(c => c.User)
                .First();
        }

        private OrderResponseDto GetOrderResponse(Order order)
        {
            return 
            new OrderResponseDto
            {
                Id = order.Id,
                Status = order.Status,
                CreatedAt = order.CreatedAt,
                OrderItems = order.Items.Select(oi =>
                new OrderItemResponseDto
                {
                    OrderId = oi.Order.Id,
                    FoodItem = new FoodItemResponseDto
                    {
                        Id = oi.FoodItem.Id,
                        Name = oi.FoodItem.Name,
                        AveragePrepationTime = oi.FoodItem.AveragePrepationTime,
                        Description = oi.FoodItem.Description,
                        Price = oi.FoodItem.Price,
                        ImageUrl = oi.FoodItem.ImageUrl
                    },
                    Quantity = oi.Quantity
                }).ToList(),
                TotalCost = CalculateOrderTotalCost(order),
                User = new UserResponseDto
                {
                    Id = order.User.Id,
                    Name = order.User.UserName,
                    Email = order.User.Email,
                    Credit = order.User.Credit
                }
            };
        }
    }
}
