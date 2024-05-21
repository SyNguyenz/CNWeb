using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class fixPkCTDH2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_ChiTietDonHang",
                table: "ChiTietDonHang");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ChiTietDonHang",
                table: "ChiTietDonHang",
                columns: new[] { "MaDonHang", "MaHangHoa" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_ChiTietDonHang",
                table: "ChiTietDonHang");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ChiTietDonHang",
                table: "ChiTietDonHang",
                columns: new[] { "MaDonHang", "VariantId" });
        }
    }
}
