import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  Calendar,
  Filter,
  DollarSign,
  PieChart,
  Users
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../App';

interface ReportData {
  totalExpenses: number;
  totalAmount: number;
  categoryBreakdown: { [key: string]: number };
  monthlyTrends: { month: string; amount: number }[];
  departmentSpending: { [key: string]: number };
  statusDistribution: { [key: string]: number };
}

export default function Reports() {
  const { profile } = useAuth();
  const [reportData, setReportData] = useState<ReportData>({
    totalExpenses: 0,
    totalAmount: 0,
    categoryBreakdown: {},
    monthlyTrends: [],
    departmentSpending: {},
    statusDistribution: {}
  });
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('current-month');

  useEffect(() => {
    fetchReportData();
  }, [dateRange]);

  const fetchReportData = async () => {
    try {
      // Calculate date range
      const now = new Date();
      let startDate = new Date();
      
      switch (dateRange) {
        case 'current-month':
          startDate = new Date(now.getFullYear(), now.getMonth(), 1);
          break;
        case 'last-3-months':
          startDate = new Date(now.getFullYear(), now.getMonth() - 3, 1);
          break;
        case 'current-year':
          startDate = new Date(now.getFullYear(), 0, 1);
          break;
        default:
          startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      }

      // Fetch expenses data
      const { data: expenses, error } = await supabase
        .from('expenses')
        .select(`
          *,
          profiles (
            department
          )
        `)
        .gte('created_at', startDate.toISOString())
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Process data
      const totalExpenses = expenses?.length || 0;
      const totalAmount = expenses?.reduce((sum, e) => sum + e.amount, 0) || 0;

      // Category breakdown
      const categoryBreakdown: { [key: string]: number } = {};
      expenses?.forEach(expense => {
        categoryBreakdown[expense.category] = (categoryBreakdown[expense.category] || 0) + expense.amount;
      });

      // Status distribution
      const statusDistribution: { [key: string]: number } = {};
      expenses?.forEach(expense => {
        statusDistribution[expense.status] = (statusDistribution[expense.status] || 0) + 1;
      });

      // Monthly trends (last 6 months)
      const monthlyTrends = [];
      for (let i = 5; i >= 0; i--) {
        const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const nextMonth = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
        
        const monthExpenses = expenses?.filter(e => {
          const expenseDate = new Date(e.created_at);
          return expenseDate >= monthDate && expenseDate < nextMonth;
        }) || [];
        
        const monthAmount = monthExpenses.reduce((sum, e) => sum + e.amount, 0);
        
        monthlyTrends.push({
          month: monthDate.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
          amount: monthAmount
        });
      }

      setReportData({
        totalExpenses,
        totalAmount,
        categoryBreakdown,
        monthlyTrends,
        departmentSpending: {}, // Simplified for demo
        statusDistribution
      });
    } catch (error) {
      console.error('Error fetching report data:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportReport = () => {
    // In a real app, this would generate and download a CSV/Excel file
    alert('Export functionality would be implemented here');
  };

  if (!profile || !['manager', 'finance', 'admin'].includes(profile.role)) {
    return (
      <div className="p-6 text-center">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-yellow-800 mb-2">Access Restricted</h2>
          <p className="text-yellow-700">You don't have permission to view reports.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow p-6">
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Expense Reports & Analytics</h1>
          <p className="text-gray-600">Comprehensive insights into organizational spending</p>
        </div>
        <div className="flex space-x-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="current-month">Current Month</option>
            <option value="last-3-months">Last 3 Months</option>
            <option value="current-year">Current Year</option>
          </select>
          <button
            onClick={exportReport}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="bg-blue-50 p-3 rounded-lg">
              <BarChart3 className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Expenses</p>
              <p className="text-2xl font-bold text-gray-900">{reportData.totalExpenses}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="bg-green-50 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Amount</p>
              <p className="text-2xl font-bold text-gray-900">
                ${reportData.totalAmount.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="bg-purple-50 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg. Expense</p>
              <p className="text-2xl font-bold text-gray-900">
                ${reportData.totalExpenses > 0 ? Math.round(reportData.totalAmount / reportData.totalExpenses) : 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="bg-orange-50 p-3 rounded-lg">
              <Users className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Approval</p>
              <p className="text-2xl font-bold text-gray-900">
                {reportData.statusDistribution.pending || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Trends */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Monthly Spending Trends</h2>
          <div className="space-y-4">
            {reportData.monthlyTrends.map((month, index) => {
              const maxAmount = Math.max(...reportData.monthlyTrends.map(m => m.amount));
              const width = maxAmount > 0 ? (month.amount / maxAmount) * 100 : 0;
              
              return (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-700 w-12">{month.month}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2 w-32">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${width}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    ${month.amount.toLocaleString()}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Expense Categories</h2>
          <div className="space-y-4">
            {Object.entries(reportData.categoryBreakdown)
              .sort(([,a], [,b]) => b - a)
              .slice(0, 6)
              .map(([category, amount]) => {
                const percentage = reportData.totalAmount > 0 ? (amount / reportData.totalAmount) * 100 : 0;
                
                return (
                  <div key={category} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                      <span className="text-sm text-gray-700">{category}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">
                        ${amount.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {percentage.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Status Distribution */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Expense Status</h2>
          <div className="space-y-4">
            {Object.entries(reportData.statusDistribution).map(([status, count]) => {
              const percentage = reportData.totalExpenses > 0 ? (count / reportData.totalExpenses) * 100 : 0;
              const colorClasses = {
                pending: 'bg-yellow-500',
                approved: 'bg-green-500',
                rejected: 'bg-red-500'
              };
              
              return (
                <div key={status} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${colorClasses[status as keyof typeof colorClasses] || 'bg-gray-500'}`}></div>
                    <span className="text-sm text-gray-700 capitalize">{status}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{count}</div>
                    <div className="text-xs text-gray-500">{percentage.toFixed(1)}%</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Policy Compliance */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Policy Compliance</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-green-800">Compliant Expenses</p>
                <p className="text-xs text-green-600">Within policy guidelines</p>
              </div>
              <span className="text-lg font-bold text-green-800">94%</span>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-yellow-800">Flagged for Review</p>
                <p className="text-xs text-yellow-600">Exceeds policy limits</p>
              </div>
              <span className="text-lg font-bold text-yellow-800">6%</span>
            </div>
            
            <div className="mt-4 p-4 border border-gray-200 rounded-lg">
              <p className="text-xs text-gray-600 mb-2">Common Policy Violations:</p>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>• Meal expenses over $100</li>
                <li>• Missing receipts</li>
                <li>• Late submissions ({'>'}30 days)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}