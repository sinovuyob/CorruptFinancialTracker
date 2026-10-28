using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CFTS_CorruptFinancialTracking.Migrations
{
    /// <inheritdoc />
    public partial class AddSenderReceiverCompanies : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ReceiverCompanyId",
                table: "Transactions",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SenderCompanyId",
                table: "Transactions",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_ReceiverCompanyId",
                table: "Transactions",
                column: "ReceiverCompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_SenderCompanyId",
                table: "Transactions",
                column: "SenderCompanyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_Companies_ReceiverCompanyId",
                table: "Transactions",
                column: "ReceiverCompanyId",
                principalTable: "Companies",
                principalColumn: "CompanyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_Companies_SenderCompanyId",
                table: "Transactions",
                column: "SenderCompanyId",
                principalTable: "Companies",
                principalColumn: "CompanyId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_Companies_ReceiverCompanyId",
                table: "Transactions");

            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_Companies_SenderCompanyId",
                table: "Transactions");

            migrationBuilder.DropIndex(
                name: "IX_Transactions_ReceiverCompanyId",
                table: "Transactions");

            migrationBuilder.DropIndex(
                name: "IX_Transactions_SenderCompanyId",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "ReceiverCompanyId",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "SenderCompanyId",
                table: "Transactions");
        }
    }
}
