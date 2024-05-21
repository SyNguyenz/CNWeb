using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class addFKtoVariantTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Variants_HangHoa_HangHoaMaHangHoa",
                table: "Variants");

            migrationBuilder.DropIndex(
                name: "IX_Variants_HangHoaMaHangHoa",
                table: "Variants");

            migrationBuilder.DropColumn(
                name: "HangHoaMaHangHoa",
                table: "Variants");

            migrationBuilder.AddColumn<Guid>(
                name: "ProductId",
                table: "Variants",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Variants_ProductId",
                table: "Variants",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_Variant_HangHoa",
                table: "Variants",
                column: "ProductId",
                principalTable: "HangHoa",
                principalColumn: "MaHangHoa",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Variant_HangHoa",
                table: "Variants");

            migrationBuilder.DropIndex(
                name: "IX_Variants_ProductId",
                table: "Variants");

            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "Variants");

            migrationBuilder.AddColumn<Guid>(
                name: "HangHoaMaHangHoa",
                table: "Variants",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Variants_HangHoaMaHangHoa",
                table: "Variants",
                column: "HangHoaMaHangHoa");

            migrationBuilder.AddForeignKey(
                name: "FK_Variants_HangHoa_HangHoaMaHangHoa",
                table: "Variants",
                column: "HangHoaMaHangHoa",
                principalTable: "HangHoa",
                principalColumn: "MaHangHoa");
        }
    }
}
