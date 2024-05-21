using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class fixChiTietDonHang : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ChiTietDonHang_HangHoa",
                table: "ChiTietDonHang");

            migrationBuilder.DropIndex(
                name: "IX_ChiTietDonHang_MaHangHoa",
                table: "ChiTietDonHang");

            migrationBuilder.AddColumn<int>(
                name: "VariantId",
                table: "ChiTietDonHang",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_ChiTietDonHang_VariantId",
                table: "ChiTietDonHang",
                column: "VariantId");

            migrationBuilder.AddForeignKey(
                name: "FK_ChiTietDonHang_Variant",
                table: "ChiTietDonHang",
                column: "VariantId",
                principalTable: "Variants",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ChiTietDonHang_Variant",
                table: "ChiTietDonHang");

            migrationBuilder.DropIndex(
                name: "IX_ChiTietDonHang_VariantId",
                table: "ChiTietDonHang");

            migrationBuilder.DropColumn(
                name: "VariantId",
                table: "ChiTietDonHang");

            migrationBuilder.CreateIndex(
                name: "IX_ChiTietDonHang_MaHangHoa",
                table: "ChiTietDonHang",
                column: "MaHangHoa");

            migrationBuilder.AddForeignKey(
                name: "FK_ChiTietDonHang_HangHoa",
                table: "ChiTietDonHang",
                column: "MaHangHoa",
                principalTable: "HangHoa",
                principalColumn: "MaHangHoa",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
