import React, { useState } from 'react';
import './HealthBar.css';

const HealthBar = ({ startingHealthPlayer = 100, startingHealthDragon = 150 }) => {
    const [currentCharacter, setCurrentCharacter] = useState('Player');
    const [healthPlayer, setHealthPlayer] = useState(startingHealthPlayer);
    const [healthDragon, setHealthDragon] = useState(startingHealthDragon);
    const [isAttacking, setIsAttacking] = useState(false);

    const getCurrentHealth = () => (currentCharacter === 'Player' ? healthPlayer : healthDragon);
    const setCurrentHealth = (newHealth) => {
        if (currentCharacter === 'Player') {
            setHealthPlayer(newHealth);
        } else {
            setHealthDragon(newHealth);
        }
    };

    const takeDamage = () => {
        const currentHealth = getCurrentHealth();
        setCurrentHealth(Math.max(currentHealth - 10, 0));
    };

    const triggerAttack = () => {
        setIsAttacking(true);
        setTimeout(() => setIsAttacking(false), 500); // Reset after 500ms
    };

    const toggleCharacter = () => {
        setCurrentCharacter((prev) => (prev === 'Player' ? 'Dragon' : 'Player'));
    };

    return React.createElement(
        'div',
        { style: { padding: '20px', borderRadius: '10px' } },
        React.createElement(
            'button',
            { onClick: toggleCharacter, style: { marginBottom: '10px' } },
            `Switch to ${currentCharacter === 'Player' ? 'Dragon' : 'Player'}`
        ),
        React.createElement(
            'button',
            { onClick: triggerAttack },
            `Attack (${currentCharacter})`
        ),
        React.createElement(
            'button',
            {
                onClick: takeDamage,
                style: { backgroundColor: 'red', color: 'white' }
            },
            `Take Damage (${currentCharacter})`
        ),
        isAttacking && React.createElement('p', null, `${currentCharacter} Attacking!`),
        React.createElement('p', null, `Health: ${getCurrentHealth()}`),
        React.createElement(
            'div',
            { className: 'health-bar' },
            React.createElement('div', {
                className: 'health-bar-fill',
                style: {
                    width: `${(getCurrentHealth() / (currentCharacter === 'Player' ? startingHealthPlayer : startingHealthDragon)) * 100}%`,
                    backgroundColor: '#b3e024',
                }
            })
        )
    );
};

export default HealthBar;

