using CorruptFinancialTracker.API.DTOs;
using CorruptFinancialTracker.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace CorruptFinancialTracker.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CompaniesController : ControllerBase
{
    private readonly ICompanyService _service;

    public CompaniesController(ICompanyService service) =>
        _service = service;

    [HttpGet]
    public async Task<IActionResult> GetAll() =>
        Ok(await _service.GetAllAsync());

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var company = await _service.GetByIdAsync(id);
        return company is null ? NotFound() : Ok(company);
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateCompanyDto dto)
    {
        var company = await _service.CreateAsync(dto);
        return CreatedAtAction(
            nameof(GetById),
            new { id = company.CompanyId },
            company);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(
        int id, CreateCompanyDto dto)
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