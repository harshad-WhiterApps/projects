import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { DashboardStats } from '../../types/database';
import {
  Package,
  AlertTriangle,
  Clock,
  DollarSign,
  TrendingUp,
  Users
} from 'lucide-react';

export function DashboardOverview() {
  const [stats, setStats] = useState<DashboardStats>({
    total_items: 0,
    low_stock_alerts: 0,
    expiring_soon: 0,
    total_value: 0,
    recent_movements: 0,
    active_vendors: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {
      // Get total items
      const { count: totalItems } = await supabase
        .from('inventory_items')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true);

      // Get low stock alerts
      const { count: lowStockAlerts } = await supabase
        .from('restock_alerts')
        .select('*', { count: 'exact', head: true })
        .eq('is_acknowledged', false)
        .in('alert_type', ['low_stock', 'out_of_stock']);

      // Get expiring items
      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
      
      const { count: expiringSoon } = await supabase
        .from('stock_batches')
        .select('*', { count: 'exact', head: true })
        .lte('expiry_date', thirtyDaysFromNow.toISOString().split('T')[0])
        .gt('quantity', 0);

      // Get recent movements count
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      const { count: recentMovements } = await supabase
        .from('stock_movements')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', sevenDaysAgo.toISOString());

      // Get active vendors
      const { count: activeVendors } = await supabase
        .from('vendors')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true);

      // Calculate total value
      const { data: stockData } = await supabase
        .from('stock_batches')
        .select('quantity, cost_per_unit')
        .gt('quantity', 0);

      const totalValue = stockData?.reduce((sum, batch) => {
        return sum + (batch.quantity * (batch.cost_per_unit || 0));
      }, 0) || 0;

      setStats({
        total_items: totalItems || 0,
        low_stock_alerts: lowStockAlerts || 0,
        expiring_soon: expiringSoon || 0,
        total_value: totalValue,
        recent_movements: recentMovements || 0,
        active_vendors: activeVendors || 0
      });
    } catch (error) {
      console.error('Error loading dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Items',
      value: stats.total_items,
      icon: Package,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'Low Stock Alerts',
      value: stats.low_stock_alerts,
      icon: AlertTriangle,
      color: 'bg-orange-500',
      change: '-5%'
    },
    {
      title: 'Expiring Soon',
      value: stats.expiring_soon,
      icon: Clock,
      color: 'bg-red-500',
      change: '+3%'
    },
    {
      title: 'Total Value',
      value: `$${stats.total_value.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-green-500',
      change: '+8%'
    },
    {
      title: 'Recent Movements',
      value: stats.recent_movements,
      icon: TrendingUp,
      color: 'bg-purple-500',
      change: '+15%'
    },
    {
      title: 'Active Vendors',
      value: stats.active_vendors,
      icon: Users,
      color: 'bg-indigo-500',
      change: '+2%'
    }
  ];

  if (loading) {
    return (
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 animate-pulse">
              <div className="h-16 bg-gray-200 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
        <p className="text-gray-600 mt-1">Real-time insights into your medical inventory</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Package className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Stock Updated</p>
                <p className="text-xs text-gray-500">Paracetamol - Batch #PAR001</p>
              </div>
              <span className="text-xs text-gray-400 ml-auto">2 min ago</span>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Low Stock Alert</p>
                <p className="text-xs text-gray-500">Surgical gloves running low</p>
              </div>
              <span className="text-xs text-gray-400 ml-auto">15 min ago</span>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <ShoppingCart className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">PO Approved</p>
                <p className="text-xs text-gray-500">Purchase Order #PO-2025-001</p>
              </div>
              <span className="text-xs text-gray-400 ml-auto">1 hr ago</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Critical Alerts</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <div>
                  <p className="text-sm font-medium text-red-900">Expired Stock</p>
                  <p className="text-xs text-red-600">5 items expired this week</p>
                </div>
              </div>
              <button className="text-xs text-red-600 font-medium hover:text-red-800">
                View All
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-sm font-medium text-orange-900">Expiring Soon</p>
                  <p className="text-xs text-orange-600">12 items expire in 30 days</p>
                </div>
              </div>
              <button className="text-xs text-orange-600 font-medium hover:text-orange-800">
                View All
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <Package className="w-5 h-5 text-yellow-600" />
                <div>
                  <p className="text-sm font-medium text-yellow-900">Low Stock</p>
                  <p className="text-xs text-yellow-600">8 items below threshold</p>
                </div>
              </div>
              <button className="text-xs text-yellow-600 font-medium hover:text-yellow-800">
                View All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}