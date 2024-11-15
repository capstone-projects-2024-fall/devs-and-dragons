// HealthBar.js
import React, { useState } from 'react';
import './HealthBar.css';


const HealthBar = ({ characterName = "Character", startingHealth = 100 }) => {
    // Initialize health state
    const [health, setHealth] = useState(startingHealth);
    const [isAttacking, setIsAttacking] = useState(false);

    // Function to reduce health
    const takeDamage = () => setHealth(prevHealth => Math.max(prevHealth - 10, 0));

    // Function to show attack animation
    const triggerAttack = () => {
        setIsAttacking(true);
        setTimeout(() => setIsAttacking(false), 500); // Reset after 500ms
    };

    return (
        <div>
            {/* Buttons for actions */}
            <button onClick={triggerAttack}>Attack ({characterName})</button>
            <button onClick={takeDamage} style={{ backgroundColor: 'red', color: 'white' }}>
                Take Damage ({characterName})
            </button>

            {/* Attack animation message */}
            {isAttacking && <p>{characterName} Attacking!</p>}

            {/* Health display */}
            <p>Health: {health}</p>
            <div className="health-bar">
                <div
                    className="health-bar-fill"
                    style={{
                        width: `${(health / startingHealth) * 100}%`,
                        backgroundColor: '#b3e024'
                    }}
                ></div>
            </div>
        </div>
    );
};

export default HealthBar;
