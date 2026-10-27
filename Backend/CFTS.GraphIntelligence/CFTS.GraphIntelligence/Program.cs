using CFTS.GraphIntelligence.Models;
using CFTS.GraphIntelligence.Services;
using Neo4j.Driver;

Console.Write("Neo4j URI: ");
string uri = Console.ReadLine()!;

Console.Write("Neo4j username: ");
string username = Console.ReadLine()!;

Console.Write("Neo4j password: ");
string password = ReadPassword();

Console.WriteLine("\nTesting connection...");

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

static string ReadPassword()
{
    string password = "";

    while (true)
    {
        ConsoleKeyInfo key = Console.ReadKey(intercept: true);

        if (key.Key == ConsoleKey.Enter)
            break;

        if (key.Key == ConsoleKey.Backspace)
        {
            if (password.Length > 0)
                password = password[..^1];

            continue;
        }

        if (!char.IsControl(key.KeyChar))
            password += key.KeyChar;
    }

    return password;
}
