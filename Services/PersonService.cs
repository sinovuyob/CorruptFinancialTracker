using CorruptFinancialTracker.API.Data;
using CorruptFinancialTracker.API.DTOs;
using CorruptFinancialTracker.API.Models;
using Microsoft.EntityFrameworkCore;

namespace CorruptFinancialTracker.API.Services;

public class PersonService : IPersonService
{
    private readonly ApplicationDbContext _db;

    public PersonService(ApplicationDbContext db)
    {
        _db = db;
    }

    public Task<List<Person>> GetAllAsync() =>
        _db.People.AsNoTracking().ToListAsync();

    public Task<Person?> GetByIdAsync(int id) =>
        _db.People.AsNoTracking()
            .FirstOrDefaultAsync(p => p.PersonId == id);

    public async Task<Person> CreateAsync(CreatePersonDto dto)
    {
        var person = new Person
        {
            FullName = dto.FullName,
            Nationality = dto.Nationality,
            Occupation = dto.Occupation
        };

        _db.People.Add(person);
        await _db.SaveChangesAsync();
        return person;
    }

    public async Task<bool> UpdateAsync(int id, CreatePersonDto dto)
    {
        var person = await _db.People.FindAsync(id);
        if (person is null) return false;

        person.FullName = dto.FullName;
        person.Nationality = dto.Nationality;
        person.Occupation = dto.Occupation;

        await _db.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var person = await _db.People.FindAsync(id);
        if (person is null) return false;

        _db.People.Remove(person);
        await _db.SaveChangesAsync();
        return true;
    }
}