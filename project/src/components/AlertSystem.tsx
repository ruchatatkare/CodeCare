import React, { useState } from 'react';
import { AlertTriangle, X, Bell } from 'lucide-react';

const AlertSystem = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'high',
      message: 'High incident rate detected in Market District - 15 calls in last 2 hours',
      timestamp: '2 minutes ago',
      area: 'Market District'
    },
    {
      id: 2,
      type: 'medium',
      message: 'Unusual activity pattern detected in Industrial Zone',
      timestamp: '15 minutes ago',
      area: 'Industrial Zone'
    }
  ]);

  const dismissAlert = (id) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'high': return 'bg-red-100 border-red-500 text-red-800';
      case 'medium': return 'bg-yellow-100 border-yellow-500 text-yellow-800';
      case 'low': return 'bg-blue-100 border-blue-500 text-blue-800';
      default: return 'bg-gray-100 border-gray-500 text-gray-800';
    }
  };

  if (alerts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2 max-w-md">
      {alerts.map((alert) => (
        <div 
          key={alert.id}
          className={`border-l-4 p-4 rounded-lg shadow-lg ${getAlertColor(alert.type)} animate-slide-in`}
        >
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 mt-0.5 mr-3 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium">{alert.message}</p>
              <p className="text-xs mt-1 opacity-75">{alert.timestamp}</p>
            </div>
            <button 
              onClick={() => dismissAlert(alert.id)}
              className="ml-3 flex-shrink-0 hover:opacity-70"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlertSystem;