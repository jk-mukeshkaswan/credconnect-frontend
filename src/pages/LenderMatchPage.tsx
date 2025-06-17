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
const mockLenders: Lender[] = [{
  id: '1',
  name: 'Business Capital Bank',
  interestRate: '9.5% - 12%',
  maxLoanAmount: '₹50,00,000',
  processingTime: '3-5 days',
  eligibility: 'High'
}, {
  id: '2',
  name: 'Enterprise Finance Ltd',
  interestRate: '10% - 14%',
  maxLoanAmount: '₹75,00,000',
  processingTime: '2-3 days',
  eligibility: 'Medium'
}, {
  id: '3',
  name: 'Growth Fund Partners',
  interestRate: '8.75% - 11.5%',
  maxLoanAmount: '₹1,00,00,000',
  processingTime: '5-7 days',
  eligibility: 'Medium'
}, {
  id: '4',
  name: 'Startup Boost Credit',
  interestRate: '11% - 15%',
  maxLoanAmount: '₹25,00,000',
  processingTime: '1-2 days',
  eligibility: 'High'
}];
const LenderMatchPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const businessData = location.state?.businessData || {};
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    interestRate: 'all',
    loanAmount: 'all',
    processingTime: 'all',
    eligibility: 'all'
  });
  const filteredLenders = mockLenders.filter(lender => {
    let matchesInterestRate = true;
    let matchesLoanAmount = true;
    let matchesProcessingTime = true;
    let matchesEligibility = true;
    // Interest rate filter
    if (filters.interestRate !== 'all') {
      const rate = parseFloat(lender.interestRate.split('-')[0].replace('%', ''));
      switch (filters.interestRate) {
        case 'low':
          matchesInterestRate = rate < 10;
          break;
        case 'medium':
          matchesInterestRate = rate >= 10 && rate < 12;
          break;
        case 'high':
          matchesInterestRate = rate >= 12;
          break;
      }
    }
    // Loan amount filter
    if (filters.loanAmount !== 'all') {
      const amount = parseInt(lender.maxLoanAmount.replace(/[^0-9]/g, ''));
      switch (filters.loanAmount) {
        case 'low':
          matchesLoanAmount = amount < 2500000; // Less than 25L
          break;
        case 'medium':
          matchesLoanAmount = amount >= 2500000 && amount < 7500000; // 25L to 75L
          break;
        case 'high':
          matchesLoanAmount = amount >= 7500000; // More than 75L
          break;
      }
    }
    // Processing time filter
    if (filters.processingTime !== 'all') {
      const days = parseInt(lender.processingTime.split('-')[0]);
      switch (filters.processingTime) {
        case 'fast':
          matchesProcessingTime = days <= 2;
          break;
        case 'medium':
          matchesProcessingTime = days > 2 && days <= 5;
          break;
        case 'slow':
          matchesProcessingTime = days > 5;
          break;
      }
    }
    // Eligibility filter
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
  return <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <img src="/Frame_427321370.svg" alt="Jai Kisan" className="h-8 w-auto" />
            <button onClick={() => navigate('/')} className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to application
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Matched Lenders
            </h1>
            <div className="flex items-center gap-2">
              <button onClick={() => setShowFilters(!showFilters)} className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                <FilterIcon className="h-4 w-4 mr-2" />
                Filters
              </button>
              {(filters.interestRate !== 'all' || filters.loanAmount !== 'all' || filters.processingTime !== 'all' || filters.eligibility !== 'all') && <button onClick={clearFilters} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-gray-600 hover:text-red-600 focus:outline-none transition-colors">
                  <XIcon className="h-3 w-3 mr-1" />
                  Clear filters
                </button>}
            </div>
          </div>
          {showFilters && <div className="bg-gray-50 p-4 rounded-lg mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Interest Rate
                </label>
                <select value={filters.interestRate} onChange={e => setFilters({
              ...filters,
              interestRate: e.target.value
            })} className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="all">All rates</option>
                  <option value="low">Below 10%</option>
                  <option value="medium">10% - 12%</option>
                  <option value="high">Above 12%</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Loan Amount
                </label>
                <select value={filters.loanAmount} onChange={e => setFilters({
              ...filters,
              loanAmount: e.target.value
            })} className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="all">All amounts</option>
                  <option value="low">Up to ₹25L</option>
                  <option value="medium">₹25L - ₹75L</option>
                  <option value="high">Above ₹75L</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Processing Time
                </label>
                <select value={filters.processingTime} onChange={e => setFilters({
              ...filters,
              processingTime: e.target.value
            })} className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="all">All durations</option>
                  <option value="fast">1-2 days</option>
                  <option value="medium">3-5 days</option>
                  <option value="slow">5+ days</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Eligibility
                </label>
                <select value={filters.eligibility} onChange={e => setFilters({
              ...filters,
              eligibility: e.target.value
            })} className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="all">All eligibility</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lender
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Interest Rate
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Max Loan Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Processing Time
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Eligibility
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLenders.map(lender => <tr key={lender.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">
                        {lender.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {lender.interestRate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {lender.maxLoanAmount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {lender.processingTime}
                    </td>
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
                  </tr>)}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-[#e5ebe9] border border-[#1B332C]/20 rounded-lg p-4 text-[#1B332C]">
          <p className="text-sm">
            <strong>Note:</strong> These lenders have been matched based on your
            business profile. Actual loan approval and terms may vary based on
            additional factors during the application process.
          </p>
        </div>
      </div>
    </div>;
};
export default LenderMatchPage;