using CorruptFinancialTracker.API.Data;
using CorruptFinancialTracker.API.DTOs;
using CorruptFinancialTracker.API.Models;
using Microsoft.EntityFrameworkCore;

namespace CorruptFinancialTracker.API.Services;

public class TransactionService : ITransactionService
{
    private readonly ApplicationDbContext _db;

    public TransactionService(ApplicationDbContext db) => _db = db;

    public Task<List<Transaction>> GetAllAsync() =>
        _db.Transactions.AsNoTracking().ToListAsync();

    public Task<Transaction?> GetByIdAsync(int id) =>
        _db.Transactions.AsNoTracking()
            .FirstOrDefaultAsync(t => t.TransactionId == id);

    public async Task<Transaction?> CreateAsync(CreateTransactionDto dto)
    {
        if (dto.PersonId.HasValue &&
            !await _db.People.AnyAsync(p => p.PersonId == dto.PersonId))
            return null;

        if (dto.CompanyId.HasValue &&
            !await _db.Companies.AnyAsync(c => c.CompanyId == dto.CompanyId))
            return null;

        if (dto.SenderCompanyId.HasValue &&
            !await _db.Companies.AnyAsync(c => c.CompanyId == dto.SenderCompanyId))
            return null;

        if (dto.ReceiverCompanyId.HasValue &&
            !await _db.Companies.AnyAsync(c => c.CompanyId == dto.ReceiverCompanyId))
            return null;


        var transaction = new Transaction
        {
            Amount = dto.Amount,
            Currency = dto.Currency,
            TransactionType = dto.TransactionType,
            TransactionDate = dto.TransactionDate,
            Description = dto.Description,

            PersonId = dto.PersonId,
            CompanyId = dto.CompanyId,
            SenderCompanyId = dto.SenderCompanyId,
            ReceiverCompanyId = dto.ReceiverCompanyId
        };

        _db.Transactions.Add(transaction);
        await _db.SaveChangesAsync();
        return transaction;
    }

    public async Task<bool> UpdateAsync(int id, CreateTransactionDto dto)
    {
        var transaction = await _db.Transactions.FindAsync(id);
        if (transaction is null) return false;

        if (dto.PersonId.HasValue &&
            !await _db.People.AnyAsync(p => p.PersonId == dto.PersonId))
            return false;

        if (dto.CompanyId.HasValue &&
            !await _db.Companies.AnyAsync(c => c.CompanyId == dto.CompanyId))
            return false;

        if (dto.SenderCompanyId.HasValue &&
            !await _db.Companies.AnyAsync(c => c.CompanyId == dto.SenderCompanyId))
            return false;

        if (dto.ReceiverCompanyId.HasValue &&
            !await _db.Companies.AnyAsync(c => c.CompanyId == dto.ReceiverCompanyId))
            return false;


        transaction.Amount = dto.Amount;
        transaction.Currency = dto.Currency;
        transaction.TransactionType = dto.TransactionType;
        transaction.TransactionDate = dto.TransactionDate;
        transaction.Description = dto.Description;
        transaction.PersonId = dto.PersonId;
        transaction.CompanyId = dto.CompanyId;

        transaction.SenderCompanyId = dto.SenderCompanyId;
        transaction.ReceiverCompanyId = dto.ReceiverCompanyId;


        await _db.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var transaction = await _db.Transactions.FindAsync(id);
        if (transaction is null) return false;

        _db.Transactions.Remove(transaction);
        await _db.SaveChangesAsync();
        return true;
    }
}