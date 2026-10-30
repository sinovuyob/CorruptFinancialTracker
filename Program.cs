using CorruptFinancialTracker.API.Data;
using CorruptFinancialTracker.API.Services;
using Microsoft.EntityFrameworkCore;
using CFTS.GraphIntelligence.Services;
using Neo4j.Driver;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IPersonService, PersonService>();
builder.Services.AddScoped<ICompanyService, CompanyService>();
builder.Services.AddScoped<ITransactionService, TransactionService>();
builder.Services.AddScoped<ICaseService, CaseService>();

builder.Services.AddSingleton<IDriver>(serviceProvider =>
{
    string credentialsPath =
        Environment.GetEnvironmentVariable("NEO4J_CREDENTIALS_FILE")
        ?? throw new InvalidOperationException(
            "Neo4j credentials file path is not configured.");

    string[] lines = File.ReadAllLines(credentialsPath);

    Dictionary<string, string> credentials = new();

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

    return GraphDatabase.Driver(
        uri,
        AuthTokens.Basic(username, password));
});

builder.Services.AddScoped<Neo4jGraphService>();
builder.Services.AddScoped<FinancialRiskService>();
builder.Services.AddScoped<Neo4jTransactionSyncService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();