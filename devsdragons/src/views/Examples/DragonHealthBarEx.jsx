// src/views/Examples/DragonHealthBarEx.jsx
import React from 'react';
import DragonHealthBar from '../../components/DragonHealthBar/DragonHealthBar.jsx';

const DragonHealthBarEx = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', height: '100vh'}}>
            <DragonHealthBar />
        </div>
    );
};

export default DragonHealthBarEx;