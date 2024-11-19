import React, { useEffect, useState } from "react";
import BackgroundMusic from "../../components/Music/BackgroundMusic";

const MusicTestView = () => {
    const [music] = useState(() => new BackgroundMusic("/game_music.mp3")); // Instantiate the class
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        // stop music
        return () => {
            music.stop();
        };
    }, [music]);

    const handlePlay = () => {
        music.play();
        setIsPlaying(true);
    };



    const handleStop = () => {
        music.stop();
        setIsPlaying(false);
    };

    return (
        <div>
            
            <button onClick={handlePlay} disabled={isPlaying}>
                Play Music
            </button>

            <button onClick={handleStop}>Stop Music</button>
        </div>
    );
};

export default MusicTestView;
