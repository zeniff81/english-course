using Microsoft.EntityFrameworkCore.Migrations;

namespace backend2.Migrations
{
    public partial class Listen_Entity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Listen",
                columns: table => new
                {
                    ListenId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GroupIndex = table.Column<int>(type: "int", nullable: false),
                    Sentence = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LessonId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Listen", x => x.ListenId);
                    table.ForeignKey(
                        name: "FK_Listen_Lessons_LessonId",
                        column: x => x.LessonId,
                        principalTable: "Lessons",
                        principalColumn: "LessonId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Listen_LessonId",
                table: "Listen",
                column: "LessonId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Listen");
        }
    }
}
