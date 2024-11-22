import React from 'react';
import "./game.css";
import initGamePlayerAnimation from './gamePlayer.js';
// import initGameEnemyAnimation from './gameEnemy.js';
import knightAttack1 from "./GameAssets/Avatar/knight/knightAttack1.png";
import knightAttack2 from "./GameAssets/Avatar/knight/knightAttack2.png";
import knightAttack3 from "./GameAssets/Avatar/knight/knightAttack3.png";
import knightDeath from "./GameAssets/Avatar/knight/knightDeath.png";
import knightHurt from "./GameAssets/Avatar/knight/knightHurt.png";
import knightIdle from "./GameAssets/Avatar/knight/knightIdle.png";
import knightWalk from "./GameAssets/Avatar/knight/knightWalk.png";
import dragonAttack from "./GameAssets/Enemy/Dragon/dragonAttack.png";
import dragonIdle from "./GameAssets/Enemy/Dragon/dragonIdle.png";
import dragonHurt from "./GameAssets/Enemy/Dragon/dragonHurt.png";
import dragonDeath from "./GameAssets/Enemy/Dragon/dragonDeath.png";
import dragonWalk from "./GameAssets/Enemy/Dragon/dragonWalk.png";

const GameScreen = () => {
    useEffect(() => {
        initGamePlayerAnimation();
    }, []);
    
    return (
        <div id="container">
            <img src={knightAttack1} alt="Player Attack 1 SS" id="playerAttack1" style={{display: "none"}} />
            <img src={knightAttack2} alt="Player Attack 2 SS" id="playerAttack2" style={{display: "none"}} />
            <img src={knightAttack3} alt="Player Attack 3 SS" id="playerAttack3" style={{display: "none"}} />
            <img src={knightDeath} alt="Player Death SS" id="playerDeath" style={{display: "none"}} />
            <img src={knightHurt} alt="Player Hurt SS" id="playerHurt" style={{display: "none"}} />
            <img src={knightIdle} alt="Player Idle SS" id="playerIdle" style={{display: "none"}} />
            <img src={dragonAttack} alt="Dragon Attack SS" id="dragonAttack" style={{display: "none"}} />
            <img src={dragonIdle} alt="Dragon Idle SS" id="dragonIdle" style={{display: "none"}} />
            <img src={dragonHurt} alt="Dragon Hurt SS" id="dragonHurt" style={{display: "none"}} />
            <img src={dragonDeath} alt="Dragon Death SS" id="dragonDeath" style={{display: "none"}} />
            <img src={dragonWalk} alt="Dragon Walk SS" id="dragonWalk" style={{display: "none"}} />
            <div id="controls">
                <p>Here we will have buttons to trigger animation</p>
            </div>
            <canvas id="gameCanvas"></canvas>
        </div>
    )
}

export default GameScreen;