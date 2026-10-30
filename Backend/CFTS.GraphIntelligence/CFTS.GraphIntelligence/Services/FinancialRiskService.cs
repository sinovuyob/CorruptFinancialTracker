
using Neo4j.Driver;
using CFTS.GraphIntelligence.Models;

namespace CFTS.GraphIntelligence.Services
{
    public class FinancialRiskService
    {
        private readonly IDriver _driver;

        public FinancialRiskService(IDriver driver)
        {
            _driver = driver;
        }

        public async Task<List<RiskAssessment>> GetRiskAssessmentsAsync()
        {
            List<RiskAssessment> assessments = new List<RiskAssessment>();

            await using var session = _driver.AsyncSession();

            var result = await session.RunAsync(
                @"MATCH (sender:Company)-[:SENT]->(t:Transaction)-[:RECEIVED_BY]->(receiver:Company)
                  WITH sender, receiver, t
                  ORDER BY t.transactionDate

                  WITH sender, receiver,
                       collect(t) AS transactions

                  WITH sender, receiver, transactions,
                       size(transactions) AS transactionCount,
                       reduce(total = 0, t IN transactions |
                              total + t.amount) AS totalAmount

                  WITH sender, receiver, transactionCount, totalAmount,
                       any(start IN transactions WHERE
                           size([t IN transactions WHERE
                               t.transactionDate >= start.transactionDate
                               AND t.transactionDate <=
                                   start.transactionDate + duration({minutes: 30})
                           ]) >= 3
                       ) AS hasRapidTransfers

                  RETURN sender.name AS sender,
                         receiver.name AS receiver,
                         transactionCount,
                         totalAmount,
                         hasRapidTransfers"
            );

            var records = await result.ToListAsync();

            foreach (var record in records)
            {
                long count = record["transactionCount"].As<long>();
                long amount = record["totalAmount"].As<long>();
                bool rapid = record["hasRapidTransfers"].As<bool>();

                int score = 0;
                List<string> reasons = new List<string>();

                if (count >= 3)
                {
                    score += 25;
                    reasons.Add("Repeated transactions");
                }

                if (rapid)
                {
                    score += 35;
                    reasons.Add("Rapid transfers within 30 minutes");
                }

                if (amount >= 100000)
                {
                    score += 20;
                    reasons.Add("High total transfer amount");
                }

                string riskLevel;

                if (score >= 60)
                    riskLevel = "HIGH";
                else if (score >= 25)
                    riskLevel = "MEDIUM";
                else
                    riskLevel = "LOW";

                RiskAssessment assessment = new RiskAssessment
                {
                    Sender = record["sender"].As<string>(),
                    Receiver = record["receiver"].As<string>(),
                    TransactionCount = count,
                    TotalAmount = amount,
                    RiskScore = score,
                    RiskLevel = riskLevel,
                    Reasons = reasons
                };

                assessments.Add(assessment);
            }

            return assessments;
        }
    }
}
