using CorruptFinancialTracker.API.DTOs;
using CorruptFinancialTracker.API.Models;

namespace CorruptFinancialTracker.API.Services;

public interface ITransactionService
{
    Task<List<Transaction>> GetAllAsync();
    Task<Transaction?> GetByIdAsync(int id);
    Task<Transaction?> CreateAsync(CreateTransactionDto dto);
    Task<bool> UpdateAsync(int id, CreateTransactionDto dto);
    Task<bool> DeleteAsync(int id);
}