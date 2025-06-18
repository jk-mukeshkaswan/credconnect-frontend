import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, ExternalLinkIcon, FilterIcon, XIcon } from 'lucide-react';

interface Lender {
  id: string;
  name: string;
  interestRate: string;
  maxLoanAmount: string;
  processingTime: string;
  eligibility: string;
}

const LenderMatchPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const businessData = location.state?.businessData || {};
  const matchedLenders = location.state?.matchedLenders || [];

  if (!matchedLenders.length) {
    navigate('/');
    return null;
  }

  const [lenders, setLenders] = useState<Lender[]>(matchedLenders);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    interestRate: 'all',
    loanAmount: 'all',
    processingTime: 'all',
    eligibility: 'all'
  });

  const filteredLenders = lenders.filter(lender => {
    let matchesInterestRate = true;
    let matchesLoanAmount = true;
    let matchesProcessingTime = true;
    let matchesEligibility = true;

    if (filters.interestRate !== 'all') {
      const rate = parseFloat(lender.interestRate.split('-')[0].replace('%', ''));
      switch (filters.interestRate) {
        case 'low': matchesInterestRate = rate < 10; break;
        case 'medium': matchesInterestRate = rate >= 10 && rate < 12; break;
        case 'high': matchesInterestRate = rate >= 12; break;
      }
    }

    if (filters.loanAmount !== 'all') {
      const amount = parseInt(lender.maxLoanAmount.replace(/[^0-9]/g, ''));
      switch (filters.loanAmount) {
        case 'low': matchesLoanAmount = amount < 2500000; break;
        case 'medium': matchesLoanAmount = amount >= 2500000 && amount < 7500000; break;
        case 'high': matchesLoanAmount = amount >= 7500000; break;
      }
    }

    if (filters.processingTime !== 'all') {
      const days = parseInt(lender.processingTime.split('-')[0]);
      switch (filters.processingTime) {
        case 'fast': matchesProcessingTime = days <= 2; break;
        case 'medium': matchesProcessingTime = days > 2 && days <= 5; break;
        case 'slow': matchesProcessingTime = days > 5; break;
      }
    }

    if (filters.eligibility !== 'all') {
      matchesEligibility = lender.eligibility.toLowerCase() === filters.eligibility.toLowerCase();
    }

    return matchesInterestRate && matchesLoanAmount && matchesProcessingTime && matchesEligibility;
  });

  const clearFilters = () => {
    setFilters({
      interestRate: 'all',
      loanAmount: 'all',
      processingTime: 'all',
      eligibility: 'all'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <img src="/Frame_427321370.svg" alt="Jai Kisan" className="h-8 w-auto" />
            <button onClick={() => navigate('/onboarding')} className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
              <ArrowLeftIcon className="h-4 w-4 mr-2" /> Back to application
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Matched Lenders</h1>
            <div className="flex items-center gap-2">
              <button onClick={() => setShowFilters(!showFilters)} className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                <FilterIcon className="h-4 w-4 mr-2" /> Filters
              </button>
              {(Object.values(filters).some(value => value !== 'all')) && (
                <button onClick={clearFilters} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-gray-600 hover:text-red-600 focus:outline-none transition-colors">
                  <XIcon className="h-3 w-3 mr-1" /> Clear filters
                </button>
              )}
            </div>
          </div>

          {showFilters && (
            <div className="bg-gray-50 p-4 rounded-lg mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Filter Selects */}
              {[['Interest Rate', 'interestRate', ['all', 'low', 'medium', 'high']],
                ['Max Loan Amount', 'loanAmount', ['all', 'low', 'medium', 'high']],
                ['Processing Time', 'processingTime', ['all', 'fast', 'medium', 'slow']],
                ['Eligibility', 'eligibility', ['all', 'high', 'medium', 'low']]].map(([label, key, options]) => (
                  <div key={key as string}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                    <select
                      value={filters[key as keyof typeof filters]}
                      onChange={e => setFilters(prev => ({ ...prev, [key as string]: e.target.value }))}
                      className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {(options as string[]).map(option => (
                        <option key={option} value={option}>{option === 'all' ? `All ${label}` : option}</option>
                      ))}
                    </select>
                  </div>
              ))}
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {['Lender', 'Interest Rate', 'Max Loan Amount', 'Processing Time', 'Eligibility', 'Action'].map((heading, i) => (
                    <th key={i} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLenders.map(lender => (
                  <tr key={lender.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{lender.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lender.interestRate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lender.maxLoanAmount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lender.processingTime}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${lender.eligibility === 'High' ? 'bg-green-100 text-green-800' : lender.eligibility === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                        {lender.eligibility}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="text-blue-600 hover:text-blue-900 flex items-center">
                        Apply <ExternalLinkIcon className="ml-1 h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-[#e5ebe9] border border-[#1B332C]/20 rounded-lg p-4 text-[#1B332C]">
          <p className="text-sm">
            <strong>Note:</strong> These lenders have been matched based on your business profile. Actual loan approval and terms may vary based on additional factors during the application process.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LenderMatchPage;
