import React, { useState } from 'react';
import { Upload, Camera, DollarSign, Calendar, FileText, Tag, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../App';

export default function ExpenseSubmission() {
  const { profile } = useAuth();
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: '',
    date: '',
    merchant: '',
    project: '',
    notes: ''
  });
  const [receipt, setReceipt] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = [
    'Travel',
    'Meals & Entertainment',
    'Office Supplies',
    'Software & Subscriptions',
    'Marketing',
    'Training & Development',
    'Equipment',
    'Utilities',
    'Other'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReceipt(file);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Valid amount is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    if (!formData.merchant.trim()) {
      newErrors.merchant = 'Merchant/vendor is required';
    }

    // Policy validation
    const amount = parseFloat(formData.amount);
    if (formData.category === 'Meals & Entertainment' && amount > 100) {
      newErrors.amount = 'Meals & Entertainment expenses over $100 require manager approval';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Upload receipt if provided
      let receiptUrl = '';
      if (receipt) {
        const fileExt = receipt.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('receipts')
          .upload(fileName, receipt);

        if (uploadError) throw uploadError;
        
        receiptUrl = uploadData.path;
      }

      // Insert expense record
      const { error } = await supabase
        .from('expenses')
        .insert([
          {
            user_id: profile?.id,
            description: formData.description,
            amount: parseFloat(formData.amount),
            category: formData.category,
            expense_date: formData.date,
            merchant: formData.merchant,
            project: formData.project || null,
            notes: formData.notes || null,
            receipt_url: receiptUrl,
            status: 'pending'
          }
        ]);

      if (error) throw error;

      setSuccess(true);
      setFormData({
        description: '',
        amount: '',
        category: '',
        date: '',
        merchant: '',
        project: '',
        notes: ''
      });
      setReceipt(null);

      // Reset success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);

    } catch (error) {
      console.error('Error submitting expense:', error);
      setErrors({ submit: 'Failed to submit expense. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Submit New Expense</h1>
        <p className="text-gray-600">Fill out the form below to submit your expense for approval</p>
      </div>

      {success && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span>Expense submitted successfully! It will be routed to your manager for approval.</span>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Expense Details */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Expense Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FileText className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.description ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter expense description"
                  />
                </div>
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    step="0.01"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.amount ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="0.00"
                  />
                </div>
                {errors.amount && (
                  <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Tag className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.category ? 'border-red-300' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expense Date *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.date ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.date && (
                  <p className="mt-1 text-sm text-red-600">{errors.date}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Merchant/Vendor *
                </label>
                <input
                  type="text"
                  name="merchant"
                  value={formData.merchant}
                  onChange={handleInputChange}
                  className={`block w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.merchant ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter merchant or vendor name"
                />
                {errors.merchant && (
                  <p className="mt-1 text-sm text-red-600">{errors.merchant}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project (Optional)
                </label>
                <input
                  type="text"
                  name="project"
                  value={formData.project}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter project name or code"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes
              </label>
              <textarea
                name="notes"
                rows={3}
                value={formData.notes}
                onChange={handleInputChange}
                className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Any additional information about this expense..."
              />
            </div>
          </div>

          {/* Receipt Upload */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Receipt Upload</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileChange}
                className="hidden"
                id="receipt-upload"
              />
              <label htmlFor="receipt-upload" className="cursor-pointer">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <div className="text-sm text-gray-600 mb-2">
                  <span className="font-medium text-blue-600 hover:text-blue-500">
                    Click to upload
                  </span> or drag and drop
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF or PDF up to 10MB</p>
                {receipt && (
                  <p className="mt-2 text-sm text-green-600 font-medium">
                    {receipt.name} selected
                  </p>
                )}
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-6 border-t border-gray-200">
            <button
              type="button"
              className="mr-4 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting...
                </div>
              ) : (
                'Submit Expense'
              )}
            </button>
          </div>

          {errors.submit && (
            <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {errors.submit}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}