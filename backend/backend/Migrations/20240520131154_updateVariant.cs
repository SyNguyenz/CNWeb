using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class updateVariant : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "VariantModel");

            migrationBuilder.CreateTable(
                name: "VariantModels",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    image = table.Column<string>(type: "text", nullable: false),
                    color = table.Column<string>(type: "text", nullable: false),
                    quantity = table.Column<int>(type: "integer", nullable: false),
                    sale = table.Column<byte>(type: "smallint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VariantModels", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Variants",
                columns: table => new
                {
                    MaHangHoa = table.Column<Guid>(type: "uuid", nullable: false),
                    VariantId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Variants", x => new { x.MaHangHoa, x.VariantId });
                    table.ForeignKey(
                        name: "FK_Variant_HangHoa",
                        column: x => x.MaHangHoa,
                        principalTable: "HangHoa",
                        principalColumn: "MaHangHoa",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Variant_VariantModel",
                        column: x => x.VariantId,
                        principalTable: "VariantModels",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Variants_VariantId",
                table: "Variants",
                column: "VariantId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Variants");

            migrationBuilder.DropTable(
                name: "VariantModels");

            migrationBuilder.CreateTable(
                name: "VariantModel",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    HangHoaMaHangHoa = table.Column<Guid>(type: "uuid", nullable: true),
                    color = table.Column<string>(type: "text", nullable: false),
                    image = table.Column<string>(type: "text", nullable: false),
                    quantity = table.Column<int>(type: "integer", nullable: false),
                    sale = table.Column<byte>(type: "smallint", nullable: false)
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
    }
}
