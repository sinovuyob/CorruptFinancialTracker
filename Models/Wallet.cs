using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CorruptFinancialTracker.API.Models;

public class Wallet
{
    public int WalletId { get; set; }

    [Required, MaxLength(30)]
    public string Blockchain { get; set; } = string.Empty;

    [Required, MaxLength(200)]
    public string WalletAddress { get; set; } = string.Empty;

    [Column(TypeName = "decimal(28,8)")]
    public decimal? Balance { get; set; }

    [MaxLength(10)]
    public string? Currency { get; set; }

    public int? PersonId { get; set; }
    public Person? Person { get; set; }
}