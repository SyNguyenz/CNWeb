using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class fixProductFormat2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "details",
                table: "VariantModel");

            migrationBuilder.DropColumn(
                name: "GiamGia",
                table: "HangHoa");

            migrationBuilder.DropColumn(
                name: "SoLuongTon",
                table: "HangHoa");

            migrationBuilder.AddColumn<int>(
                name: "quantity",
                table: "VariantModel",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<byte>(
                name: "sale",
                table: "VariantModel",
                type: "tinyint",
                nullable: false,
                defaultValue: (byte)0);

            migrationBuilder.AddColumn<string>(
                name: "ThongSo",
                table: "HangHoa",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "quantity",
                table: "VariantModel");

            migrationBuilder.DropColumn(
                name: "sale",
                table: "VariantModel");

            migrationBuilder.DropColumn(
                name: "ThongSo",
                table: "HangHoa");

            migrationBuilder.AddColumn<string>(
                name: "details",
                table: "VariantModel",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<byte>(
                name: "GiamGia",
                table: "HangHoa",
                type: "tinyint",
                nullable: false,
                defaultValue: (byte)0);

            migrationBuilder.AddColumn<int>(
                name: "SoLuongTon",
                table: "HangHoa",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
