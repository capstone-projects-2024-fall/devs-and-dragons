import LoginPage from './LoginPage';
import SignUpForm from './SignUpForm';
import Dashboard from './Dashboard'; // Import your Dashboard component
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';

function App() {
  // Check local storage for login status on app load
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const savedLoginStatus = localStorage.getItem('isLoggedIn');
    return savedLoginStatus === 'true'; // Convert to boolean
  });

  const handleLogin = (loginStatus) => {
    setIsLoggedIn(loginStatus);
    localStorage.setItem('isLoggedIn', loginStatus); // Store login status in local storage
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn'); // Remove login status from local storage
  };

    return (
        <Router>
            <Routes>
                <Route path="/" element={isLoggedIn ? <Dashboard onLogout={handleLogout} /> : <LoginPage onLogin={handleLogin} />} />
                <Route path="/Dashboard" element={<PrivateRoute isLoggedIn={isLoggedIn} onLogout={handleLogout} />} />
            </Routes>
        </Router>
    );
}

// A private route component to protect the dashboard route
const PrivateRoute = ({ isLoggedIn, onLogout }) => {
    const navigate = useNavigate();

    const handleLogoutClick = async () => {
        onLogout();
        navigate('/'); // Redirect to login page after logout
    };

    return isLoggedIn ? <Dashboard onLogout={handleLogoutClick} /> : <Navigate to="/" />;
};

export default App;
