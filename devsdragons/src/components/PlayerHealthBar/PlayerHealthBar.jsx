
import React, {useState} from 'react';



const PlayerHealthBar = () => {
    const[health, setHealth] = useState(100); //random value for now
    //health -> variable holding current health
    //setHealth -> function to update health 


    //function to decrease player's health
    const decreaseHealth = () => {
        setHealth((prevHealth) => Math.max(prevHealth - 10, 0)); 
    };

    return ( 
        <div>
             {/* Button to decrease health */}
            <button style = {{backgroundColor: 'red', color: 'white'}} onClick= {decreaseHealth}>TakeDamage(Player)</button>
             {/* Display current health value */}
            <p>Health: {health}</p> {/*states health*/}

            {/*healthbar*/}
            <div style = {{width: '200px', height: '20px', backgroundColor: '#4a4a4a', position: 'relative' }}> {/*empty (outer) bar is grey*/}
            <div style = {{width:`${health}%`, height: '100%', backgroundColor: '#b3e024'}} ></div> {/* filled (inner) bar is bright green*/}
            </div>
        </div>
    );
}


export default PlayerHealthBar;