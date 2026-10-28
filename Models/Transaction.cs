using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CorruptFinancialTracker.API.Models;

public class Transaction
{
    public int TransactionId { get; set; }

    [Column(TypeName = "decimal(18,2)")]
    public decimal Amount { get; set; }

    [Required, MaxLength(10)]
    public string Currency { get; set; } = "ZAR";

    [Required, MaxLength(30)]
    public string TransactionType { get; set; } = string.Empty;

    public DateTime TransactionDate { get; set; } = DateTime.UtcNow;

    [MaxLength(500)]
    public string? Description { get; set; }

    public int? PersonId { get; set; }
    public Person? Person { get; set; }

    public int? CompanyId { get; set; }
    public Company? Company { get; set; }

    public int? SenderCompanyId { get; set; }
    public Company? SenderCompany { get; set; }

    public int? ReceiverCompanyId { get; set; }
    public Company? ReceiverCompany { get; set; }

}