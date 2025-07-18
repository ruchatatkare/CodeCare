// import React, { useEffect, useState } from 'react';
// import { Shield, Phone, Users, Settings, Download, Bell, LogOut } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// const Navbar = () => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser) {
//       setUser(storedUser);
//     }
//   }, []);

//   const handleLoginClick = () => {
//     navigate('/login');
//   };

//   const handleLogoutClick = () => {
//     localStorage.removeItem("user");
//     setUser(null);
//     navigate('/login');
//   };

//   return (
//     <nav className="bg-white shadow-lg border-b border-gray-200">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <div className="flex items-center space-x-3">
//             <Shield className="h-8 w-8 text-purple-600" />
//             <span className="text-xl font-bold text-gray-800">Code Care</span>
//           </div>

//           {/* If user is logged in, show full navbar; else show only login button */}
//           {user ? (
//             <>
//               <div className="hidden md:flex items-center space-x-6">
//                 <a href="#dashboard" className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors">
//                   <Shield className="h-4 w-4" />
//                   <span>Dashboard</span>
//                 </a>
//                 <a href="#analytics" className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors">
//                   <Users className="h-4 w-4" />
//                   <span>Analytics</span>
//                 </a>
//                 <a href="#helpline" className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors">
//                   <Phone className="h-4 w-4" />
//                   <span>Helpline</span>
//                 </a>
//                 {/* <a href="#settings" className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors">
//                   <Settings className="h-4 w-4" />
//                   <span>Settings</span>
//                 </a> */}
//               </div>

//               <div className="flex items-center space-x-4">
//                 {/* <button className="p-2 text-gray-600 hover:text-purple-600 transition-colors">
//                   <Bell className="h-5 w-5" />
//                 </button> */}
//                 {/* <button className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
//                   <Download className="h-4 w-4" />
//                   <span>Export</span>
//                 </button> */}
//                 <button
//                   onClick={handleLogoutClick}
//                   className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors"
//                 >
//                   <LogOut className="h-4 w-4" />
//                   <span>Logout</span>
//                 </button>
//               </div>
//             </>
//           ) : (
//             <div className="flex items-center space-x-4">
//             <button  onClick={handleLoginClick}  className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
//                   {/* <Download className="h-4 w-4" /> */}
//                   <span>Login</span>
//                 </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import React, { useEffect, useState } from 'react';
import { Shield, Phone, Users, Settings, Download, Bell, LogOut, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [showHelpline, setShowHelpline] = useState(false);
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

  const handleHelplineClick = () => {
    setShowHelpline(true);
  };

  const handleCloseHelpline = () => {
    setShowHelpline(false);
  };

  const handleCallClick = (number) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <>
      <nav className="bg-white shadow-lg border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-purple-600" />
              <span className="text-xl font-bold text-gray-800">Code Care</span>
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
                  <button 
                    onClick={handleHelplineClick}
                    className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    <span>Helpline</span>
                  </button>
                </div>

                <div className="flex items-center space-x-4">
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
                <button onClick={handleLoginClick} className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  <span>Login</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Helpline Overlay */}
      {showHelpline && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Emergency Helplines</h2>
              <button onClick={handleCloseHelpline} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div 
                onClick={() => handleCallClick('181')}
                className="flex items-center justify-between p-4 bg-red-50 rounded-lg cursor-pointer hover:bg-red-100 transition-colors"
              >
                <div>
                  <h3 className="font-medium text-gray-800">Women's Helpline</h3>
                  <p className="text-gray-600">24/7 support for women in distress</p>
                </div>
                <div className="text-2xl font-bold text-red-600">181</div>
              </div>

              <div 
                onClick={() => handleCallClick('100')}
                className="flex items-center justify-between p-4 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors"
              >
                <div>
                  <h3 className="font-medium text-gray-800">Police</h3>
                  <p className="text-gray-600">Emergency police response</p>
                </div>
                <div className="text-2xl font-bold text-blue-600">100</div>
              </div>

              <div 
                onClick={() => handleCallClick('108')}
                className="flex items-center justify-between p-4 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100 transition-colors"
              >
                <div>
                  <h3 className="font-medium text-gray-800">Emergency Services</h3>
                  <p className="text-gray-600">Medical, fire and other emergencies</p>
                </div>
                <div className="text-2xl font-bold text-green-600">108</div>
              </div>
            </div>

            <div className="mt-6 text-center text-sm text-gray-500">
              Tap on any number to call immediately
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;