using Microsoft.EntityFrameworkCore.Migrations;

namespace backend2.Migrations
{
    public partial class remove_groupIndex : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GroupIndex",
                table: "Listens");

            migrationBuilder.AlterColumn<string>(
                name: "SentenceIndex",
                table: "Listens",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "SentenceIndex",
                table: "Listens",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "GroupIndex",
                table: "Listens",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
