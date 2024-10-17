/*
import LoginPage from './views/LoginPage/LoginPage.jsx';
import SignUpForm from './views/SignUpForm/SignUpForm.jsx';
import {useState} from 'react';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

***Incoming change from reorganize-views-branch by Jericho, App.jsx***

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
                <Route path="/SignUpForm" element={<SignUpForm onLogin={handleLogin} onClose={() => { /* handle closing the sign-up }} />} /> {/* Pass onLogin prop }
                <Route path="/Dashboard" element={<PrivateRoute isLoggedIn={isLoggedIn} onLogout={handleLogout} />} />
            </Routes>
        </Router>
    );
}

***Previous change, when it was App.js****

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
=======
export default App;

*/

const App = () => {
  return (
    <div>App</div>
  )
}

export default App