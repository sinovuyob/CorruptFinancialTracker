using CorruptFinancialTracker.API.DTOs;
using CorruptFinancialTracker.API.Models;

namespace CorruptFinancialTracker.API.Services;

public interface ICompanyService
{
    Task<List<Company>> GetAllAsync();
    Task<Company?> GetByIdAsync(int id);
    Task<Company> CreateAsync(CreateCompanyDto dto);
    Task<bool> UpdateAsync(int id, CreateCompanyDto dto);
    Task<bool> DeleteAsync(int id);
}