using Microsoft.EntityFrameworkCore.Migrations;

namespace backend2.Migrations
{
    public partial class SentenceIndex : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SentenceIndex",
                table: "Listens",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SentenceIndex",
                table: "Listens");
        }
    }
}
