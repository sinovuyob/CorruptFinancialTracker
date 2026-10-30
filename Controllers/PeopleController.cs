using CorruptFinancialTracker.API.DTOs;
using CorruptFinancialTracker.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace CorruptFinancialTracker.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PeopleController : ControllerBase
{
    private readonly IPersonService _service;

    public PeopleController(IPersonService service) =>
        _service = service;

    [HttpGet]
    public async Task<IActionResult> GetAll() =>
        Ok(await _service.GetAllAsync());

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var person = await _service.GetByIdAsync(id);
        return person is null ? NotFound() : Ok(person);
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreatePersonDto dto)
    {
        var person = await _service.CreateAsync(dto);
        return CreatedAtAction(
            nameof(GetById),
            new { id = person.PersonId },
            person);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(
        int id, CreatePersonDto dto)
    {
        return await _service.UpdateAsync(id, dto)
            ? NoContent()
            : NotFound();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        return await _service.DeleteAsync(id)
            ? NoContent()
            : NotFound();
    }
}