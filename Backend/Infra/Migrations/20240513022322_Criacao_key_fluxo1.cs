using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GestaoOfficinaProj.Infra.Migrations
{
    /// <inheritdoc />
    public partial class Criacao_key_fluxo1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Manutences_Clients_ClientsId",
                table: "Manutences");

            migrationBuilder.DropIndex(
                name: "IX_Manutences_ClientsId",
                table: "Manutences");

            migrationBuilder.DropColumn(
                name: "ClientId",
                table: "Manutences");

            migrationBuilder.DropColumn(
                name: "ClientsId",
                table: "Manutences");

            migrationBuilder.DropColumn(
                name: "ManutenceServicoId",
                table: "Manutences");

            migrationBuilder.DropColumn(
                name: "AutomovelId",
                table: "Clients");

            migrationBuilder.DropColumn(
                name: "ManutenceId",
                table: "Clients");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ClientId",
                table: "Manutences",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ClientsId",
                table: "Manutences",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ManutenceServicoId",
                table: "Manutences",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "AutomovelId",
                table: "Clients",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ManutenceId",
                table: "Clients",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Manutences_ClientsId",
                table: "Manutences",
                column: "ClientsId");

            migrationBuilder.AddForeignKey(
                name: "FK_Manutences_Clients_ClientsId",
                table: "Manutences",
                column: "ClientsId",
                principalTable: "Clients",
                principalColumn: "Id");
        }
    }
}
