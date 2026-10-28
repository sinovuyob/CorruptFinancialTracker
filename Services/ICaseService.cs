using CorruptFinancialTracker.API.DTOs;
using CorruptFinancialTracker.API.Models;

namespace CorruptFinancialTracker.API.Services;

public interface ICaseService
{
    Task<List<InvestigationCase>> GetAllAsync();
    Task<InvestigationCase?> GetByIdAsync(int id);
    Task<InvestigationCase> CreateAsync(CreateCaseDto dto);
    Task<bool> UpdateAsync(int id, CreateCaseDto dto);
    Task<bool> DeleteAsync(int id);
}