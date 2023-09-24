using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace FoodOrdering.Migrations
{
    /// <inheritdoc />
    public partial class intialdataseed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Credit", "Discriminator", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "bd2da3d1-2dd5-4ede-b9ce-88b582b2321a", 0, "36f30172-b337-4490-a75b-419105165299", 0f, "User", "katary@gmail.com", false, false, null, null, null, "AQAAAAEAACcQAAAAEB/g+k0ZXK8Z4qLhWwnsFc+tgRFPYdmdzxci47PkuXjw7UbyL++lI5Jj0zkf5OsFHw==", null, false, "23adc8d7-9a8a-421b-893a-bd33b9d72669", false, "Katary" });

            migrationBuilder.InsertData(
                table: "FoodItems",
                columns: new[] { "Id", "AveragePrepationTime", "Description", "ImageUrl", "Name", "Price", "Quantity" },
                values: new object[,]
                {
                    { 1, new TimeSpan(0, 0, 20, 0, 0), "The McDonald's Big Mac® is a 100% beef burger with a taste like no other. The mouthwatering perfection starts with two 100% pure all beef patties and Big Mac® sauce sandwiched between a sesame seed bun. It's topped off with pickles, crisp shredded lettuce, finely chopped onion, and a slice of American cheese.", "bigmac.png", "Tahaluf® BigMac", 19.99f, 100000000 },
                    { 2, new TimeSpan(0, 0, 20, 0, 0), "What makes our Big Tasty so tasty? It's the juicy beef patty smothered in three extraordinary slices of Emmental cheese, and topped with sliced tomato, shredded lettuce, onions and that special Big Tasty sauce.", "bigtasty.png", "Tahaluf® BigTasty", 24.99f, 100000000 },
                    { 3, new TimeSpan(0, 0, 20, 0, 0), "The McRoyale has it all! A juicy beef patty accompanied by cheese,covered with our special McRoyale sauce, crispy lettuce, fresh tomatoes, zesty onions and pickles all wrapped in a sesame seed bun.", "mcroyal.png", "Tahaluf® McRoyal", 22.99f, 100000000 },
                    { 4, new TimeSpan(0, 0, 20, 0, 0), "McChicken® Sandwich. Crispy coated chicken with lettuce and our sandwich sauce, in a soft, sesame-topped bun. A true classic.", "mcchicken.png", "Tahaluf® McChicken", 16.99f, 100000000 },
                    { 5, new TimeSpan(0, 0, 20, 0, 0), "The McDonald's McFlurry® with OREO® Cookies is a popular combination of creamy vanilla soft serve with crunchy pieces of OREO® cookies! There are 510 calories in a regular size OREO® McFlurry® at McDonald's.", "mcflurry.png", "Tahaluf® McFlurry Oreo", 5.99f, 100000000 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "bd2da3d1-2dd5-4ede-b9ce-88b582b2321a");

            migrationBuilder.DeleteData(
                table: "FoodItems",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "FoodItems",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "FoodItems",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "FoodItems",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "FoodItems",
                keyColumn: "Id",
                keyValue: 5);
        }
    }
}
