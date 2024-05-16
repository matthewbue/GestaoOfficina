using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GestaoOfficinaProj.Infra.Migrations
{
    /// <inheritdoc />
    public partial class ALTERTABLEKM : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Kmatual",
                table: "ManutenceServicos");

            migrationBuilder.AddColumn<double>(
                name: "KmAtual",
                table: "Manutences",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "KmAtual",
                table: "Manutences");

            migrationBuilder.AddColumn<double>(
                name: "Kmatual",
                table: "ManutenceServicos",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }
    }
}
