using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace CFTS.GraphIntelligence.Models
{
    public class FinancialPath
    {
        public string StartingCompany { get; set; } = "";

        public string EndingCompany { get; set; } = "";

        public List<string> Path { get; set; } = new List<string>();
    }
}
