import React, { useEffect } from "react";
import "./player.css";
import initKnightAnimation from "./player";
import knightAttack1 from "../GameAssets/Avatar/knight/knightAttack1.png";
import knightAttack2 from "../GameAssets/Avatar/knight/knightAttack2.png";
import knightAttack3 from "../GameAssets/Avatar/knight/knightAttack3.png";
import knightDeath from "../GameAssets/Avatar/knight/knightDeath.png";
import knightHurt from "../GameAssets/Avatar/knight/knightHurt.png";
import knightIdle from "../GameAssets/Avatar/knight/knightIdle.png";
import knightWalk from "../GameAssets/Avatar/knight/knightWalk.png";

const PlayerAnimation = () => {
    useEffect(() => {
        initKnightAnimation();
    }, []);

    return (
        <div id="container">
            <img src={knightAttack1} alt="Player Attack 1 SS" id="playerAttack1" style={{display: "none"}} />
            <img src={knightAttack2} alt="Player Attack 2 SS" id="playerAttack2" style={{display: "none"}} />
            <img src={knightAttack3} alt="Player Attack 3 SS" id="playerAttack3" style={{display: "none"}} />
            <img src={knightDeath} alt="Player Death SS" id="playerDeath" style={{display: "none"}} />
            <img src={knightHurt} alt="Player Hurt SS" id="playerHurt" style={{display: "none"}} />
            <img src={knightIdle} alt="Player Idle SS" id="playerIdle" style={{display: "none"}} />

            <div id="controls">
                <p>Player Animations</p>
                <div>
                    <input type="radio" name="animation" id="idle" defaultChecked />
                    <label htmlFor="idle">Idle</label>
                </div>
                <div>
                    <input type="radio" name="animation" id="attack"  />
                    <label htmlFor="attack">Attack</label>
                </div>
                <div>
                    <input type="radio" name="animation" id="hurt"  />
                    <label htmlFor="hurt">Hurt</label>
                </div>
                <div>
                    <input type="radio" name="animation" id="death"  />
                    <label htmlFor="death">Death</label>
                </div>
            </div>
            <canvas id="playerCanvas"></canvas>
        </div>
    )
}

export default PlayerAnimation;