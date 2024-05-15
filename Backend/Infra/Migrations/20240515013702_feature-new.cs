using Microsoft.EntityFrameworkCore.Migrations;

namespace GestaoOfficinaProj.Infra.Migrations
{
    public partial class featurenew : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Manutences_Clients_ClientsId",
                table: "Manutences");

            migrationBuilder.DropIndex(
                name: "IX_Manutences_ClientsId",
                table: "Manutences");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Users",
                table: "Users");

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
                name: "ManutenceId",
                table: "Clients");

            migrationBuilder.DropColumn(
                name: "Profission",
                table: "Users");

            migrationBuilder.RenameTable(
                name: "Users",
                newName: "User");

            migrationBuilder.RenameColumn(
                name: "AutomovelId",
                table: "Clients",
                newName: "EmpresaId");

            migrationBuilder.AddColumn<int>(
                name: "ClientId",
                table: "User",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "EmpresaId",
                table: "User",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Profile",
                table: "User",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_User",
                table: "User",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Empresa",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nome = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Endereco = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Empresa", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Empresa");

            migrationBuilder.DropPrimaryKey(
                name: "PK_User",
                table: "User");

            migrationBuilder.DropColumn(
                name: "ClientId",
                table: "User");

            migrationBuilder.DropColumn(
                name: "EmpresaId",
                table: "User");

            migrationBuilder.DropColumn(
                name: "Profile",
                table: "User");

            migrationBuilder.RenameTable(
                name: "User",
                newName: "Users");

            migrationBuilder.RenameColumn(
                name: "EmpresaId",
                table: "Clients",
                newName: "AutomovelId");

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
                name: "ManutenceId",
                table: "Clients",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Profission",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Users",
                table: "Users",
                column: "Id");

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
