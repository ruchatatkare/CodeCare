import React, { useEffect, useState } from 'react';
import { Shield, Phone, Users, Settings, Download, Bell, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-purple-600" />
            <span className="text-xl font-bold text-gray-800">SafetyNet</span>
          </div>

          {/* If user is logged in, show full navbar; else show only login button */}
          {user ? (
            <>
              <div className="hidden md:flex items-center space-x-6">
                <a href="#dashboard" className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors">
                  <Shield className="h-4 w-4" />
                  <span>Dashboard</span>
                </a>
                <a href="#analytics" className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors">
                  <Users className="h-4 w-4" />
                  <span>Analytics</span>
                </a>
                <a href="#helpline" className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors">
                  <Phone className="h-4 w-4" />
                  <span>Helpline</span>
                </a>
                <a href="#settings" className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </a>
              </div>

              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-600 hover:text-purple-600 transition-colors">
                  <Bell className="h-5 w-5" />
                </button>
                <button className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </button>
                <button
                  onClick={handleLogoutClick}
                  className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-4">
            <button  onClick={handleLoginClick}  className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  {/* <Download className="h-4 w-4" /> */}
                  <span>Login</span>
                </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
