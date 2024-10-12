import { Typography } from '@mui/material';
import react from 'react';
import { useNavigate } from 'react-router-dom';

const QuestPage = () => {

    const navigate = useNavigate();

    const handleLoginClick =() => {
        navigate('/login');
    };

  return (
    <Typography>HELLO QUESTS</Typography>
  );
};

export default QuestPage;