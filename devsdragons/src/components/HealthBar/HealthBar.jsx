// // HealthBar.jsx
// import React, { useState, useEffect } from 'react';

// const HealthBar = ({ characterName = "Character", startingHealth = 100 }) => {
//     // Initialize health state and set it to startingHealth on component mount and updates
//     const [health, setHealth] = useState(startingHealth);
//     const [isAttacking, setIsAttacking] = useState(false);

//     // Ensure health resets when startingHealth prop changes
//     useEffect(() => {
//         setHealth(startingHealth);
//     }, [startingHealth]);

//     // Function to reduce health
//     const takeDamage = () => {
//         setHealth(prevHealth => Math.max(prevHealth - 10, 0));
//     };

//     // Function to trigger an attack animation
//     const triggerAttack = () => {
//         setIsAttacking(true);
//         setTimeout(() => setIsAttacking(false), 500); // Reset attacking status after animation
//     };

//     return (
//         <div>
//             {/* Attack and Damage Buttons */}
//             <button onClick={triggerAttack}>Attack ({characterName})</button>
//             <button style={{ backgroundColor: 'red', color: 'white' }} onClick={takeDamage}>
//                 Take Damage ({characterName})
//             </button>

//             {/* Show attack animation */}
//             {isAttacking && <p>{characterName} Attacking!</p>}

//             {/* Display health and health bar */}
//             <p>Health: {health}</p>
//             <div style={{ width: '200px', height: '20px', backgroundColor: '#4a4a4a', position: 'relative' }}>
//                 <div
//                     style={{
//                         width: `${(health / startingHealth) * 100}%`,
//                         height: '100%',
//                         backgroundColor: '#b3e024'
//                     }}
//                 ></div>
//             </div>
//         </div>
//     );
// };

// export default HealthBar;