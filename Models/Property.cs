using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CorruptFinancialTracker.API.Models;

public class Property
{
    public int PropertyId { get; set; }

    [Required, MaxLength(200)]
    public string Address { get; set; } = string.Empty;

    [Column(TypeName = "decimal(18,2)")]
    public decimal EstimatedValue { get; set; }

    [MaxLength(50)]
    public string? PropertyType { get; set; }

    public int? PersonId { get; set; }
    public Person? Person { get; set; }

    public int? CompanyId { get; set; }
    public Company? Company { get; set; }
}