using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CFTS.GraphIntelligence.Models
{
    public class RiskAssessment
    {
        public string Sender { get; set; } = "";
        public string Receiver { get; set; } = "";
        public long TransactionCount { get; set; }
        public long TotalAmount { get; set; }
        public int RiskScore { get; set; }
        public string RiskLevel { get; set; } = "";
        public List<string> Reasons { get; set; } = new List<string>();
    }
}