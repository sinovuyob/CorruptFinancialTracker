using CorruptFinancialTracker.API.Data;
using CorruptFinancialTracker.API.DTOs;
using CorruptFinancialTracker.API.Models;
using Microsoft.EntityFrameworkCore;

namespace CorruptFinancialTracker.API.Services;

public class CompanyService : ICompanyService
{
    private readonly ApplicationDbContext _db;

    public CompanyService(ApplicationDbContext db) => _db = db;

    public Task<List<Company>> GetAllAsync() =>
        _db.Companies.AsNoTracking().ToListAsync();

    public Task<Company?> GetByIdAsync(int id) =>
        _db.Companies.AsNoTracking()
            .FirstOrDefaultAsync(c => c.CompanyId == id);

    public async Task<Company> CreateAsync(CreateCompanyDto dto)
    {
        var company = new Company
        {
            CompanyName = dto.CompanyName,
            RegistrationNumber = dto.RegistrationNumber,
            Industry = dto.Industry,
            Address = dto.Address
        };

        _db.Companies.Add(company);
        await _db.SaveChangesAsync();
        return company;
    }

    public async Task<bool> UpdateAsync(int id, CreateCompanyDto dto)
    {
        var company = await _db.Companies.FindAsync(id);
        if (company is null) return false;

        company.CompanyName = dto.CompanyName;
        company.RegistrationNumber = dto.RegistrationNumber;
        company.Industry = dto.Industry;
        company.Address = dto.Address;

        await _db.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var company = await _db.Companies.FindAsync(id);
        if (company is null) return false;

        _db.Companies.Remove(company);
        await _db.SaveChangesAsync();
        return true;
    }
}