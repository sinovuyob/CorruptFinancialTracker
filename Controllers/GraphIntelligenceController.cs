
using CFTS.GraphIntelligence.Services;
using CorruptFinancialTracker.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace CorruptFinancialTracker.API.Controllers
{
    [ApiController]
    [Route("api/graph")]
    public class GraphIntelligenceController : ControllerBase
    {
        private readonly Neo4jGraphService _graphService;
        private readonly FinancialRiskService _riskService;
        private readonly Neo4jTransactionSyncService _syncService;


        public GraphIntelligenceController(
            Neo4jGraphService graphService,
            FinancialRiskService riskService,
            Neo4jTransactionSyncService syncService)
        {
            _graphService = graphService;
            _riskService = riskService;
            _syncService = syncService;
        }



        [HttpGet("companies")]
        public async Task<IActionResult> GetCompanies()
        {
            try
            {
                var companies = await _graphService.GetCompaniesAsync();

                return Ok(companies);
            }
            catch (Exception)
            {
                return StatusCode(500, new
                {
                    message = "Unable to retrieve companies from Neo4j."
                });
            }
        }

        [HttpGet("transactions")]
        public async Task<IActionResult> GetTransactions()
        {
            try
            {
                var transactions = await _graphService.GetTransactionsAsync();

                return Ok(transactions);
            }
            catch (Exception)
            {
                return StatusCode(500, new
                {
                    message = "Unable to retrieve transactions from Neo4j."
                });
            }
        }

        [HttpGet("financial-paths")]
        public async Task<IActionResult> GetFinancialPaths(
        [FromQuery] string startingCompanyId,
        [FromQuery] string endingCompanyId)
        {
            try
            {
                var paths = await _graphService.GetFinancialPathsAsync(
                    startingCompanyId,
                    endingCompanyId);

                return Ok(paths);
            }
            catch (Exception)
            {
                return StatusCode(500, new
                {
                    message = "Unable to retrieve financial paths from Neo4j."
                });
            }
        }


        [HttpGet("risk-assessments")]
        public async Task<IActionResult> GetRiskAssessments()
        {
            try
            {
                var assessments = await _riskService.GetRiskAssessmentsAsync();

                return Ok(assessments);
            }
            catch (Exception)
            {
                return StatusCode(500, new
                {
                    message = "Unable to retrieve risk assessments from Neo4j."
                });
            }
        }

    }
}
