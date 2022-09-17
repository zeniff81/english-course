using Microsoft.EntityFrameworkCore.Migrations;

namespace backend2.Migrations
{
    public partial class Listen_Dbset_in_Context : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Listen_Lessons_LessonId",
                table: "Listen");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Listen",
                table: "Listen");

            migrationBuilder.RenameTable(
                name: "Listen",
                newName: "Listens");

            migrationBuilder.RenameIndex(
                name: "IX_Listen_LessonId",
                table: "Listens",
                newName: "IX_Listens_LessonId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Listens",
                table: "Listens",
                column: "ListenId");

            migrationBuilder.AddForeignKey(
                name: "FK_Listens_Lessons_LessonId",
                table: "Listens",
                column: "LessonId",
                principalTable: "Lessons",
                principalColumn: "LessonId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Listens_Lessons_LessonId",
                table: "Listens");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Listens",
                table: "Listens");

            migrationBuilder.RenameTable(
                name: "Listens",
                newName: "Listen");

            migrationBuilder.RenameIndex(
                name: "IX_Listens_LessonId",
                table: "Listen",
                newName: "IX_Listen_LessonId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Listen",
                table: "Listen",
                column: "ListenId");

            migrationBuilder.AddForeignKey(
                name: "FK_Listen_Lessons_LessonId",
                table: "Listen",
                column: "LessonId",
                principalTable: "Lessons",
                principalColumn: "LessonId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
