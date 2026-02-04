using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GestaoOfficinaProj.Infra.Migrations
{
    /// <inheritdoc />
    public partial class AdicionarFluxoOrcamento : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DataCheckIn",
                table: "Manutences",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DataDiagnostico",
                table: "Manutences",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DataOrcamentoCriado",
                table: "Manutences",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DiagnosticoMecanico",
                table: "Manutences",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MecanicoId",
                table: "Manutences",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "OperadorCheckInId",
                table: "Manutences",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "OperadorOrcamentoId",
                table: "Manutences",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "StatusOrcamento",
                table: "Manutences",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "OrcamentoFotos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ImagemBytes = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    NomeArquivo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TipoImagem = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DataUpload = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Descricao = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ManutenceId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrcamentoFotos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrcamentoFotos_Manutences_ManutenceId",
                        column: x => x.ManutenceId,
                        principalTable: "Manutences",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrcamentoFotos_ManutenceId",
                table: "OrcamentoFotos",
                column: "ManutenceId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrcamentoFotos");

            migrationBuilder.DropColumn(
                name: "DataCheckIn",
                table: "Manutences");

            migrationBuilder.DropColumn(
                name: "DataDiagnostico",
                table: "Manutences");

            migrationBuilder.DropColumn(
                name: "DataOrcamentoCriado",
                table: "Manutences");

            migrationBuilder.DropColumn(
                name: "DiagnosticoMecanico",
                table: "Manutences");

            migrationBuilder.DropColumn(
                name: "MecanicoId",
                table: "Manutences");

            migrationBuilder.DropColumn(
                name: "OperadorCheckInId",
                table: "Manutences");

            migrationBuilder.DropColumn(
                name: "OperadorOrcamentoId",
                table: "Manutences");

            migrationBuilder.DropColumn(
                name: "StatusOrcamento",
                table: "Manutences");
        }
    }
}
