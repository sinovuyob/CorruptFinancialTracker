
using CorruptFinancialTracker.API.Data;
using Neo4j.Driver;

namespace CorruptFinancialTracker.API.Services
{
    public class Neo4jTransactionSyncService
    {
        private readonly ApplicationDbContext _context;
        private readonly IDriver _driver;


     private static readonly Dictionary<int, string> CompanyIdMapping = new()
    {
        { 1, "C001" },
        { 4, "C002" },
        { 5, "C003" },
        { 6, "C004" },
        { 7, "C005" },
        { 8, "C006" },
        { 9, "C007" }
    };

        public Neo4jTransactionSyncService(
            ApplicationDbContext context,
            IDriver driver)
        {
            _context = context;
            _driver = driver;
        }

        public async Task<bool> SyncTransactionAsync(int transactionId)
        {
            var transaction = await _context.Transactions.FindAsync(transactionId);

            if (transaction == null ||
                !transaction.SenderCompanyId.HasValue ||
                !transaction.ReceiverCompanyId.HasValue)
            {
                return false;
            }

            if (!CompanyIdMapping.TryGetValue(
                    transaction.SenderCompanyId.Value, out string? senderId) ||
                !CompanyIdMapping.TryGetValue(
                    transaction.ReceiverCompanyId.Value, out string? receiverId))
            {
                return false;
            }

            string neo4jTransactionId = $"T{transaction.TransactionId:D3}";

            await using var session = _driver.AsyncSession();

            await session.ExecuteWriteAsync(async tx =>
            {
                var result = await tx.RunAsync(
                    """
            MATCH (sender:Company {companyId: $senderId})
            MATCH (receiver:Company {companyId: $receiverId})
            MERGE (t:Transaction {transactionId: $transactionId})
            SET t.amount = $amount,
                t.currency = $currency,
                t.transactionDate = datetime($transactionDate)
            WITH t, sender, receiver
            OPTIONAL MATCH (:Company)-[oldSent:SENT]->(t)
            DELETE oldSent
            WITH t, sender, receiver
            OPTIONAL MATCH (t)-[oldReceived:RECEIVED_BY]->(:Company)
            DELETE oldReceived
            WITH t, sender, receiver
            MERGE (sender)-[:SENT]->(t)
            MERGE (t)-[:RECEIVED_BY]->(receiver)
            RETURN t.transactionId AS transactionId
            """,
                    new
                    {
                        senderId,
                        receiverId,
                        transactionId = neo4jTransactionId,
                        amount = (double)transaction.Amount,
                        currency = transaction.Currency,
                        transactionDate = transaction.TransactionDate
                            .ToUniversalTime()
                            .ToString("o")
                    });

                if (!await result.FetchAsync())
                {
                    throw new InvalidOperationException(
                        "Sender or receiver company was not found in Neo4j.");
                }
            });

            return true;
        }

        public async Task DeleteTransactionAsync(int transactionId)
        {
            string neo4jTransactionId = $"T{transactionId:D3}";

            await using var session = _driver.AsyncSession();

            await session.ExecuteWriteAsync(async tx =>
            {
                await tx.RunAsync(
                    """
            MATCH (t:Transaction {transactionId: $transactionId})
            DETACH DELETE t
            """,
                    new
                    {
                        transactionId = neo4jTransactionId
                    });
            });
        }


    }

}
