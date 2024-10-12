import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Components/HomePage/HomePage';
import LoginPage from './Components/LoginPage/LoginPage';
import QuestPage from './Components/QuestPage/QuestPage';
import CreateQuest from './Components/QuestPage/CreateQuest';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/quests" element={<QuestPage />} />
        <Route path="/create_quests" element={<CreateQuest />} />
      </Routes>
    </Router>
  );
}

export default App;
