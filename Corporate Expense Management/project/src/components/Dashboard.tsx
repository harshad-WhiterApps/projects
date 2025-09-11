import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  Clock, 
  CheckCircle, 
  XCircle, 
  TrendingUp, 
  Calendar,
  FileText,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../App';

interface DashboardStats {
  totalExpenses: number;
  pendingAmount: number;
  approvedAmount: number;
  rejectedCount: number;
  monthlySpend: number;
  recentExpenses: any[];
}

export default function Dashboard() {
  const { profile } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalExpenses: 0,
    pendingAmount: 0,
    approvedAmount: 0,
    rejectedCount: 0,
    monthlySpend: 0,
    recentExpenses: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch expenses for the current user
      const { data: expenses, error } = await supabase
        .from('expenses')
        .select('*')
        .eq('user_id', profile?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Calculate stats
      const totalExpenses = expenses?.length || 0;
      const pendingAmount = expenses?.filter(e => e.status === 'pending').reduce((sum, e) => sum + e.amount, 0) || 0;
      const approvedAmount = expenses?.filter(e => e.status === 'approved').reduce((sum, e) => sum + e.amount, 0) || 0;
      const rejectedCount = expenses?.filter(e => e.status === 'rejected').length || 0;
      
      // Monthly spend (current month)
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      const monthlySpend = expenses?.filter(e => {
        const expenseDate = new Date(e.created_at);
        return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
      }).reduce((sum, e) => sum + e.amount, 0) || 0;

      setStats({
        totalExpenses,
        pendingAmount,
        approvedAmount,
        rejectedCount,
        monthlySpend,
        recentExpenses: expenses?.slice(0, 5) || []
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Expenses',
      value: stats.totalExpenses,
      icon: FileText,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      title: 'Pending Amount',
      value: `$${stats.pendingAmount.toLocaleString()}`,
      icon: Clock,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-700'
    },
    {
      title: 'Approved Amount',
      value: `$${stats.approvedAmount.toLocaleString()}`,
      icon: CheckCircle,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      title: 'Rejected Claims',
      value: stats.rejectedCount,
      icon: XCircle,
      color: 'bg-red-500',
      bgColor: 'bg-red-50',
      textColor: 'text-red-700'
    }
  ];

  if (loading) {
    return (
      <div className="p-6 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow p-6">
              <div className="h-4 bg-gray-200 rounded mb-4"></div>
              <div className="h-8 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Welcome header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {profile?.full_name || 'User'}!
        </h1>
        <p className="text-gray-600">
          Here's an overview of your expense activity
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className={`${card.bgColor} p-3 rounded-lg`}>
                <card.icon className={`h-6 w-6 ${card.color.replace('bg-', 'text-')}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                <p className={`text-2xl font-bold ${card.textColor}`}>{card.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent expenses */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Expenses</h2>
            </div>
            <div className="p-6">
              {stats.recentExpenses.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No expenses submitted yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {stats.recentExpenses.map((expense, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <DollarSign className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{expense.description}</p>
                          <p className="text-xs text-gray-500">{expense.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">${expense.amount}</p>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          expense.status === 'approved' ? 'bg-green-100 text-green-800' :
                          expense.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {expense.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                Submit New Expense
              </button>
              <button className="w-full bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                View All Expenses
              </button>
              <button className="w-full bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                Download Report
              </button>
            </div>
          </div>

          {/* Monthly summary */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">This Month</h2>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Spend</span>
                <span className="text-sm font-medium">${stats.monthlySpend.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Budget Used</span>
                <span className="text-sm font-medium">68%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>
          </div>

          {/* Policy alerts */}
          <div className="bg-amber-50 rounded-xl border border-amber-200 p-6">
            <div className="flex items-center mb-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 mr-2" />
              <h2 className="text-lg font-semibold text-amber-900">Policy Reminder</h2>
            </div>
            <p className="text-sm text-amber-800">
              Remember to submit receipts within 30 days of the expense date to ensure quick processing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}