using Microsoft.EntityFrameworkCore.Migrations;

namespace GestaoOfficinaProj.Infra.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Client",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    bairro = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    cidade = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    dataNascimento = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    endereco = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    uf = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    nomeCliente = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    numeroWhatsapp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    telefoneContato = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CPFcpfCliente = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AutomovelId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Client", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Profission = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CPF = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Automovel",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    marcaVeiculo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    placaVeiculo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    corVeiculo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    modeloVeiculo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    anoVeiculo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    kmVeiculo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClientId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Automovel", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Automovel_Client_ClientId",
                        column: x => x.ClientId,
                        principalTable: "Client",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Automovel_ClientId",
                table: "Automovel",
                column: "ClientId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Automovel");

            migrationBuilder.DropTable(
                name: "User");

            migrationBuilder.DropTable(
                name: "Client");
        }
    }
}
