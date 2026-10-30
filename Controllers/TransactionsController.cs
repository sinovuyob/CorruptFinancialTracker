using CorruptFinancialTracker.API.DTOs;
using CorruptFinancialTracker.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace CorruptFinancialTracker.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TransactionsController : ControllerBase
{
    private readonly ITransactionService _service;

    public TransactionsController(ITransactionService service) =>
        _service = service;

    [HttpGet]
    public async Task<IActionResult> GetAll() =>
        Ok(await _service.GetAllAsync());

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var transaction = await _service.GetByIdAsync(id);
        return transaction is null ? NotFound() : Ok(transaction);
    }

    [HttpPost]
    public async Task<IActionResult> Create(
        CreateTransactionDto dto)
    {
        var transaction = await _service.CreateAsync(dto);

        if (transaction is null)
            return BadRequest(
                "The supplied person or company does not exist.");

        return CreatedAtAction(
            nameof(GetById),
            new { id = transaction.TransactionId },
            transaction);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(
        int id, CreateTransactionDto dto)
    {
        return await _service.UpdateAsync(id, dto)
            ? NoContent()
            : BadRequest(
                "Transaction not found or referenced entity is invalid.");
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        return await _service.DeleteAsync(id)
            ? NoContent()
            : NotFound();
    }
}