import React, { useState } from 'react';
import { MapPin, AlertTriangle, Shield, Navigation } from 'lucide-react';

const MapSection = ({ filters, selectedArea, setSelectedArea }) => {
  const [viewMode, setViewMode] = useState('safety'); // 'safety', 'incidents', 'heatmap'

  const areas = [
    { id: 1, name: 'Central Business District', x: 45, y: 30, safetyScore: 85, incidents: 12, severity: 'medium' },
    { id: 2, name: 'University Area', x: 60, y: 45, safetyScore: 92, incidents: 8, severity: 'low' },
    { id: 3, name: 'Industrial Zone', x: 25, y: 60, safetyScore: 65, incidents: 28, severity: 'high' },
    { id: 4, name: 'Residential North', x: 70, y: 25, safetyScore: 78, incidents: 15, severity: 'medium' },
    { id: 5, name: 'Market District', x: 35, y: 75, safetyScore: 58, incidents: 35, severity: 'high' },
    { id: 6, name: 'Tech Park', x: 80, y: 55, safetyScore: 88, incidents: 6, severity: 'low' },
    { id: 7, name: 'Old Town', x: 20, y: 40, safetyScore: 72, incidents: 18, severity: 'medium' },
    { id: 8, name: 'Suburban East', x: 85, y: 70, safetyScore: 81, incidents: 10, severity: 'low' }
  ];

  const getSafetyColor = (score) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Safety Map</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setViewMode('safety')}
            className={`px-4 py-2 rounded-lg ${viewMode === 'safety' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Safety Scores
          </button>
          <button
            onClick={() => setViewMode('incidents')}
            className={`px-4 py-2 rounded-lg ${viewMode === 'incidents' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Incidents
          </button>
          <button
            onClick={() => setViewMode('heatmap')}
            className={`px-4 py-2 rounded-lg ${viewMode === 'heatmap' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Heatmap
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="bg-gray-100 rounded-lg p-4 h-96 relative overflow-hidden">
          {/* Mock map background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg"></div>
          
          {/* Grid lines to simulate map */}
          <div className="absolute inset-0 opacity-20">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="absolute border-gray-300" style={{
                left: `${i * 10}%`,
                top: 0,
                bottom: 0,
                borderLeft: '1px solid'
              }} />
            ))}
            {[...Array(10)].map((_, i) => (
              <div key={i} className="absolute border-gray-300" style={{
                top: `${i * 10}%`,
                left: 0,
                right: 0,
                borderTop: '1px solid'
              }} />
            ))}
          </div>

          {/* Area markers */}
          {areas.map((area) => (
            <div
              key={area.id}
              className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
                selectedArea?.id === area.id ? 'scale-125 z-10' : 'hover:scale-110'
              } transition-transform duration-200`}
              style={{ left: `${area.x}%`, top: `${area.y}%` }}
              onClick={() => setSelectedArea(area)}
            >
              {viewMode === 'safety' && (
                <div className="relative">
                  <div className={`w-8 h-8 rounded-full ${getSafetyColor(area.safetyScore)} flex items-center justify-center shadow-lg`}>
                    <Shield className="h-4 w-4 text-white" />
                  </div>
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs opacity-0 hover:opacity-100 transition-opacity">
                    {area.name}: {area.safetyScore}%
                  </div>
                </div>
              )}
              
              {viewMode === 'incidents' && (
                <div className="relative">
                  <div className={`w-8 h-8 rounded-full ${getSeverityColor(area.severity)} flex items-center justify-center shadow-lg`}>
                    <AlertTriangle className="h-4 w-4 text-white" />
                  </div>
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs opacity-0 hover:opacity-100 transition-opacity">
                    {area.name}: {area.incidents} incidents
                  </div>
                </div>
              )}
              
              {viewMode === 'heatmap' && (
                <div className={`w-12 h-12 rounded-full ${getSeverityColor(area.severity)} opacity-60 animate-pulse`} />
              )}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-4">
          {viewMode === 'safety' && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="text-sm">High Safety (80-100%)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                <span className="text-sm">Medium Safety (60-79%)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <span className="text-sm">Low Safety (0-59%)</span>
              </div>
            </div>
          )}
          
          {viewMode === 'incidents' && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <span className="text-sm">High Incidents (20+)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                <span className="text-sm">Medium Incidents (10-19)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="text-sm">Low Incidents (0-9)</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Selected Area Details */}
      {selectedArea && (
        <div className="mt-6 bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-lg mb-2">{selectedArea.name}</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600">Safety Score</p>
              <p className="text-2xl font-bold text-green-600">{selectedArea.safetyScore}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Incidents (7 days)</p>
              <p className="text-2xl font-bold text-red-600">{selectedArea.incidents}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Severity Level</p>
              <p className={`text-2xl font-bold ${
                selectedArea.severity === 'high' ? 'text-red-600' :
                selectedArea.severity === 'medium' ? 'text-yellow-600' : 'text-green-600'
              }`}>{selectedArea.severity.toUpperCase()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapSection;