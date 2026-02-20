using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GestaoOfficinaProj.Infra.Migrations
{
    /// <inheritdoc />
    public partial class profile : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "TipoImagem",
                table: "OrcamentoFotos",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "NomeArquivo",
                table: "OrcamentoFotos",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "ClienteAprovado",
                table: "Manutences",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DataAprovacao",
                table: "Manutences",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DataConclusao",
                table: "Manutences",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DataInicioExecucao",
                table: "Manutences",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MotivoRecusa",
                table: "Manutences",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "ValorFinal",
                table: "Manutences",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "ValorOrcado",
                table: "Manutences",
                type: "float",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ClienteAprovado",
                table: "Manutences");

            migrationBuilder.DropColumn(
                name: "DataAprovacao",
                table: "Manutences");

            migrationBuilder.DropColumn(
                name: "DataConclusao",
                table: "Manutences");

            migrationBuilder.DropColumn(
                name: "DataInicioExecucao",
                table: "Manutences");

            migrationBuilder.DropColumn(
                name: "MotivoRecusa",
                table: "Manutences");

            migrationBuilder.DropColumn(
                name: "ValorFinal",
                table: "Manutences");

            migrationBuilder.DropColumn(
                name: "ValorOrcado",
                table: "Manutences");

            migrationBuilder.AlterColumn<string>(
                name: "TipoImagem",
                table: "OrcamentoFotos",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "NomeArquivo",
                table: "OrcamentoFotos",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(500)",
                oldMaxLength: 500,
                oldNullable: true);
        }
    }
}
