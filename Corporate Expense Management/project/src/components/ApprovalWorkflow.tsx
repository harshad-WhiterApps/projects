import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  DollarSign, 
  Calendar,
  FileText,
  User,
  Filter,
  Eye
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../App';

interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  expense_date: string;
  merchant: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  receipt_url?: string;
  notes?: string;
  user_id: string;
  profiles: {
    full_name: string;
    employee_id: string;
  };
}

export default function ApprovalWorkflow() {
  const { profile } = useAuth();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('pending');
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchExpenses();
  }, [filter]);

  const fetchExpenses = async () => {
    try {
      let query = supabase
        .from('expenses')
        .select(`
          *,
          profiles (
            full_name,
            employee_id
          )
        `)
        .order('created_at', { ascending: false });

      if (filter === 'pending') {
        query = query.eq('status', 'pending');
      } else if (filter === 'approved') {
        query = query.eq('status', 'approved');
      } else if (filter === 'rejected') {
        query = query.eq('status', 'rejected');
      }

      const { data, error } = await query;

      if (error) throw error;
      setExpenses(data || []);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (expenseId: string, action: 'approved' | 'rejected', comment?: string) => {
    setActionLoading(expenseId);
    
    try {
      const { error } = await supabase
        .from('expenses')
        .update({ 
          status: action,
          approved_by: profile?.id,
          approved_at: new Date().toISOString(),
          approval_comment: comment
        })
        .eq('id', expenseId);

      if (error) throw error;

      // Refresh the list
      fetchExpenses();
      setSelectedExpense(null);
    } catch (error) {
      console.error(`Error ${action} expense:`, error);
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return CheckCircle;
      case 'rejected':
        return XCircle;
      default:
        return Clock;
    }
  };

  if (!profile || !['manager', 'finance', 'admin'].includes(profile.role)) {
    return (
      <div className="p-6 text-center">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-yellow-800 mb-2">Access Restricted</h2>
          <p className="text-yellow-700">You don't have permission to approve expenses.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Expense Approvals</h1>
        <p className="text-gray-600">Review and approve employee expense submissions</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex items-center space-x-4">
          <Filter className="h-5 w-5 text-gray-400" />
          <div className="flex space-x-2">
            {['all', 'pending', 'approved', 'rejected'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === status
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="h-12 w-12 bg-gray-200 rounded-lg"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {expenses.length === 0 ? (
            <div className="p-8 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No expenses found</h3>
              <p className="text-gray-500">No expenses match your current filter criteria.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {expenses.map((expense) => {
                const StatusIcon = getStatusIcon(expense.status);
                return (
                  <div key={expense.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="bg-blue-100 p-3 rounded-lg">
                          <DollarSign className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{expense.description}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                            <span className="flex items-center">
                              <User className="h-4 w-4 mr-1" />
                              {expense.profiles?.full_name}
                            </span>
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {new Date(expense.expense_date).toLocaleDateString()}
                            </span>
                            <span className="font-medium">{expense.category}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">
                            ${expense.amount.toLocaleString()}
                          </p>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(expense.status)}`}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {expense.status}
                          </span>
                        </div>
                        
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setSelectedExpense(expense)}
                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            title="View details"
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                          
                          {expense.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleAction(expense.id, 'approved')}
                                disabled={actionLoading === expense.id}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors text-sm"
                              >
                                {actionLoading === expense.id ? 'Processing...' : 'Approve'}
                              </button>
                              <button
                                onClick={() => handleAction(expense.id, 'rejected')}
                                disabled={actionLoading === expense.id}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors text-sm"
                              >
                                {actionLoading === expense.id ? 'Processing...' : 'Reject'}
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Expense Detail Modal */}
      {selectedExpense && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Expense Details</h3>
                <button
                  onClick={() => setSelectedExpense(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Employee:</span>
                  <span className="ml-2 text-gray-900">{selectedExpense.profiles?.full_name}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Amount:</span>
                  <span className="ml-2 text-gray-900">${selectedExpense.amount.toLocaleString()}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Category:</span>
                  <span className="ml-2 text-gray-900">{selectedExpense.category}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Merchant:</span>
                  <span className="ml-2 text-gray-900">{selectedExpense.merchant}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Date:</span>
                  <span className="ml-2 text-gray-900">
                    {new Date(selectedExpense.expense_date).toLocaleDateString()}
                  </span>
                </div>
                {selectedExpense.notes && (
                  <div>
                    <span className="font-medium text-gray-700">Notes:</span>
                    <p className="mt-1 text-gray-900">{selectedExpense.notes}</p>
                  </div>
                )}
              </div>

              {selectedExpense.status === 'pending' && (
                <div className="flex space-x-2 mt-6">
                  <button
                    onClick={() => handleAction(selectedExpense.id, 'approved')}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(selectedExpense.id, 'rejected')}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}