using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GestaoOfficinaProj.Infra.Migrations
{
    /// <inheritdoc />
    public partial class foregnkeyclient : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
       
            migrationBuilder.CreateIndex(
                name: "IX_Clients_EmpresaId",
                table: "Clients",
                column: "EmpresaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Clients_Empresa_EmpresaId",
                table: "Clients",
                column: "EmpresaId",
                principalTable: "Empresa",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Clients_Empresa_EmpresaId",
                table: "Clients");

         
            migrationBuilder.DropIndex(
                name: "IX_Clients_EmpresaId",
                table: "Clients");

         
        }
    }
}
