using System.ComponentModel.DataAnnotations;

namespace CorruptFinancialTracker.API.DTOs;

public class CreateTransactionDto
{
    [Range(typeof(decimal), "0.01", "9999999999999999")]
    public decimal Amount { get; set; }

    [Required, MaxLength(10)]
    public string Currency { get; set; } = "ZAR";

    [Required, MaxLength(30)]
    public string TransactionType { get; set; } = string.Empty;

    public DateTime TransactionDate { get; set; } = DateTime.UtcNow;

    [MaxLength(500)]
    public string? Description { get; set; }

    public int? PersonId { get; set; }
    public int? CompanyId { get; set; }
}