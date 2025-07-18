import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import MapSection from "../MapSection";
import AnalyticsSection from "../AnalyticsSection";
import FilterPanel from "../FilterPanel";
import StatisticsCards from "../StatisticsCards";
import Chatbot from "../chatbot";
import Footer from "../Footer";
import TripPlanner from "../TripPlanningSection";

// Type definitions
interface User {
  username: string;
  email?: string;
  id?: string;
}

interface Filters {
  incidentType: string;
  timeOfDay: string;
  dateRange: string;
  severity: string;
}

function HomePage() {
  const [username, setUsername] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [filters, setFilters] = useState<Filters>({
    incidentType: "all",
    timeOfDay: "all",
    dateRange: "last7days",
    severity: "all",
  });
  const [selectedArea, setSelectedArea] = useState<any>(null);

  useEffect(() => {
    const checkAuthentication = () => {
      try {
        // Check if localStorage is available
        if (typeof Storage !== "undefined" && localStorage) {
          const userDataString = localStorage.getItem("user");
          
          if (userDataString) {
            const userData: User = JSON.parse(userDataString);
            
            // Validate user data
            if (userData && userData.username && userData.username.trim() !== "") {
              setUsername(userData.username);
              setError("");
            } else {
              throw new Error("Invalid user data");
            }
          } else {
            throw new Error("No user data found");
          }
        } else {
          // Fallback for environments without localStorage (like Claude artifacts)
          console.warn("localStorage not available, using fallback authentication");
          setUsername("Demo User");
          setError("");
        }
      } catch (err) {
        console.error("Authentication error:", err);
        setError("Authentication failed. Redirecting to login...");
        
        // Redirect to login after a short delay
        setTimeout(() => {
          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }
        }, 2000);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4">
            <svg className="mx-auto h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Authentication Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.href = "/login"}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-6">
        {/* Header Section */}
        <div className="mb-6">
          {username && (
            <p className="text-lg font-semibold text-indigo-600 mt-2">
              Welcome, {username} 👋
            </p>
          )}

          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Women's Safety Dashboard
          </h1>
          <p className="text-gray-600">
            Real-time insights from 181 Women's Helpline data to enhance urban safety
          </p>
        </div>

        {/* Emergency Banner */}
        <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                <strong>Emergency:</strong> Call 100 (Police) or 181 (Women's Helpline) for immediate assistance
              </p>
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        <FilterPanel filters={filters} setFilters={setFilters} />

        {/* Statistics Cards */}
        <StatisticsCards filters={filters} />

        {/* Trip Planning Section */}
        <div className="mb-8">
          <TripPlanner />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          <div className="xl:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Safety Heatmap
                </h2>
                <MapSection
                  filters={filters}
                  selectedArea={selectedArea}
                  setSelectedArea={setSelectedArea}
                />
              </div>
            </div>
          </div>
          <div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Analytics
                </h2>
                <AnalyticsSection filters={filters} selectedArea={selectedArea} />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Report Incident</h3>
            <p className="text-gray-600 text-sm mb-4">Quickly report safety concerns in your area</p>
            <button className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">
              Report Now
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Safety Tips</h3>
            <p className="text-gray-600 text-sm mb-4">Learn important safety guidelines and tips</p>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              View Tips
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Emergency Contacts</h3>
            <p className="text-gray-600 text-sm mb-4">Access important emergency contact numbers</p>
            <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
              View Contacts
            </button>
          </div>
        </div>
      </div>

      {/* Floating Chatbot */}
      <div className="fixed bottom-4 right-4 z-50">
        <Chatbot />
      </div>

      <Footer />
    </div>
  );
}

export default HomePage;