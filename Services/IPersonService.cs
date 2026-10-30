using CorruptFinancialTracker.API.DTOs;
using CorruptFinancialTracker.API.Models;

namespace CorruptFinancialTracker.API.Services;

public interface IPersonService
{
    Task<List<Person>> GetAllAsync();
    Task<Person?> GetByIdAsync(int id);
    Task<Person> CreateAsync(CreatePersonDto dto);
    Task<bool> UpdateAsync(int id, CreatePersonDto dto);
    Task<bool> DeleteAsync(int id);
}
