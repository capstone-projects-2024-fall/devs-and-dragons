// src/Components/HomePage/HomePage.jsx

import React, { useState } from 'react';
import { Stack, AppBar, Typography, Button, Menu, MenuItem} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {

    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLoginClick =() => {
        navigate('/login');
    };

    const handle_Quest_Menu_Click =(event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget); //toggle menu
    };

    const handle_Quest_Click = () => {
        navigate('/quests');
        handleClose();
    };

    const handle_Create_Quest_Click = () => {
        navigate('/create_quests');
        handleClose();
    }

  return (
    <AppBar 
        sx= {{
            width: '100vw',
            backgroundColor: '#028a0f',
            padding: '16x',
        }}
    >
        <Stack spacing={8} direction='row' justifyContent='center' alignItems='center' sx={{width: '100%'}}>
            <Typography sx={{fontFamily: 'monospace', fontSize: '24px', color: 'white'}}>
                DND-HomePage-Demo
            </Typography>
            <div>
                <Button 
                    variant='text' 
                    sx={{fontFamily: 'monospace', fontSize: '24px', color: 'white'}} 
                    onClick={handle_Quest_Menu_Click}
                    aria-controls={open ? 'quest-positioned-menu' : undefined}
                    aria-hashpopup='true'
                    aria-expanded={open ? 'true' : undefined}
                >
                    Quests
                </Button>
                <Menu
                    id="quest-positioned-menu"
                    aria-labelledby="quest-positioned-button"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    <MenuItem onClick={handle_Quest_Click}>My Quests</MenuItem>
                    <MenuItem onClick={handle_Create_Quest_Click}>Create Quest</MenuItem>
                </Menu>
            </div>
            
            <Button variant='text' sx={{fontFamily: 'monospace', fontSize: '24px', color: 'white'}} onClick={handleLoginClick}>
                Guilds
            </Button>
            <Typography sx={{fontFamily: 'monospace', fontSize: '24px', color: 'white'}}>
                [User Account Stuff / Settings]
            </Typography>
        </Stack>
    </AppBar>
  );
};

export default HomePage;