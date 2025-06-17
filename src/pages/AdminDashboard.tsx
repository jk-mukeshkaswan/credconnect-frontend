import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3Icon, Users2Icon, BuildingIcon, CheckCircleIcon, CreditCardIcon, LogOutIcon, SearchIcon, BellIcon, FilterIcon, XIcon } from 'lucide-react';
const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    dateRange: 'all',
    status: 'all',
    amountRange: 'all'
  });
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };
  // Mock data for dashboard
  const dashboardData = {
    totalLeads: 156,
    qualifiedLeads: 98,
    convertedLeads: 42,
    totalLenders: 12,
    transactionsMade: 37,
    conversionRate: '26.9%'
  };
  // Mock data for recent leads
  const recentLeads = [{
    id: 1,
    business: 'Tech Solutions Inc.',
    date: '2023-09-15',
    status: 'Qualified',
    amount: '₹25,00,000'
  }, {
    id: 2,
    business: 'Green Grocers Ltd',
    date: '2023-09-14',
    status: 'Converted',
    amount: '₹15,00,000'
  }, {
    id: 3,
    business: 'Fashion Forward',
    date: '2023-09-14',
    status: 'New',
    amount: '₹8,00,000'
  }, {
    id: 4,
    business: 'Cafe Delights',
    date: '2023-09-13',
    status: 'Qualified',
    amount: '₹12,00,000'
  }, {
    id: 5,
    business: 'Auto Repairs Plus',
    date: '2023-09-12',
    status: 'Converted',
    amount: '₹20,00,000'
  }];
  const filteredLeads = recentLeads.filter(lead => {
    let matchesDateRange = true;
    let matchesStatus = true;
    let matchesAmount = true;
    // Date filter
    if (filters.dateRange !== 'all') {
      const leadDate = new Date(lead.date);
      const today = new Date();
      switch (filters.dateRange) {
        case 'today':
          matchesDateRange = leadDate.toDateString() === today.toDateString();
          break;
        case 'week':
          const weekAgo = new Date(today.setDate(today.getDate() - 7));
          matchesDateRange = leadDate >= weekAgo;
          break;
        case 'month':
          const monthAgo = new Date(today.setMonth(today.getMonth() - 1));
          matchesDateRange = leadDate >= monthAgo;
          break;
      }
    }
    // Status filter
    if (filters.status !== 'all') {
      matchesStatus = lead.status === filters.status;
    }
    // Amount filter
    if (filters.amountRange !== 'all') {
      const amount = parseInt(lead.amount.replace(/[^0-9]/g, ''));
      switch (filters.amountRange) {
        case 'low':
          matchesAmount = amount < 1000000; // Less than 10L
          break;
        case 'medium':
          matchesAmount = amount >= 1000000 && amount < 5000000; // 10L to 50L
          break;
        case 'high':
          matchesAmount = amount >= 5000000; // More than 50L
          break;
      }
    }
    return matchesDateRange && matchesStatus && matchesAmount;
  });
  const clearFilters = () => {
    setFilters({
      dateRange: 'all',
      status: 'all',
      amountRange: 'all'
    });
  };
  return <div className="min-h-screen bg-gradient-to-br from-[#f8faf9] via-white to-[#f0f4f2]">
      {/* Top header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-white/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <img src="/Frame_427321370.svg" alt="Jai Kisan" className="h-8 w-auto" />
              <div className="h-6 w-px bg-gray-200" />
              <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Business Loan Dashboard
              </h1>
            </div>
            <div className="flex items-center gap-6">
              <div className="relative">
                <input type="search" placeholder="Search..." className="w-64 px-4 py-2 pl-10 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all" />
                <SearchIcon className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
              <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <BellIcon className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              <button onClick={handleLogout} className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-white hover:bg-[#1B332C] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1B332C] transition-all duration-200">
                <LogOutIcon className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, <span className="text-blue-600">Admin</span>
          </h2>
          <p className="text-gray-600">
            Here's what's happening with your applications today.
          </p>
        </div>
        {/* Filter Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <button onClick={() => setShowFilters(!showFilters)} className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                <FilterIcon className="h-4 w-4 mr-2" />
                Filters
              </button>
              {(filters.dateRange !== 'all' || filters.status !== 'all' || filters.amountRange !== 'all') && <button onClick={clearFilters} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-gray-600 hover:text-red-600 focus:outline-none transition-colors">
                  <XIcon className="h-3 w-3 mr-1" />
                  Clear filters
                </button>}
            </div>
          </div>
          {showFilters && <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date Range
                </label>
                <select value={filters.dateRange} onChange={e => setFilters({
              ...filters,
              dateRange: e.target.value
            })} className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="all">All time</option>
                  <option value="today">Today</option>
                  <option value="week">Last 7 days</option>
                  <option value="month">Last 30 days</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select value={filters.status} onChange={e => setFilters({
              ...filters,
              status: e.target.value
            })} className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="all">All status</option>
                  <option value="New">New</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Converted">Converted</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount Range
                </label>
                <select value={filters.amountRange} onChange={e => setFilters({
              ...filters,
              amountRange: e.target.value
            })} className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="all">All amounts</option>
                  <option value="low">Less than ₹10L</option>
                  <option value="medium">₹10L - ₹50L</option>
                  <option value="high">More than ₹50L</option>
                </select>
              </div>
            </div>}
          {/* Stats grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[{
            title: 'Total Leads',
            value: dashboardData.totalLeads,
            change: '+12%',
            icon: <Users2Icon className="h-6 w-6 text-white" />,
            color: 'from-[#1B332C] to-[#234339]'
          }, {
            title: 'Qualified Leads',
            value: dashboardData.qualifiedLeads,
            change: '+8%',
            icon: <CheckCircleIcon className="h-6 w-6 text-white" />,
            color: 'from-[#2A4F44] to-[#1B332C]'
          }, {
            title: 'Active Lenders',
            value: dashboardData.totalLenders,
            change: '+2',
            icon: <BuildingIcon className="h-6 w-6 text-white" />,
            color: 'from-purple-500 to-purple-600'
          }, {
            title: 'Transactions',
            value: dashboardData.transactionsMade,
            change: '+5',
            icon: <CreditCardIcon className="h-6 w-6 text-white" />,
            color: 'from-yellow-500 to-yellow-600'
          }, {
            title: 'Conversion Rate',
            value: dashboardData.conversionRate,
            change: '+2.5%',
            icon: <BarChart3Icon className="h-6 w-6 text-white" />,
            color: 'from-indigo-500 to-indigo-600'
          }, {
            title: 'Converted Leads',
            value: dashboardData.convertedLeads,
            change: '+15%',
            icon: <Users2Icon className="h-6 w-6 text-white" />,
            color: 'from-red-500 to-red-600'
          }].map((stat, index) => <div key={index} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-200 p-6 border border-gray-100 hover:border-transparent relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-5 transition-opacity duration-200" />
                <div className="flex items-center">
                  <div className={`flex-shrink-0 rounded-2xl p-3 bg-gradient-to-r ${stat.color} transform group-hover:scale-110 transition-transform duration-200`}>
                    {stat.icon}
                  </div>
                  <div className="ml-5">
                    <p className="text-sm font-medium text-gray-500">
                      {stat.title}
                    </p>
                    <div className="flex items-baseline">
                      <p className="text-2xl font-semibold text-gray-900">
                        {stat.value}
                      </p>
                      <p className="ml-2 text-sm text-green-500">
                        {stat.change}
                      </p>
                    </div>
                  </div>
                </div>
              </div>)}
          </div>
          {/* Recent leads table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-200">
            <div className="px-6 py-5 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-[#1B332C]">
                  Recent Applications
                </h3>
                <div className="text-sm text-gray-500">
                  Showing {filteredLeads.length} results
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Business
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredLeads.map(lead => <tr key={lead.id} className="hover:bg-gray-50 transition-colors cursor-pointer group">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        #{lead.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                          {lead.business}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                        {lead.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {lead.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${lead.status === 'Qualified' ? 'bg-blue-100 text-blue-800' : lead.status === 'Converted' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {lead.status}
                        </span>
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>;
};
export default AdminDashboard;