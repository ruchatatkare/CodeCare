import React from 'react';
import { Phone, AlertTriangle, Shield, Users, TrendingUp, TrendingDown } from 'lucide-react';

const StatisticsCards = ({ filters }) => {
  const stats = [
    {
      title: 'Total Calls',
      value: '1,247',
      change: '+12.5%',
      trend: 'up',
      icon: Phone,
      color: 'blue'
    },
    {
      title: 'Emergency Calls',
      value: '89',
      change: '-8.2%',
      trend: 'down',
      icon: AlertTriangle,
      color: 'red'
    },
    {
      title: 'Safe Zones',
      value: '156',
      change: '+4.1%',
      trend: 'up',
      icon: Shield,
      color: 'green'
    },
    {
      title: 'Active Responders',
      value: '24',
      change: '+2.3%',
      trend: 'up',
      icon: Users,
      color: 'purple'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-500 text-blue-600',
      red: 'bg-red-500 text-red-600',
      green: 'bg-green-500 text-green-600',
      purple: 'bg-purple-500 text-purple-600'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const colorClasses = getColorClasses(stat.color);
        
        return (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-full ${colorClasses.split(' ')[0]} bg-opacity-20`}>
                <Icon className={`h-6 w-6 ${colorClasses.split(' ')[1]}`} />
              </div>
              <div className="flex items-center space-x-1">
                {stat.trend === 'up' ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
                <span className={`text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatisticsCards;