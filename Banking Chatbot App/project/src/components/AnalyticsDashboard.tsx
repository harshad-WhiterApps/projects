import React from 'react';
import { BarChart3, TrendingUp, Users, MessageSquare, Clock, Star } from 'lucide-react';
import { Analytics } from '../types';

interface AnalyticsDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockAnalytics: Analytics = {
  totalChats: 1247,
  resolvedChats: 1156,
  averageResponseTime: 2.3,
  customerSatisfaction: 4.6,
  topIntents: ['balance_inquiry', 'transaction_history', 'bill_payment', 'fund_transfer', 'loan_inquiry'],
  sentimentDistribution: {
    positive: 68,
    negative: 12,
    neutral: 20,
  },
};

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const resolutionRate = ((mockAnalytics.resolvedChats / mockAnalytics.totalChats) * 100).toFixed(1);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BarChart3 className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
                <p className="text-blue-100">AI Chatbot Performance Metrics</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-blue-800 rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">Total Chats</p>
                  <p className="text-2xl font-bold text-blue-800">{mockAnalytics.totalChats.toLocaleString()}</p>
                </div>
                <MessageSquare className="w-8 h-8 text-blue-500" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-sm font-medium">Resolution Rate</p>
                  <p className="text-2xl font-bold text-green-800">{resolutionRate}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-600 text-sm font-medium">Avg Response Time</p>
                  <p className="text-2xl font-bold text-orange-800">{mockAnalytics.averageResponseTime}s</p>
                </div>
                <Clock className="w-8 h-8 text-orange-500" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 text-sm font-medium">CSAT Score</p>
                  <p className="text-2xl font-bold text-purple-800">{mockAnalytics.customerSatisfaction}/5</p>
                </div>
                <Star className="w-8 h-8 text-purple-500" />
              </div>
            </div>
          </div>

          {/* Sentiment Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-blue-500" />
                Sentiment Distribution
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Positive</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${mockAnalytics.sentimentDistribution.positive}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-800">
                      {mockAnalytics.sentimentDistribution.positive}%
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Neutral</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${mockAnalytics.sentimentDistribution.neutral}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-800">
                      {mockAnalytics.sentimentDistribution.neutral}%
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Negative</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-red-500 h-2 rounded-full" 
                        style={{ width: `${mockAnalytics.sentimentDistribution.negative}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-800">
                      {mockAnalytics.sentimentDistribution.negative}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Intents</h3>
              <div className="space-y-3">
                {mockAnalytics.topIntents.map((intent, index) => (
                  <div key={intent} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium">
                        {index + 1}
                      </span>
                      <span className="text-sm text-gray-700 capitalize">
                        {intent.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${100 - (index * 15)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Performance Insights */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Performance Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">↑ 15%</div>
                <div className="text-sm text-gray-600">Resolution Rate</div>
                <div className="text-xs text-gray-500">vs last month</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">↓ 0.8s</div>
                <div className="text-sm text-gray-600">Response Time</div>
                <div className="text-xs text-gray-500">vs last month</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">↑ 0.3</div>
                <div className="text-sm text-gray-600">CSAT Score</div>
                <div className="text-xs text-gray-500">vs last month</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};