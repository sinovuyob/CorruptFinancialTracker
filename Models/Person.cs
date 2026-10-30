using System.ComponentModel.DataAnnotations;

namespace CorruptFinancialTracker.API.Models;

public class Person
{
    public int PersonId { get; set; }

    [Required, MaxLength(100)]
    public string FullName { get; set; } = string.Empty;

    [MaxLength(100)]
    public string? Nationality { get; set; }

    [MaxLength(100)]
    public string? Occupation { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<Transaction> Transactions { get; set; }
        = new List<Transaction>();
}