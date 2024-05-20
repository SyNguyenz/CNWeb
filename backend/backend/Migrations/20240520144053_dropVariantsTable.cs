using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class dropVariantsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Variant_HangHoa",
                table: "Variants");

            migrationBuilder.DropForeignKey(
                name: "FK_Variant_VariantModel",
                table: "Variants");

            migrationBuilder.DropTable(
                name: "VariantModels");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Variants",
                table: "Variants");

            migrationBuilder.DropIndex(
                name: "IX_Variants_VariantId",
                table: "Variants");

            migrationBuilder.DropColumn(
                name: "MaHangHoa",
                table: "Variants");

            migrationBuilder.RenameColumn(
                name: "VariantId",
                table: "Variants",
                newName: "quantity");

            migrationBuilder.AddColumn<int>(
                name: "id",
                table: "Variants",
                type: "integer",
                nullable: false,
                defaultValue: 0)
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<Guid>(
                name: "HangHoaMaHangHoa",
                table: "Variants",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "color",
                table: "Variants",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "image",
                table: "Variants",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<byte>(
                name: "sale",
                table: "Variants",
                type: "smallint",
                nullable: false,
                defaultValue: (byte)0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Variants",
                table: "Variants",
                column: "id");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Variants_HangHoa_HangHoaMaHangHoa",
                table: "Variants");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Variants",
                table: "Variants");

            migrationBuilder.DropIndex(
                name: "IX_Variants_HangHoaMaHangHoa",
                table: "Variants");

            migrationBuilder.DropColumn(
                name: "id",
                table: "Variants");

            migrationBuilder.DropColumn(
                name: "HangHoaMaHangHoa",
                table: "Variants");

            migrationBuilder.DropColumn(
                name: "color",
                table: "Variants");

            migrationBuilder.DropColumn(
                name: "image",
                table: "Variants");

            migrationBuilder.DropColumn(
                name: "sale",
                table: "Variants");

            migrationBuilder.RenameColumn(
                name: "quantity",
                table: "Variants",
                newName: "VariantId");

            migrationBuilder.AddColumn<Guid>(
                name: "MaHangHoa",
                table: "Variants",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AlterColumn<string>(
                name: "ThongTin",
                table: "HangHoa",
                type: "text",
                nullable: false,
                oldClrType: typeof(List<string>),
                oldType: "text[]");

            migrationBuilder.AlterColumn<string>(
                name: "ThongSo",
                table: "HangHoa",
                type: "text",
                nullable: false,
                oldClrType: typeof(List<string>),
                oldType: "text[]");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Variants",
                table: "Variants",
                columns: new[] { "MaHangHoa", "VariantId" });

            migrationBuilder.CreateTable(
                name: "VariantModels",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    color = table.Column<string>(type: "text", nullable: false),
                    image = table.Column<string>(type: "text", nullable: false),
                    quantity = table.Column<int>(type: "integer", nullable: false),
                    sale = table.Column<byte>(type: "smallint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VariantModels", x => x.id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Variants_VariantId",
                table: "Variants",
                column: "VariantId");

            migrationBuilder.AddForeignKey(
                name: "FK_Variant_HangHoa",
                table: "Variants",
                column: "MaHangHoa",
                principalTable: "HangHoa",
                principalColumn: "MaHangHoa",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Variant_VariantModel",
                table: "Variants",
                column: "VariantId",
                principalTable: "VariantModels",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
