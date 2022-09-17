using Microsoft.EntityFrameworkCore.Migrations;

namespace backend2.Migrations
{
    public partial class Translation_field : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Translation",
                table: "Listens",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Translation",
                table: "Flashcards",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Translation",
                table: "Listens");

            migrationBuilder.DropColumn(
                name: "Translation",
                table: "Flashcards");
        }
    }
}
