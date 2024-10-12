import LoginPage from './LoginPage';
import SignUpForm from './SignUpForm';
import React, {useState} from 'react';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (loginStatus) => {
    setIsLoggedIn(loginStatus);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
   <LoginPage/>       
  )
}

export default App;
