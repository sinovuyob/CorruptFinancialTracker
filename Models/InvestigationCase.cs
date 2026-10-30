using System.ComponentModel.DataAnnotations;

namespace CorruptFinancialTracker.API.Models;

public class InvestigationCase
{
    public int InvestigationCaseId { get; set; }

    [Required, MaxLength(150)]
    public string Title { get; set; } = string.Empty;

    [MaxLength(1000)]
    public string? Description { get; set; }

    [Required, MaxLength(30)]
    public string Status { get; set; } = "Open";

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}