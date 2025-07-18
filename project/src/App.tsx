import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthForm from './components/AuthForm/AuthForm';
import HomePage from './components/Pages/HomePage'; 
import LandingPage from './components/Pages/Landing';
import SafeRoutePage from './components/Pages/SafeRoute';

const App = () => {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<LandingPage />} /> {/* Add other routes here */}
        <Route path="/login" element={<AuthForm />} /> {/* Login route */}
         <Route path="/home" element={<HomePage />} /> {/* Login route */}
           <Route path="/route" element={<SafeRoutePage />} /> {/* Login route */}
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
};

export default App;
