using Neo4j.Driver;
using CFTS.GraphIntelligence.Models;

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



        public async Task<List<FinancialPath>> GetFinancialPathsAsync(
            string startingCompanyId,
            string endingCompanyId)
        {
            List<FinancialPath> financialPaths = new List<FinancialPath>();

            await using var session = _driver.AsyncSession();

            var result = await session.RunAsync(
                @"MATCH path =
            (sender:Company {companyId: $startId})
            -[:SENT]->(:Transaction)
            -[:RECEIVED_BY]->(:Company)
            -[:SENT]->(:Transaction)
            -[:RECEIVED_BY]->
            (receiver:Company {companyId: $endId})

          RETURN
            sender.name AS startingCompany,
            receiver.name AS endingCompany,
            [node IN nodes(path) |
                CASE
                    WHEN node:Company THEN node.name
                    WHEN node:Transaction THEN node.transactionId
                END
            ] AS financialPath",
                new
                {
                    startId = startingCompanyId,
                    endId = endingCompanyId
                }
            );

            var records = await result.ToListAsync();

            foreach (var record in records)
            {
                FinancialPath financialPath = new FinancialPath
                {
                    StartingCompany = record["startingCompany"].As<string>(),
                    EndingCompany = record["endingCompany"].As<string>(),
                    Path = record["financialPath"].As<List<string>>()
                };

                financialPaths.Add(financialPath);
            }

            return financialPaths;
        }



    }
}
