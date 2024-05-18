using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class fixProductFormat : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "img",
                table: "HangHoa",
                newName: "HangSanXuat");

            migrationBuilder.CreateTable(
                name: "VariantModel",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    image = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    color = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    details = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    HangHoaMaHangHoa = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VariantModel", x => x.id);
                    table.ForeignKey(
                        name: "FK_VariantModel_HangHoa_HangHoaMaHangHoa",
                        column: x => x.HangHoaMaHangHoa,
                        principalTable: "HangHoa",
                        principalColumn: "MaHangHoa");
                });

            migrationBuilder.CreateIndex(
                name: "IX_VariantModel_HangHoaMaHangHoa",
                table: "VariantModel",
                column: "HangHoaMaHangHoa");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "VariantModel");

            migrationBuilder.RenameColumn(
                name: "HangSanXuat",
                table: "HangHoa",
                newName: "img");
        }
    }
}
