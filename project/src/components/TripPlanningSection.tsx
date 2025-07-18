import React, { useState } from 'react';
import { Navigation, MapPin, Clock, Shield, AlertTriangle, Route, Star, Phone } from 'lucide-react';

const TripPlanningSection = () => {
  const [tripData, setTripData] = useState({
    source: '',
    destination: '',
    travelTime: 'now',
    transportMode: 'walking'
  });

  const [routes, setRoutes] = useState([]);
  const [isPlanning, setIsPlanning] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);

  const transportModes = [
    { value: 'walking', label: 'Walking', icon: '🚶‍♀️' },
    { value: 'public', label: 'Public Transport', icon: '🚌' },
    { value: 'taxi', label: 'Taxi/Ride Share', icon: '🚕' },
    { value: 'bike', label: 'Bicycle', icon: '🚲' }
  ];

  const timeOptions = [
    { value: 'now', label: 'Now' },
    { value: 'morning', label: 'Morning (6-12 PM)' },
    { value: 'afternoon', label: 'Afternoon (12-6 PM)' },
    { value: 'evening', label: 'Evening (6-10 PM)' },
    { value: 'night', label: 'Night (10 PM-6 AM)' }
  ];

  // Mock route data - in real implementation, this would come from API
  const mockRoutes = [
    {
      id: 1,
      name: 'Safest Route',
      distance: '2.8 km',
      duration: '35 min',
      safetyScore: 92,
      riskLevel: 'low',
      incidents: 2,
      wellLitAreas: 85,
      publicSpaces: 78,
      emergencyServices: 4,
      waypoints: ['Central Park', 'University Campus', 'Shopping Mall'],
      warnings: [],
      recommendations: ['Well-lit path', 'High foot traffic', 'CCTV coverage']
    },
    {
      id: 2,
      name: 'Fastest Route',
      distance: '2.1 km',
      duration: '25 min',
      safetyScore: 76,
      riskLevel: 'medium',
      incidents: 8,
      wellLitAreas: 65,
      publicSpaces: 45,
      emergencyServices: 2,
      waypoints: ['Industrial Area', 'Back Street', 'Main Road'],
      warnings: ['Low lighting in industrial area', 'Fewer people after 8 PM'],
      recommendations: ['Avoid after dark', 'Consider alternative transport']
    },
    {
      id: 3,
      name: 'Balanced Route',
      distance: '2.5 km',
      duration: '30 min',
      safetyScore: 84,
      riskLevel: 'low',
      incidents: 4,
      wellLitAreas: 75,
      publicSpaces: 68,
      emergencyServices: 3,
      waypoints: ['Residential Area', 'Community Center', 'Bus Station'],
      warnings: ['Construction work on Oak Street'],
      recommendations: ['Good balance of safety and time', 'Regular patrol presence']
    }
  ];

  const handlePlanTrip = () => {
    if (!tripData.source || !tripData.destination) {
      alert('Please enter both source and destination');
      return;
    }

    setIsPlanning(true);
    
    // Simulate API call
    setTimeout(() => {
      setRoutes(mockRoutes);
      setIsPlanning(false);
    }, 2000);
  };

  const getSafetyColor = (score) => {
    if (score >= 85) return 'text-green-600 bg-green-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getRiskBadgeColor = (risk) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-6">
        <Route className="h-6 w-6 text-purple-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-800">Safe Route Planning</h2>
      </div>

      {/* Trip Input Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="h-4 w-4 inline mr-1" />
            From
          </label>
          <input
            type="text"
            placeholder="Enter starting location"
            value={tripData.source}
            onChange={(e) => setTripData({...tripData, source: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Navigation className="h-4 w-4 inline mr-1" />
            To
          </label>
          <input
            type="text"
            placeholder="Enter destination"
            value={tripData.destination}
            onChange={(e) => setTripData({...tripData, destination: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Clock className="h-4 w-4 inline mr-1" />
            Travel Time
          </label>
          <select
            value={tripData.travelTime}
            onChange={(e) => setTripData({...tripData, travelTime: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {timeOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Transport Mode
          </label>
          <select
            value={tripData.transportMode}
            onChange={(e) => setTripData({...tripData, transportMode: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {transportModes.map(mode => (
              <option key={mode.value} value={mode.value}>
                {mode.icon} {mode.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={handlePlanTrip}
        disabled={isPlanning}
        className="w-full md:w-auto bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        {isPlanning ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span>Planning Safe Route...</span>
          </>
        ) : (
          <>
            <Navigation className="h-4 w-4" />
            <span>Plan Safe Route</span>
          </>
        )}
      </button>

      {/* Route Results */}
      {routes.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Route Options</h3>
          <div className="space-y-4">
            {routes.map((route) => (
              <div
                key={route.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedRoute?.id === route.id 
                    ? 'border-purple-500 bg-purple-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedRoute(route)}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-3">
                    <h4 className="font-semibold text-lg">{route.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskBadgeColor(route.riskLevel)}`}>
                      {route.riskLevel.toUpperCase()} RISK
                    </span>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-bold ${getSafetyColor(route.safetyScore)}`}>
                    {route.safetyScore}% Safe
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                  <div className="flex items-center space-x-2">
                    <Navigation className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{route.distance}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{route.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{route.incidents} incidents</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{route.emergencyServices} emergency services</span>
                  </div>
                </div>

                {/* Safety Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Well-lit Areas</span>
                      <span>{route.wellLitAreas}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-500 h-2 rounded-full"
                        style={{ width: `${route.wellLitAreas}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Public Spaces</span>
                      <span>{route.publicSpaces}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${route.publicSpaces}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Waypoints */}
                <div className="mb-3">
                  <p className="text-sm text-gray-600 mb-1">Route passes through:</p>
                  <div className="flex flex-wrap gap-2">
                    {route.waypoints.map((waypoint, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        {waypoint}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Warnings */}
                {route.warnings.length > 0 && (
                  <div className="mb-3">
                    <p className="text-sm font-medium text-red-600 mb-1">⚠️ Warnings:</p>
                    <ul className="text-sm text-red-600 space-y-1">
                      {route.warnings.map((warning, index) => (
                        <li key={index}>• {warning}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Recommendations */}
                <div>
                  <p className="text-sm font-medium text-green-600 mb-1">✓ Safety Features:</p>
                  <ul className="text-sm text-green-600 space-y-1">
                    {route.recommendations.map((rec, index) => (
                      <li key={index}>• {rec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Emergency Contacts */}
          <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-semibold text-red-800 mb-2 flex items-center">
              <Phone className="h-4 w-4 mr-2" />
              Emergency Contacts During Travel
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-medium text-red-700">Women's Helpline</p>
                <p className="text-red-600">181 (24/7)</p>
              </div>
              <div>
                <p className="font-medium text-red-700">Police Emergency</p>
                <p className="text-red-600">100</p>
              </div>
              <div>
                <p className="font-medium text-red-700">Emergency Services</p>
                <p className="text-red-600">108</p>
              </div>
            </div>
          </div>

          {/* Share Route */}
          {selectedRoute && (
            <div className="mt-4 flex space-x-3">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Share Route with Contact
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                Start Navigation
              </button>
              <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                Save Route
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TripPlanningSection;