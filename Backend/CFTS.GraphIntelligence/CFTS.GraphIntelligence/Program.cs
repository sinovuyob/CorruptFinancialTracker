using CFTS.GraphIntelligence.Models;
using CFTS.GraphIntelligence.Services;
using Neo4j.Driver;




string credentialsPath =
    Environment.GetEnvironmentVariable("NEO4J_CREDENTIALS_FILE")
    ?? throw new Exception("Neo4j credentials file path is not configured.");

string[] lines = File.ReadAllLines(credentialsPath);

Dictionary<string, string> credentials = new Dictionary<string, string>();

foreach (string line in lines)
{
string[] parts = line.Split('=', 2);

if (parts.Length == 2)
{
credentials[parts[0].Trim()] = parts[1].Trim();
}
}

string uri = credentials["NEO4J_URI"];
string username = credentials["NEO4J_USERNAME"];
string password = credentials["NEO4J_PASSWORD"];

Console.WriteLine("Neo4j credentials loaded successfully!");


try
{
    await using var driver = GraphDatabase.Driver(
        uri,
        AuthTokens.Basic(username, password)
    );

    await driver.VerifyConnectivityAsync();

    Console.WriteLine("Successfully connected to Neo4j!");

    Neo4jGraphService graphService = new Neo4jGraphService(driver);

    List<string> companiesFromService = await graphService.GetCompaniesAsync();

    Console.WriteLine("\nCompanies retrieved using Graph Service:");

    foreach (string company in companiesFromService)
    {
        Console.WriteLine(company);
    }


    List<string> transactionsFromService =
        await graphService.GetTransactionsAsync();

    Console.WriteLine("\nTransactions retrieved using Graph Service:");

    foreach (string transaction in transactionsFromService)
    {
        Console.WriteLine(transaction);
    }


    FinancialRiskService riskService = new FinancialRiskService(driver);

    List<RiskAssessment> riskAssessments =
        await riskService.GetRiskAssessmentsAsync();

    Console.WriteLine("\nFinancial Risk Assessments from Service:");

    foreach (RiskAssessment assessment in riskAssessments)
    {
        Console.WriteLine("\nSender: " + assessment.Sender);
        Console.WriteLine("Receiver: " + assessment.Receiver);
        Console.WriteLine("Transactions: " + assessment.TransactionCount);
        Console.WriteLine("Total Amount: R" + assessment.TotalAmount);
        Console.WriteLine("Risk Score: " + assessment.RiskScore + "/100");
        Console.WriteLine("Risk Level: " + assessment.RiskLevel);

        Console.WriteLine("Reasons: " +
            (assessment.Reasons.Count > 0
                ? string.Join(", ", assessment.Reasons)
                : "No configured risk indicators detected"));
    }



}
catch (AuthenticationException)
{
    Console.WriteLine("Authentication failed.");
}
catch (Exception ex)
{
    Console.WriteLine("Error type: " + ex.GetType().Name);
    Console.WriteLine("Error message: " + ex.Message);
}
