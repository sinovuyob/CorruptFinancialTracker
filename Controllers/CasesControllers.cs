using CorruptFinancialTracker.API.DTOs;
using CorruptFinancialTracker.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace CorruptFinancialTracker.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CasesController : ControllerBase
{
    private readonly ICaseService _service;

    public CasesController(ICaseService service) =>
        _service = service;

    [HttpGet]
    public async Task<IActionResult> GetAll() =>
        Ok(await _service.GetAllAsync());

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var investigationCase = await _service.GetByIdAsync(id);
        return investigationCase is null
            ? NotFound()
            : Ok(investigationCase);
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateCaseDto dto)
    {
        var investigationCase = await _service.CreateAsync(dto);

        return CreatedAtAction(
            nameof(GetById),
            new { id = investigationCase.InvestigationCaseId },
            investigationCase);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(
        int id, CreateCaseDto dto)
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