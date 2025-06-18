import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BarChart3Icon,
  Users2Icon,
  BuildingIcon,
  CheckCircleIcon,
  CreditCardIcon,
  LogOutIcon,
  SearchIcon,
  BellIcon,
} from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts'

interface DashboardStats {
  leadsCount: number
  processedLeadsCount: number
  lendersCount: number
  registeredUserCount: number
  conversionRate: string
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(
    null,
  )
  useEffect(() => {
    fetchDashboardStats()
  }, [])
  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(
        'http://localhost:5001/api/v1/dashboard-stats',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard stats')
      }
      const data = await response.json()
      setDashboardStats(data)
    } catch (err) {
      setError('Failed to load dashboard statistics')
      console.error('Error fetching dashboard stats:', err)
    } finally {
      setIsLoading(false)
    }
  }
  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    navigate('/admin/login')
  }
  // Mock data for dashboard
  const dashboardData = {
    totalLeads: 156,
    qualifiedLeads: 98,
    convertedLeads: 42,
    totalLenders: 12,
    transactionsMade: 37,
    conversionRate: '26.9%',
  }
  // Mock data for charts
  const monthlyData = [
    {
      name: 'Jan',
      leads: 65,
      qualified: 40,
      converted: 25,
    },
    {
      name: 'Feb',
      leads: 75,
      qualified: 45,
      converted: 30,
    },
    {
      name: 'Mar',
      leads: 85,
      qualified: 55,
      converted: 35,
    },
    {
      name: 'Apr',
      leads: 95,
      qualified: 60,
      converted: 40,
    },
    {
      name: 'May',
      leads: 110,
      qualified: 70,
      converted: 45,
    },
    {
      name: 'Jun',
      leads: 120,
      qualified: 75,
      converted: 50,
    },
  ]
  const conversionData = [
    {
      name: 'AgriTech',
      value: 35,
    },
    {
      name: 'Manufacturing',
      value: 45,
    },
    {
      name: 'IT Services',
      value: 60,
    },
    {
      name: 'Healthcare',
      value: 30,
    },
    {
      name: 'Retail',
      value: 40,
    },
  ]
  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg">{error}</p>
          <button
            onClick={fetchDashboardStats}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Top header */}
      <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-white p-1 rounded">
                <img
                  src="https://uploadthingy.s3.us-west-1.amazonaws.com/9xvS7YZrdmvHdmYU6nz5GD/Frame_427321370.svg"
                  alt="Jai Kisan"
                  className="h-8 w-auto"
                />
              </div>
              <div className="h-6 w-px bg-gray-700" />
              <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                CredGrow
              </h1>
            </div>
            <div className="flex items-center gap-6">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search..."
                  className="w-64 px-4 py-2 pl-10 text-sm bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-200 placeholder-gray-400"
                />
                <SearchIcon className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
              <button className="relative p-2 text-gray-400 hover:text-gray-200 transition-colors">
                <BellIcon className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-gray-200 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-700 transition-all duration-200"
              >
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
          <h2 className="text-3xl font-bold text-white mb-2">
            Welcome back, <span className="text-blue-400">Admin</span>
          </h2>
          <p className="text-gray-400">
            Here's what's happening with your applications today.
          </p>
        </div>
        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {[
            {
              title: 'Total Leads',
              value: isLoading ? '-' : dashboardStats?.leadsCount || 0,
              change: '+12%',
              icon: <Users2Icon className="h-6 w-6 text-white" />,
              color: 'from-blue-500 to-blue-600',
            },
            {
              title: 'Processed Leads',
              value: isLoading ? '-' : dashboardStats?.processedLeadsCount || 0,
              change: '+8%',
              icon: <CheckCircleIcon className="h-6 w-6 text-white" />,
              color: 'from-green-500 to-green-600',
            },
            {
              title: 'Active Lenders',
              value: isLoading ? '-' : dashboardStats?.lendersCount || 0,
              change: '+2',
              icon: <BuildingIcon className="h-6 w-6 text-white" />,
              color: 'from-purple-500 to-purple-600',
            },
            {
              title: 'Registered Users',
              value: isLoading ? '-' : dashboardStats?.registeredUserCount || 0,
              change: '+5',
              icon: <Users2Icon className="h-6 w-6 text-white" />,
              color: 'from-yellow-500 to-yellow-600',
            },
            {
              title: 'Conversion Rate',
              value: isLoading ? '-' : dashboardStats?.conversionRate || '0%',
              change: '+2.5%',
              icon: <BarChart3Icon className="h-6 w-6 text-white" />,
              color: 'from-indigo-500 to-indigo-600',
            },
          ].map((stat, index) => (
            <div
              key={index}
              className={`group bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 p-6 border border-gray-700 hover:border-gray-600 relative overflow-hidden ${isLoading ? 'animate-pulse' : ''}`}
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-200" />
              <div className="flex items-center">
                <div
                  className={`flex-shrink-0 rounded-2xl p-3 bg-gradient-to-r ${stat.color} transform group-hover:scale-110 transition-transform duration-200`}
                >
                  {stat.icon}
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-400">
                    {stat.title}
                  </p>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-semibold text-white">
                      {stat.value}
                    </p>
                    <p className="ml-2 text-sm text-green-400">{stat.change}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Lead Conversion Trend */}
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-6">
              Lead Conversion Trend
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: '1px solid #374151',
                      borderRadius: '0.5rem',
                    }}
                    labelStyle={{
                      color: '#F3F4F6',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="leads"
                    stroke="#3B82F6"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="qualified"
                    stroke="#10B981"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="converted"
                    stroke="#6366F1"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          {/* Industry-wise Conversion */}
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-6">
              Industry-wise Conversion
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={conversionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: '1px solid #374151',
                      borderRadius: '0.5rem',
                    }}
                    labelStyle={{
                      color: '#F3F4F6',
                    }}
                  />
                  <Bar dataKey="value" fill="#6366F1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
export default AdminDashboard