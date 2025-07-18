import React from 'react';
import { Shield, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-6 w-6 text-purple-400" />
              <span className="text-xl font-bold">Code Care</span>
            </div>
            <p className="text-gray-400 text-sm">
              Empowering women's safety through data-driven insights and proactive community support.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Emergency Contacts</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-purple-400" />
                <span>181 - Women's Helpline</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-purple-400" />
                <span>100 - Police</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-purple-400" />
                <span>108 - Emergency Services</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2 text-sm">
              <a href="#" className="block hover:text-purple-400 transition-colors">Safety Tips</a>
              <a href="#" className="block hover:text-purple-400 transition-colors">Report Incident</a>
              <a href="#" className="block hover:text-purple-400 transition-colors">Community Support</a>
              <a href="#" className="block hover:text-purple-400 transition-colors">Resources</a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-purple-400" />
                <span>support@codecare.gov</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-purple-400" />
                <span>Government Technology Hub</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 Code Care. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;