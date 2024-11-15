// HealthBarExample.jsx
import React from 'react';
import HealthBar from '../components/HealthBar';

const HealthBarExample = () => (
    <div style={{ display: 'flex', gap: '20px' }}>
        <HealthBar characterName="Player" startingHealth={100} />
        <HealthBar characterName="Dragon" startingHealth={150} />
    </div>
);

export default HealthBarExample;
