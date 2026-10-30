using System.ComponentModel.DataAnnotations;

namespace CorruptFinancialTracker.API.DTOs;

public class CreatePersonDto
{
    [Required, MaxLength(100)]
    public string FullName { get; set; } = string.Empty;

    [MaxLength(100)]
    public string? Nationality { get; set; }

    [MaxLength(100)]
    public string? Occupation { get; set; }
}