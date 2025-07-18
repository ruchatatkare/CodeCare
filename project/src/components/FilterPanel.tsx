import React from 'react';
import { Filter, Calendar, Clock, AlertTriangle } from 'lucide-react';

const FilterPanel = ({ filters, setFilters }) => {
  const incidentTypes = [
    { value: 'all', label: 'All Incidents' },
    { value: 'harassment', label: 'Harassment' },
    { value: 'stalking', label: 'Stalking' },
    { value: 'violence', label: 'Violence' },
    { value: 'other', label: 'Other' }
  ];

  const timeOptions = [
    { value: 'all', label: 'All Hours' },
    { value: 'morning', label: 'Morning (6-12)' },
    { value: 'afternoon', label: 'Afternoon (12-18)' },
    { value: 'evening', label: 'Evening (18-24)' },
    { value: 'night', label: 'Night (0-6)' }
  ];

  const dateRanges = [
    { value: 'today', label: 'Today' },
    { value: 'last7days', label: 'Last 7 Days' },
    { value: 'last30days', label: 'Last 30 Days' },
    { value: 'last90days', label: 'Last 90 Days' }
  ];

  const severityLevels = [
    { value: 'all', label: 'All Severities' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex items-center mb-4">
        <Filter className="h-5 w-5 text-gray-600 mr-2" />
        <h2 className="text-lg font-semibold">Filters</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <AlertTriangle className="h-4 w-4 inline mr-1" />
            Incident Type
          </label>
          <select 
            value={filters.incidentType}
            onChange={(e) => setFilters({...filters, incidentType: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {incidentTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Clock className="h-4 w-4 inline mr-1" />
            Time of Day
          </label>
          <select 
            value={filters.timeOfDay}
            onChange={(e) => setFilters({...filters, timeOfDay: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {timeOptions.map(time => (
              <option key={time.value} value={time.value}>{time.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="h-4 w-4 inline mr-1" />
            Date Range
          </label>
          <select 
            value={filters.dateRange}
            onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {dateRanges.map(range => (
              <option key={range.value} value={range.value}>{range.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <AlertTriangle className="h-4 w-4 inline mr-1" />
            Severity
          </label>
          <select 
            value={filters.severity}
            onChange={(e) => setFilters({...filters, severity: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {severityLevels.map(level => (
              <option key={level.value} value={level.value}>{level.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;