# CFTS Intelligence
### Corrupt Financial Tracking System

**Developed by TraceGuard Technologies**

*Connecting the dots. Following the money.*

## 1. Project Overview

CFTS Intelligence is a financial intelligence web application designed to identify potentially suspicious financial activities by analysing transactions, relationships between entities, and financial movement patterns.

The system aims to help investigators and analysts understand complex financial networks through graph-based analysis, automated risk scoring, and visual representations of financial relationships.

Rather than relying only on individual transaction records, CFTS Intelligence examines how people, companies, and transactions are connected.

**Important:** The system identifies indicators for further investigation. A suspicious transaction or high risk score does not prove corruption or criminal activity.

## 2. Project Objectives

The main objectives of CFTS Intelligence are to:

- Identify repeated and unusually rapid financial transactions.
- Analyse financial relationships between companies and individuals.
- Detect potentially suspicious transaction patterns.
- Calculate explainable financial risk scores.
- Support financial investigations through graph-based analysis.
- Present financial intelligence results through an accessible web interface.

## 3. Technology Stack

| Technology | Purpose |
|---|---|
| C# | Backend and financial intelligence logic |
| .NET 8 | Application development framework |
| ASP.NET Core Web API | Planned REST API integration |
| Neo4j AuraDB | Graph database and relationship analysis |
| Cypher | Querying graph data and detecting transaction patterns |
| SQL Server | Planned relational data storage |
| HTML, CSS, JavaScript | Frontend development |
| Visual Studio 2022 | C# development environment |
| Git and GitHub | Version control and team collaboration |

## 4. System Architecture

CFTS Intelligence is being developed using a modular architecture.

The planned system consists of three main components:

**Frontend:** Provides an interface for users to view financial information, transaction histories, risk assessments, and financial relationships.

**Backend API:** Manages application requests, business logic, relational data, and communication between the frontend and financial intelligence services.

**Graph Intelligence Module:** Uses Neo4j to analyse relationships, retrieve financial transactions, detect suspicious patterns, and calculate explainable risk scores.

The graph intelligence module currently operates as a standalone C# console application while integration with the ASP.NET Core API is being prepared.

## 5. Key Features

### 5.1 Financial Relationship Analysis

Neo4j represents financial information using nodes and relationships.

The current graph model includes:

- `Person` — Represents an individual.
- `Company` — Represents a business entity.
- `Transaction` — Represents a financial transfer.
- `DIRECTOR_OF` — Connects a person to a company.
- `SENT` — Connects a sending company to a transaction.
- `RECEIVED_BY` — Connects a transaction to its receiving company.

This model enables the system to examine relationships between entities and trace transaction paths.

### 5.2 Transaction Analysis

The system retrieves transaction details, including:

- Transaction ID
- Sending company
- Receiving company
- Transaction amount

Transaction records are analysed to identify financial activity between connected entities.

### 5.3 Suspicious Transaction Detection

The current implementation uses three configurable-in-code demonstration rules:

| Risk indicator | Detection rule | Score |
|---|---|---:|
| Repeated transactions | Three or more transfers between the same companies | +25 |
| Rapid transfers | Three or more transfers within 30 minutes | +35 |
| High total amount | Total transfers of R100,000 or more | +20 |

### 5.4 Financial Risk Scoring

Each sending and receiving company pair is assigned a risk score based on the indicators detected.

| Risk score | Risk classification |
|---|---|
| 0–24 | LOW |
| 25–59 | MEDIUM |
| 60 or above | HIGH |

The current rules produce a maximum score of 80 out of a possible display scale of 100.

Risk classifications are demonstration indicators intended to support further review. They are not validated probabilities of financial misconduct.

### 5.5 Explainable Risk Assessments

Each assessment includes:

- Sending and receiving company
- Number of transactions
- Total transaction amount
- Calculated risk score
- Risk classification
- Reasons for the assigned score

This approach helps users understand why a transaction group was flagged.

## 6. Project Structure

The current Graph Intelligence module follows this structure:

```text
CFTS.GraphIntelligence/
│
├── Models/
│   └── RiskAssessment.cs
│
├── Services/
│   ├── Neo4jGraphService.cs
│   └── FinancialRiskService.cs
│
├── Program.cs
└── CFTS.GraphIntelligence.csproj
```

**Program.cs:** Establishes the Neo4j connection and runs the application.

**RiskAssessment.cs:** Defines the structure of financial risk assessment results.

**Neo4jGraphService.cs:** Retrieves companies and financial transactions from Neo4j.

**FinancialRiskService.cs:** Analyses transaction patterns and calculates financial risk scores.

## 7. Getting Started

### Prerequisites

Before running the Graph Intelligence module, ensure you have:

- Visual Studio 2022 or another compatible .NET development environment
- .NET 8 SDK
- Access to a Neo4j AuraDB database
- The `Neo4j.Driver` NuGet package
- A local Neo4j credentials file

### Clone the repository

```bash
git clone <repository-url>
```

Replace `<repository-url>` with the team's GitHub repository URL.

### Open the project

Navigate to the `CFTS.GraphIntelligence` project and open its `.csproj` file in Visual Studio.

Restore the NuGet packages and build the project.

### Configure Neo4j credentials

The application reads credentials from a locally stored file.

Set the following Windows user environment variable:

```text
NEO4J_CREDENTIALS_FILE
```

Its value must be the absolute path to your Neo4j credentials file, without surrounding quotation marks.

The file must contain:

```dotenv
NEO4J_URI=your-neo4j-uri
NEO4J_USERNAME=your-neo4j-username
NEO4J_PASSWORD=your-neo4j-password
```

Use the actual credentials supplied by Neo4j AuraDB.

**Security requirements:**

- Never commit database passwords or downloaded credentials files.
- Keep credentials outside the repository.
- Ensure `.env` files and build output are excluded through `.gitignore`.
- Use only fictional test data until production security controls are established.

### Run the application

Build and run the Graph Intelligence project using Visual Studio.

When correctly configured, the application connects to Neo4j and displays company information, transactions, and financial risk assessments.

## 8. Testing and Validation

The Graph Intelligence module has been tested using fictional companies and transactions.

The test scenarios include:

| Test scenario | Expected score | Classification |
|---|---:|---|
| Repeated, rapid, high-total transfers | 80 | HIGH |
| Repeated transactions spaced hours apart | 25 | MEDIUM |
| Single transaction of R70,000 | 0 | LOW |
| Single transaction of R250,000 | 20 | LOW |

These scenarios demonstrate that the scoring logic responds differently depending on which risk indicators are present.

## 9. Team Responsibilities

| Team member | Responsibility |
|---|---|
| Person 1 | ASP.NET Core Web API, SQL Server, CRUD operations and backend integration |
| Person 2 | Neo4j graph modelling, financial transaction analysis, suspicious-pattern detection and risk scoring |
| Person 3 | Frontend interface, visual presentation and user interactions |

Development is coordinated through GitHub using separate feature branches.

## 10. Git Branching Strategy

| Branch | Purpose |
|---|---|
| `main` | Main project branch |
| `backend` | Shared backend development branch |
| `feature/api-sql` | ASP.NET Core API and SQL Server development |
| `feature/graph-risk` | Neo4j graph intelligence and financial risk analysis |

Team members should develop and test changes on their assigned branches before merging them into shared branches.

## 11. Current Development Status

**Completed in the Graph Intelligence module:**

- Neo4j AuraDB database setup
- Graph entities and relationships
- Cypher transaction queries
- C# Neo4j connectivity
- Company and transaction retrieval services
- Repeated and rapid transaction detection
- Explainable risk-scoring service
- HIGH, MEDIUM and LOW risk scenario testing
- Local credentials-file loading
- GitHub version control

**Planned or pending:**

- Integration with the ASP.NET Core Web API
- SQL Server and graph intelligence integration
- Frontend integration
- Financial relationship visualisation
- Additional validation and automated testing
- Authentication, authorisation and production security improvements
- Further refinement of risk rules and thresholds

## 12. Future Improvements

Potential enhancements include:

- Multi-company transaction chain analysis
- Graph-based relationship visualisation
- More advanced anomaly detection
- Investigation dashboards
- Search and filtering of financial entities
- Historical transaction analysis
- Audit logging and role-based access control
- Risk-scoring rules supported by validated financial investigation requirements

## 13. Disclaimer

CFTS Intelligence is currently an educational software development project.

All demonstration transactions and company records are fictional.

The risk detection system identifies patterns that may warrant investigation. Its results must not be interpreted as definitive evidence of corruption, fraud or other illegal conduct.

---

**TraceGuard Technologies**

*Connecting the dots. Following the money.*
