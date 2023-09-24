using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FoodOrdering.Migrations
{
    /// <inheritdoc />
    public partial class Addinitialusercredit : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "bd2da3d1-2dd5-4ede-b9ce-88b582b2321a");

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Credit", "Discriminator", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "d15f7144-5a31-4614-b5c2-67f14c044087", 0, "34a4f4e7-b44b-4a44-9b9b-702e7afd8b91", 1000f, "User", "katary@gmail.com", false, false, null, null, null, "AQAAAAEAACcQAAAAEKdlAG1riG2Ew6SgFH7L/FNIN62Hj5w3g0r5D+z1DqQsgt10HDsUsyJWV9YUIbN7bQ==", null, false, "6728e50c-d3dd-41d7-814b-cc9c72ab2b5e", false, "Katary" });

            migrationBuilder.UpdateData(
                table: "FoodItems",
                keyColumn: "Id",
                keyValue: 1,
                column: "ImageUrl",
                value: "bigmac.png");

            migrationBuilder.UpdateData(
                table: "FoodItems",
                keyColumn: "Id",
                keyValue: 2,
                column: "ImageUrl",
                value: "bigtasty.png");

            migrationBuilder.UpdateData(
                table: "FoodItems",
                keyColumn: "Id",
                keyValue: 3,
                column: "ImageUrl",
                value: "mcroyal.png");

            migrationBuilder.UpdateData(
                table: "FoodItems",
                keyColumn: "Id",
                keyValue: 4,
                column: "ImageUrl",
                value: "mcchicken.png");

            migrationBuilder.UpdateData(
                table: "FoodItems",
                keyColumn: "Id",
                keyValue: 5,
                column: "ImageUrl",
                value: "mcflurry.png");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "d15f7144-5a31-4614-b5c2-67f14c044087");

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Credit", "Discriminator", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "bd2da3d1-2dd5-4ede-b9ce-88b582b2321a", 0, "36f30172-b337-4490-a75b-419105165299", 0f, "User", "katary@gmail.com", false, false, null, null, null, "AQAAAAEAACcQAAAAEB/g+k0ZXK8Z4qLhWwnsFc+tgRFPYdmdzxci47PkuXjw7UbyL++lI5Jj0zkf5OsFHw==", null, false, "23adc8d7-9a8a-421b-893a-bd33b9d72669", false, "Katary" });

            migrationBuilder.UpdateData(
                table: "FoodItems",
                keyColumn: "Id",
                keyValue: 1,
                column: "ImageUrl",
                value: "utils/bigmac.png");

            migrationBuilder.UpdateData(
                table: "FoodItems",
                keyColumn: "Id",
                keyValue: 2,
                column: "ImageUrl",
                value: "utils/bigmac.png");

            migrationBuilder.UpdateData(
                table: "FoodItems",
                keyColumn: "Id",
                keyValue: 3,
                column: "ImageUrl",
                value: "utils/bigmac.png");

            migrationBuilder.UpdateData(
                table: "FoodItems",
                keyColumn: "Id",
                keyValue: 4,
                column: "ImageUrl",
                value: "utils/bigmac.png");

            migrationBuilder.UpdateData(
                table: "FoodItems",
                keyColumn: "Id",
                keyValue: 5,
                column: "ImageUrl",
                value: "utils/bigmac.png");
        }
    }
}
