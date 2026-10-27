using Neo4j.Driver;

namespace CFTS.GraphIntelligence.Services
{
    public class Neo4jGraphService
    {
        private readonly IDriver _driver;

        public Neo4jGraphService(IDriver driver)
        {
            _driver = driver;
        }

        public async Task<List<string>> GetCompaniesAsync()
        {
            List<string> companies = new List<string>();

            await using var session = _driver.AsyncSession();

            var result = await session.RunAsync(
                @"MATCH (c:Company)
                  RETURN c.companyId AS id,
                         c.name AS name
                  ORDER BY id"
            );

            var records = await result.ToListAsync();

            foreach (var record in records)
            {
                string id = record["id"].As<string>();
                string name = record["name"].As<string>();

                companies.Add(id + " - " + name);
            }

            return companies;
        }


        public async Task<List<string>> GetTransactionsAsync()
        {
            List<string> transactions = new List<string>();

            await using var session = _driver.AsyncSession();

            var result = await session.RunAsync(
                @"MATCH (sender:Company)-[:SENT]->(t:Transaction)-[:RECEIVED_BY]->(receiver:Company)
          RETURN t.transactionId AS id,
                 sender.name AS sender,
                 receiver.name AS receiver,
                 t.amount AS amount
          ORDER BY id"
            );

            var records = await result.ToListAsync();

            foreach (var record in records)
            {
                string id = record["id"].As<string>();
                string sender = record["sender"].As<string>();
                string receiver = record["receiver"].As<string>();
                long amount = record["amount"].As<long>();

                transactions.Add(
                    id + " | " + sender + " -> " +
                    receiver + " | R" + amount
                );
            }

            return transactions;
        }

    }
}
