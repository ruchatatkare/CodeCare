import React from 'react';
import { TrendingUp, TrendingDown, Clock, Users, AlertTriangle } from 'lucide-react';

const AnalyticsSection = ({ filters, selectedArea }) => {
  const incidentTypes = [
    { type: 'Harassment', count: 45, percentage: 35, trend: 'up' },
    { type: 'Stalking', count: 28, percentage: 22, trend: 'down' },
    { type: 'Violence', count: 32, percentage: 25, trend: 'up' },
    { type: 'Other', count: 23, percentage: 18, trend: 'stable' }
  ];

  const timeDistribution = [
    { hour: '6-9 AM', incidents: 15 },
    { hour: '9-12 PM', incidents: 22 },
    { hour: '12-3 PM', incidents: 28 },
    { hour: '3-6 PM', incidents: 35 },
    { hour: '6-9 PM', incidents: 48 },
    { hour: '9-12 AM', incidents: 32 },
    { hour: '12-6 AM', incidents: 18 }
  ];

  const weeklyTrend = [
    { day: 'Mon', incidents: 25 },
    { day: 'Tue', incidents: 22 },
    { day: 'Wed', incidents: 28 },
    { day: 'Thu', incidents: 35 },
    { day: 'Fri', incidents: 42 },
    { day: 'Sat', incidents: 38 },
    { day: 'Sun', incidents: 30 }
  ];

  return (
    <div className="grid grid-cols-2 gap-6 mb-8">
      {/* Quick Stats */}
      {/* <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Total Calls Today</span>
            <span className="font-bold text-2xl text-blue-600">127</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Emergency Calls</span>
            <span className="font-bold text-2xl text-red-600">23</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Avg Response Time</span>
            <span className="font-bold text-2xl text-green-600">3.2m</span>
          </div>
        </div>
      </div> */}

      {/* Incident Types */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Incident Types</h3>
        <div className="space-y-3">
          {incidentTypes.map((incident, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">{incident.type}</span>
                  <span className="text-sm text-gray-600">{incident.count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${incident.percentage}%` }}
                  ></div>
                </div>
              </div>
              <div className="ml-3">
                {incident.trend === 'up' && <TrendingUp className="h-4 w-4 text-red-500" />}
                {incident.trend === 'down' && <TrendingDown className="h-4 w-4 text-green-500" />}
                {incident.trend === 'stable' && <div className="w-4 h-4 bg-gray-400 rounded-full"></div>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Time Distribution */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Hourly Distribution</h3>
        <div className="space-y-2">
          {timeDistribution.map((time, index) => (
            <div key={index} className="flex items-center">
              <div className="w-16 text-sm text-gray-600">{time.hour}</div>
              <div className="flex-1 ml-2">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${(time.incidents / 50) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="w-8 text-right text-sm font-medium">{time.incidents}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Trend */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Weekly Trend</h3>
        <div className="flex items-end space-x-2 h-32">
          {weeklyTrend.map((day, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-purple-600 rounded-t transition-all duration-300 hover:bg-purple-700"
                style={{ height: `${(day.incidents / 50) * 100}%` }}
              ></div>
              <div className="text-xs text-gray-600 mt-1">{day.day}</div>
              <div className="text-xs font-medium">{day.incidents}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Resource Recommendations */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Resource Recommendations</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <div>
              <p className="text-sm font-medium">High-Risk Zone Alert</p>
              <p className="text-xs text-gray-600">Deploy additional patrol in Market District</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
            <Clock className="h-5 w-5 text-yellow-600" />
            <div>
              <p className="text-sm font-medium">Peak Hours</p>
              <p className="text-xs text-gray-600">Increase staff during 6-9 PM</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
            <Users className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm font-medium">Community Outreach</p>
              <p className="text-xs text-gray-600">Organize safety workshop in Industrial Zone</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSection;