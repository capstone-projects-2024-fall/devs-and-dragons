import LoginPage from './views/LoginPage/LoginPage.jsx';
import SignUpForm from './views/SignUpForm/SignUpForm.jsx';
import AvatarPage from './views/Avatar/AvatarPage.jsx';
import CreateQuestsPage from './views/QuestPage/CreateQuests.jsx';
import MyQuestsPage from './views/QuestPage/MyQuests.jsx';
import HomePage from './views/HomePage/HomePage.jsx';
import GuildsPage from './views/GuildPage/GuildPage.jsx';
import { DropDown, Button, Select, HUD } from './views/Examples'; // example views to showcase each component
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {useState} from 'react';
import theme from './theme/theme.js';
import { ThemeProvider, CssBaseline } from '@mui/material';
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/my-quests" element={<MyQuestsPage/>} />
          <Route path="/create-quests" element={<CreateQuestsPage />}/>
          <Route path="/guilds" element={<GuildsPage />} />
          <Route path="/avatar" element={<AvatarPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
