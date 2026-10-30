using CorruptFinancialTracker.API.Data;
using CorruptFinancialTracker.API.DTOs;
using CorruptFinancialTracker.API.Models;
using Microsoft.EntityFrameworkCore;

namespace CorruptFinancialTracker.API.Services;

public class CaseService : ICaseService
{
    private readonly ApplicationDbContext _db;

    public CaseService(ApplicationDbContext db) => _db = db;

    public Task<List<InvestigationCase>> GetAllAsync() =>
        _db.InvestigationCases.AsNoTracking().ToListAsync();

    public Task<InvestigationCase?> GetByIdAsync(int id) =>
        _db.InvestigationCases.AsNoTracking()
            .FirstOrDefaultAsync(c => c.InvestigationCaseId == id);

    public async Task<InvestigationCase> CreateAsync(CreateCaseDto dto)
    {
        var investigationCase = new InvestigationCase
        {
            Title = dto.Title,
            Description = dto.Description,
            Status = "Open"
        };

        _db.InvestigationCases.Add(investigationCase);
        await _db.SaveChangesAsync();
        return investigationCase;
    }

    public async Task<bool> UpdateAsync(int id, CreateCaseDto dto)
    {
        var investigationCase =
            await _db.InvestigationCases.FindAsync(id);

        if (investigationCase is null) return false;

        investigationCase.Title = dto.Title;
        investigationCase.Description = dto.Description;

        await _db.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var investigationCase =
            await _db.InvestigationCases.FindAsync(id);

        if (investigationCase is null) return false;

        _db.InvestigationCases.Remove(investigationCase);
        await _db.SaveChangesAsync();
        return true;
    }
}