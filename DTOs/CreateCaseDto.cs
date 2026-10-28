using System.ComponentModel.DataAnnotations;

namespace CorruptFinancialTracker.API.DTOs;

public class CreateCaseDto
{
    [Required, MaxLength(150)]
    public string Title { get; set; } = string.Empty;

    [MaxLength(1000)]
    public string? Description { get; set; }
}