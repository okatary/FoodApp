using FoodOrdering.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace FoodOrdering.Data
{
    public class DbInitializer
    {
        private readonly ModelBuilder modelBuilder;

        public DbInitializer(ModelBuilder modelBuilder)
        {
            this.modelBuilder = modelBuilder;
        }

        public void Seed()
        {
            var hasher = new PasswordHasher<IdentityUser>();

            modelBuilder.Entity<User>().HasData(
                new User
                {
                    UserName = "Katary",
                    Email = "katary@gmail.com",
                    PasswordHash = hasher.HashPassword(null, "P@55word")
                }
            );


           modelBuilder.Entity<FoodItem>().HasData(
                new FoodItem
                {
                    Id = 1,
                    Name = "Tahaluf® BigMac",
                    Description = "The McDonald's Big Mac® is a 100% beef burger with a taste like no other. The mouthwatering perfection starts with two 100% pure all beef patties and Big Mac® sauce sandwiched between a sesame seed bun. It's topped off with pickles, crisp shredded lettuce, finely chopped onion, and a slice of American cheese.",
                    AveragePrepationTime = new TimeSpan(0,20,0),
                    ImageUrl = "bigmac.png",
                    Price = 19.99f,
                    Quantity = 100000000,
                },
                new FoodItem
                {
                    Id = 2,
                    Name = "Tahaluf® BigTasty",
                    Description = "What makes our Big Tasty so tasty? It's the juicy beef patty smothered in three extraordinary slices of Emmental cheese, and topped with sliced tomato, shredded lettuce, onions and that special Big Tasty sauce.",
                    AveragePrepationTime = new TimeSpan(0, 20, 0),
                    ImageUrl = "bigtasty.png",
                    Price = 24.99f,
                    Quantity = 100000000,
                },
                new FoodItem
                {
                    Id = 3,
                    Name = "Tahaluf® McRoyal",
                    Description = "The McRoyale has it all! A juicy beef patty accompanied by cheese,covered with our special McRoyale sauce, crispy lettuce, fresh tomatoes, zesty onions and pickles all wrapped in a sesame seed bun.",
                    AveragePrepationTime = new TimeSpan(0, 20, 0),
                    ImageUrl = "mcroyal.png",
                    Price = 22.99f,
                    Quantity = 100000000,
                },
                new FoodItem
                {
                    Id = 4,
                    Name = "Tahaluf® McChicken",
                    Description = "McChicken® Sandwich. Crispy coated chicken with lettuce and our sandwich sauce, in a soft, sesame-topped bun. A true classic.",
                    AveragePrepationTime = new TimeSpan(0, 20, 0),
                    ImageUrl = "mcchicken.png",
                    Price = 16.99f,
                    Quantity = 100000000,
                },
                new FoodItem
                {
                    Id = 5,
                    Name = "Tahaluf® McFlurry Oreo",
                    Description = "The McDonald's McFlurry® with OREO® Cookies is a popular combination of creamy vanilla soft serve with crunchy pieces of OREO® cookies! There are 510 calories in a regular size OREO® McFlurry® at McDonald's.",
                    AveragePrepationTime = new TimeSpan(0, 20, 0),
                    ImageUrl = "mcflurry.png",
                    Price = 5.99f,
                    Quantity = 100000000,
                }
            );
        }
    }
}
