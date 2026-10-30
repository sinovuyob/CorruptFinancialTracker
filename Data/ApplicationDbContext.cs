using CorruptFinancialTracker.API.Models;
using Microsoft.EntityFrameworkCore;

namespace CorruptFinancialTracker.API.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(
        DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Person> People => Set<Person>();
    public DbSet<Company> Companies => Set<Company>();
    public DbSet<Transaction> Transactions => Set<Transaction>();
    public DbSet<Property> Properties => Set<Property>();
    public DbSet<Wallet> Wallets => Set<Wallet>();
    public DbSet<InvestigationCase> InvestigationCases
        => Set<InvestigationCase>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Transaction>()
            .HasOne(t => t.Person)
            .WithMany(p => p.Transactions)
            .HasForeignKey(t => t.PersonId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<Transaction>()
            .HasOne(t => t.Company)
            .WithMany(c => c.Transactions)
            .HasForeignKey(t => t.CompanyId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<Transaction>()
            .HasOne(t => t.SenderCompany)
            .WithMany()
            .HasForeignKey(t => t.SenderCompanyId)
            .OnDelete(DeleteBehavior.NoAction);

        modelBuilder.Entity<Transaction>()
            .HasOne(t => t.ReceiverCompany)
            .WithMany()
            .HasForeignKey(t => t.ReceiverCompanyId)
            .OnDelete(DeleteBehavior.NoAction);

        modelBuilder.Entity<Property>()
            .HasOne(p => p.Person)
            .WithMany()
            .HasForeignKey(p => p.PersonId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<Property>()
            .HasOne(p => p.Company)
            .WithMany()
            .HasForeignKey(p => p.CompanyId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<Wallet>()
            .HasOne(w => w.Person)
            .WithMany()
            .HasForeignKey(w => w.PersonId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<Transaction>()
            .ToTable(t => t.HasCheckConstraint(
                "CK_Transaction_Amount",
                "[Amount] >= 0"));

        modelBuilder.Entity<Property>()
            .ToTable(t => t.HasCheckConstraint(
                "CK_Property_EstimatedValue",
                "[EstimatedValue] >= 0"));
    }
}