using System.ComponentModel.DataAnnotations;

namespace CorruptFinancialTracker.API.Models;

public class Company
{
    public int CompanyId { get; set; }

    [Required, MaxLength(150)]
    public string CompanyName { get; set; } = string.Empty;

    [MaxLength(100)]
    public string? RegistrationNumber { get; set; }

    [MaxLength(100)]
    public string? Industry { get; set; }

    [MaxLength(200)]
    public string? Address { get; set; }

    public ICollection<Transaction> Transactions { get; set; }
        = new List<Transaction>();
}