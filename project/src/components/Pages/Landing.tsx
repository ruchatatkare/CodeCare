import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Chatbot from "../chatbot";


import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <Navbar />

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-16 bg-white">
        <div className="max-w-xl mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Your Safety, Our Priority.
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Empowering women with real-time safety insights, emergency tools, and a voice to report harassment or unsafe situations — all in one platform.
          </p>
          <Link to="/dashboard">
            <button className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition">
              Go to Dashboard
            </button>
          </Link>
        </div>

        {/* Image Stack: badge.png above the main image */}
        <div className="flex flex-col items-center">
          <img src="project/src/assests/badge.png"
            alt="Badge Illustration"
            className="w-24 mb-4"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-100 py-12 px-6 md:px-20">
        <h2 className="text-3xl font-semibold text-center mb-12 text-gray-800">
          Key Features
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Live Safety Heatmaps",
              desc: "Visualize high-risk zones and plan safe routes using live crime data and user reports.",
            },
            {
              title: "Instant SOS Alerts",
              desc: "Trigger emergency alerts and notify authorities and trusted contacts in one tap.",
            },
            {
              title: "Smart Chatbot",
              desc: "Get safety tips, location info, and real-time help using our AI-powered assistant.",
            },
            {
              title: "Report Incidents",
              desc: "Quickly report harassment or unsafe experiences with supporting media and location data.",
            },
            {
              title: "Help Center Nearby",
              desc: "Find the closest police stations, hospitals, and support centers instantly.",
            },
            {
              title: "Safety Ratings",
              desc: "View or submit formal testimonials and safety ratings of places you’ve visited.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-purple-700 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call-to-Action */}
      <div className="py-12 bg-purple-600 text-white text-center">
        <h2 className="text-3xl font-semibold mb-4">Join the Movement for Safer Cities</h2>
        <p className="mb-6">Be part of the change. Report, react, and raise your voice.</p>
        <Link to="/register">
          <button className="bg-white text-purple-600 px-6 py-3 rounded-xl font-medium hover:bg-gray-100">
            Get Started
          </button>
        </Link>
      </div>
        
      <div className="fixed bottom-4 right-4 z-50">
  <Chatbot />
</div>


      <Footer />
    </div>
  );
}

export default LandingPage;
