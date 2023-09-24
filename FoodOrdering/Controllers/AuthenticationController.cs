using FoodOrdering.Data;
using FoodOrdering.Models;
using FoodOrdering.Models.Dtos;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace FoodOrdering.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;
        private readonly AppDbContext _context;
        private readonly TokenValidationParameters _tokenValidationParameters;
        //private readonly JwtConfig _jwtConfig;

        public AuthenticationController(
            UserManager<User> userManager,
            IConfiguration configuration,
            AppDbContext context,
            TokenValidationParameters tokenValidationParameters
            //JwtConfig jwtConfig
            )
        {
            _userManager = userManager;
            //_jwtConfig = jwtConfig;
            _configuration = configuration;
            _context = context;
            _tokenValidationParameters = tokenValidationParameters;
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] UserRegistrationRequestDto userRegistrationRequestDto)
        {
            if (ModelState.IsValid)
            {
                var existingUser = await _userManager.FindByEmailAsync(userRegistrationRequestDto.Email);

                if (existingUser != null)
                {
                    return BadRequest(new RegistrationResponseDto
                    {
                        Errors = new List<string>()
                        {
                            "Email already in use"
                        },
                        Success = false
                    });
                }

                var newUser = new User()
                {
                    Email = userRegistrationRequestDto.Email,
                    UserName = userRegistrationRequestDto.Name
                };

                var isCreated = await _userManager.CreateAsync(newUser, userRegistrationRequestDto.Password);

                if (isCreated.Succeeded)
                {
                    var authResult = await GenerateJwtToken(newUser);

                    return Ok(authResult);
                }
                else
                {
                    return BadRequest(new RegistrationResponseDto
                    {
                        Errors = isCreated.Errors.Select(x => x.Description).ToList(),
                        Success = false
                    });
                }
            }

            return BadRequest(new RegistrationResponseDto
            {
                Errors = new List<string>()
                {
                    "Invalid payload"
                },
                Success = false
            });
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginRequestDto userLoginRequestDto)
        {
            if (ModelState.IsValid)
            {
                var existingUser = await _userManager.FindByEmailAsync(userLoginRequestDto.Email);

                if (existingUser == null)
                {
                    return BadRequest(new RegistrationResponseDto
                    {
                        Errors = new List<string>()
                        {
                            "Invalid payload"
                        },
                        Success = false
                    });
                }

                var isCorrectPassword = await _userManager.CheckPasswordAsync(existingUser, userLoginRequestDto.Password);

                if (!isCorrectPassword)
                {
                    if (existingUser == null)
                    {
                        return BadRequest(new RegistrationResponseDto
                        {
                            Errors = new List<string>()
                        {
                            "Invalid credentials"
                        },
                            Success = false
                        });
                    }
                }

                var authResult = await GenerateJwtToken(existingUser);

                return Ok(authResult);
            }

            return BadRequest(new RegistrationResponseDto
            {
                Errors = new List<string>()
                {
                    "Invalid payload"
                },
                Success = false
            });
        }

        [HttpPost]
        [Route("refreshToken")]
        public async Task<IActionResult> RefreshToken([FromBody] TokenRequestDto tokenRequestDto)
        {
            if (ModelState.IsValid)
            {
                var result = await VerifyAndGenerateToken(tokenRequestDto);

                if (result == null)
                {
                    return BadRequest(new RegistrationResponseDto
                    {
                        Errors = new List<string>()
                        {
                            "Invalid tokens"
                        },
                        Success = false
                    });
                }

                return Ok(result);
            }
            return BadRequest(new RegistrationResponseDto
            {
                Errors = new List<string>()
                {
                    "Invalid payload"
                },
                Success = false,
            });
        }

        private async Task<RegistrationResponseDto> GenerateJwtToken(User user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration.GetSection("JwtConfig:Secret").Value);

            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(type: "Id", value: user.Id),
                    new Claim(type: JwtRegisteredClaimNames.Sub, value: user.Email),
                    new Claim(type: JwtRegisteredClaimNames.Email, value: user.Email),
                    new Claim(type: JwtRegisteredClaimNames.Jti, value: Guid.NewGuid().ToString()),
                    new Claim(type: JwtRegisteredClaimNames.Iat, value: DateTime.Now.ToUniversalTime().ToString())
                }),

                Expires = DateTime.UtcNow.Add(TimeSpan.Parse(_configuration.GetSection("JwtConfig:ExpiryTimeFrame").Value)),
                SigningCredentials = new SigningCredentials(
                                       new SymmetricSecurityKey(key),
                                       algorithm: SecurityAlgorithms.HmacSha256Signature)
            };

            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = jwtTokenHandler.WriteToken(token);

            var refreshToken = new RefreshToken()
            {
                JwtId = token.Id,
                UserId = user.Id,
                Token = RandomStringGeneration(22),
                AddedDate = DateTime.UtcNow,
                ExpiryDate = DateTime.UtcNow.AddMonths(6),
                IsRevoked = false,
                IsUsed = false,
            };

            await _context.RefreshTokens.AddAsync(refreshToken);
            await _context.SaveChangesAsync();

            return new RegistrationResponseDto
            {
                Success = true,
                Token = jwtToken,
                RefreshToken = refreshToken.Token,
                Credit = user.Credit,
                Email = user.Email,
                UserName = user.UserName
            };

        }

        private async Task<RegistrationResponseDto> VerifyAndGenerateToken(TokenRequestDto tokenRequest)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();

            try
            {
                _tokenValidationParameters.ValidateLifetime = false; // for testing
                
                var tokenInVerification = jwtTokenHandler.ValidateToken(tokenRequest.Token, _tokenValidationParameters, out var validatedToken);

                if (validatedToken is JwtSecurityToken jwtSecurityToken)
                {
                    var result = jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase);

                    if (result == false)
                    {
                        return null;
                    }
                }

                var utcExpireDate = long.Parse(tokenInVerification.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Exp).Value);

                var expireDate = UnixTimeStampToDateTime(utcExpireDate);

                if (expireDate > DateTime.UtcNow)
                {
                    return new RegistrationResponseDto
                    {
                        Success = false,
                        Errors = new List<string>()
                        {
                            "Token has not yet expired"
                        }
                    };
                }

                var storedRefreshToken = await _context.RefreshTokens.FirstOrDefaultAsync(x => x.Token == tokenRequest.RefreshToken);

                if (storedRefreshToken == null)
                {
                    return new RegistrationResponseDto
                    {
                        Success = false,
                        Errors = new List<string>()
                        {
                            "Token does not exist"
                        }
                    };
                }

                if (storedRefreshToken.IsUsed)
                {
                    return new RegistrationResponseDto
                    {
                        Success = false,
                        Errors = new List<string>()
                        {
                            "Token has been used"
                        }
                    };
                }

                if (storedRefreshToken.IsRevoked)
                {
                    return new RegistrationResponseDto
                    {
                        Success = false,
                        Errors = new List<string>()
                        {
                            "Token has been revoked"
                        }
                    };
                }

                var jti = tokenInVerification.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Jti).Value;

                if (storedRefreshToken.JwtId != jti)
                {
                    return new RegistrationResponseDto
                    {
                        Success = false,
                        Errors = new List<string>()
                        {
                            "Token does not match"
                        }
                    };
                }

                if (storedRefreshToken.ExpiryDate < DateTime.UtcNow)
                {
                    return new RegistrationResponseDto
                    {
                        Success = false,
                        Errors = new List<string>()
                        {
                            "Token has expired"
                        }
                    };
                }

                storedRefreshToken.IsUsed = true;
                _context.RefreshTokens.Update(storedRefreshToken);
                await _context.SaveChangesAsync();

                var dbUser = await _userManager.FindByIdAsync(storedRefreshToken.UserId);
                return await GenerateJwtToken(dbUser);
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        private string RandomStringGeneration(int length)
        {
            var random = new Random();
            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";

            return new string(Enumerable.Repeat(chars, length)
                               .Select(x => x[random.Next(x.Length)]).ToArray());
        }

        private DateTime UnixTimeStampToDateTime(long unixTimeStamp)
        {
            var dateTime = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
            dateTime = dateTime.AddSeconds(unixTimeStamp);
            return dateTime;
        }
    }
}
