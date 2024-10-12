import LoginPage from './LoginPage';
import SignUpForm from './SignUpForm';
import Dashboard from './Dashboard'; // Import your Dashboard component
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (loginStatus) => {
    setIsLoggedIn(loginStatus);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
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
