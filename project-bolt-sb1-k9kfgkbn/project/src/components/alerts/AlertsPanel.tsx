import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { RestockAlert } from '../../types/database';
import { 
  AlertTriangle, 
  Clock, 
  Package, 
  CheckCircle,
  XCircle
} from 'lucide-react';

export function AlertsPanel() {
  const [alerts, setAlerts] = useState<RestockAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const { profile } = useAuth();

  useEffect(() => {
    loadAlerts();
  }, []);

  const loadAlerts = async () => {
    try {
      const { data, error } = await supabase
        .from('restock_alerts')
        .select(`
          *,
          item:inventory_items(*),
          location:locations(*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAlerts(data || []);
    } catch (error) {
      console.error('Error loading alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAcknowledge = async (alertId: string) => {
    try {
      const { error } = await supabase
        .from('restock_alerts')
        .update({
          is_acknowledged: true,
          acknowledged_by: profile?.id,
          acknowledged_at: new Date().toISOString()
        })
        .eq('id', alertId);

      if (error) throw error;
      loadAlerts();
    } catch (error) {
      console.error('Error acknowledging alert:', error);
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'out_of_stock':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'low_stock':
        return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      case 'expiring_soon':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'expired':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Package className="w-5 h-5 text-blue-600" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'out_of_stock':
      case 'expired':
        return 'border-red-200 bg-red-50';
      case 'low_stock':
        return 'border-orange-200 bg-orange-50';
      case 'expiring_soon':
        return 'border-yellow-200 bg-yellow-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'all') return true;
    if (filter === 'unacknowledged') return !alert.is_acknowledged;
    return alert.alert_type === filter;
  });

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Stock Alerts</h2>
        <p className="text-gray-600 mt-1">Monitor critical inventory situations</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-wrap gap-2">
            {[
              { value: 'all', label: 'All Alerts' },
              { value: 'unacknowledged', label: 'Unacknowledged' },
              { value: 'low_stock', label: 'Low Stock' },
              { value: 'out_of_stock', label: 'Out of Stock' },
              { value: 'expiring_soon', label: 'Expiring Soon' },
              { value: 'expired', label: 'Expired' }
            ].map(option => (
              <button
                key={option.value}
                onClick={() => setFilter(option.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === option.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredAlerts.map((alert) => (
            <div key={alert.id} className={`p-6 border-l-4 ${getAlertColor(alert.alert_type)}`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="mt-1">
                    {getAlertIcon(alert.alert_type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="text-lg font-semibold text-gray-900">
                        {alert.item?.name}
                      </h4>
                      <span className="text-sm text-gray-500">({alert.item?.sku})</span>
                      {!alert.is_acknowledged && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-gray-700 mb-2">{alert.message}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>Current: {alert.current_quantity}</span>
                      <span>Threshold: {alert.threshold_quantity}</span>
                      <span>Location: {alert.location?.name}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(alert.created_at).toLocaleDateString()} at{' '}
                      {new Date(alert.created_at).toLocaleTimeString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {alert.is_acknowledged ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Acknowledged
                    </span>
                  ) : (
                    <button
                      onClick={() => handleAcknowledge(alert.id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      Acknowledge
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAlerts.length === 0 && (
          <div className="text-center py-12">
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <p className="text-gray-500">No alerts found</p>
            <p className="text-sm text-gray-400">All inventory levels are within normal ranges</p>
          </div>
        )}
      </div>
    </div>
  );
}