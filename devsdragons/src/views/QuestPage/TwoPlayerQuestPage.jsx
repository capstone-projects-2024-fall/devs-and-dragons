import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useLocation, useNavigate } from 'react-router-dom';
import MultiplayerCodeEditor from '../Editor/MultiplayerCodeEditor';
import './TwoPlayerQuestPage.css';

// Init Animations functions
import initGamePlayerAnimation from './gamePlayer';
import initGameEnemyAnimation from './gameEnemy';
import initMushRoomAnimation from './mushroom';

//BACKGROUND IMAGES
import ForestBackground from './GameAssets/Backgrounds/Forest.png'; 
import DesertBackground from './GameAssets/Backgrounds/Desert.png';
// import RiverBackground from './GameAssets/Backgrounds/RiverCrossing.png';
import CastleBackground from './GameAssets/Backgrounds/CastleRuins.png';

//KNIGHT IMAGES
import knightAttack1 from "./GameAssets/Avatar/knight/knightAttack1.png";
import knightDeath from "./GameAssets/Avatar/knight/knightDeath.png";
import knightHurt from "./GameAssets/Avatar/knight/knightHurt.png";
import knightIdle from "./GameAssets/Avatar/knight/knightIdle.png";

//DRAGON IMAGES
import dragonAttack from "./GameAssets/Dragon/dragonAttack.png";
import dragonIdle from "./GameAssets/Dragon/dragonIdle.png";
import dragonHurt from "./GameAssets/Dragon/dragonHurt.png";
import dragonDeath from "./GameAssets/Dragon/dragonDeath.png";
import dragonWalk from "./GameAssets/Dragon/dragonWalk.png";

//MUSHROOM IMAGES
import mushroomIdle from "./GameAssets/Mushroom/mushroomIdle.png";
import mushroomAttack from "./GameAssets/Mushroom/mushroomAttack.png";
import mushroomHurt from "./GameAssets/Mushroom/mushroomHurt.png";
import mushroomDeath from "./GameAssets/Mushroom/mushroomDeath.png";

// Connect to the backend server socket
const socket = io('http://10.0.0.93:30000');

// StarRating component to display stars based on the grade
function StarRating({ grade }) {
    const totalStars = 5;
    const filledStars = Math.round(grade / 2);

    return (
        <div className="star-rating">
            {[...Array(totalStars)].map((_, index) => (
                <span key={index} style={{ color: index < filledStars ? 'yellow' : 'gray' }}>★</span>
            ))}
        </div>
    );
}

function TwoPlayerQuestPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { roomCode, questData, isRoomCreator } = location.state || {};
    const [quest, setQuest] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [sharedCode, setSharedCode] = useState("");
    const [language, setLanguage] = useState("python");
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [showContinueButton, setShowContinueButton] = useState(false);
    const [gameBackground, setGameBackground] = useState(ForestBackground); // Default background
    const playerRef = useRef(null); // Reference to player animation function
    const enemyRef = useRef(null); // Reference to enemy animation function
    const [playerHealth, setPlayerHealth] = useState(100); // Player health
    const [enemyHealth, setEnemyHealth] = useState(100); // Enemy Health

    // Enemy Change Animation Parameters
    const [enemyIdleSS, setEnemyIdleSS] = useState("");
    const [enemyIdleFrames, setEnemyIdleFrames] = useState(0);
    const [enemyHurtSS, setEnemyHurtSS] = useState("");
    const [enemyHurtFrames, setEnemyHurtFrames] = useState(0);
    const [enemyAttackSS, setEnemyAttackSS] = useState("");
    const [enemyAttackFrames, setEnemyAttackFrames] = useState(0);
    const [enemyDeathSS, setEnemyDeathSS] = useState("");
    const [enemyDeathFrames, setEnemyDeathFrames] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [timerLength, setTimerLength] = useState(null); // Default to 3 minutes
    const [players, setPlayers] = useState([]);
    const [currentPlayer, setCurrentPlayer] = useState(null);
    const [playerTime, setPlayerTime] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(0);
    // Fetch quest data
    const playersRef = useRef([]);

    
    useEffect(() => {
        if (!roomCode || !questData) return;

        fetch(`/api/quest-parameters?quest_id=${questData}`)
            .then(response => response.json())
            .then(data => {
                setQuest(data);
                if (data && Array.isArray(data.questions)) {
                    setQuestions(data.questions);
                }
            })
            .catch(error => console.error('Error fetching quest data:', error));
    }, [roomCode, questData]);

    // Dynamically set the background based on quest.background
    useEffect(() => {
        if (!quest || !quest.background) return;

        const getBackgroundStyle = () => {
            switch (quest.background) {
                case 'Desert':
                    return DesertBackground;
                case 'Castle Ruins':
                    return CastleBackground;
                case 'Forest':
                default:
                    return ForestBackground;
            }
        };

        setGameBackground(getBackgroundStyle());
    }, [quest]);

    useEffect(() => {
        socket.on('turn_update', (data) => {
            setCurrentPlayer(data.currentPlayer);
            setPlayerTime(data.timePerPlayer);
            setTimeRemaining(data.totalTimeRemaining);
        });
    
        return () => {
            socket.off('turn_update');
        };
    }, []);

    useEffect(() => {
        if (playerTime > 0) {
            const playerTimer = setInterval(() => {
                setPlayerTime((prev) => prev - 1);
            }, 1000);
    
            return () => clearInterval(playerTimer); // Cleanup individual player's timer
        }
    }, [playerTime]);
    
    useEffect(() => {
        if (timeRemaining > 0) {
            const totalTimer = setInterval(() => {
                setTimeRemaining((prev) => prev - 1);
            }, 1000);
    
            return () => clearInterval(totalTimer); // Cleanup total quest timer
        } else if (timeRemaining === 0 && gameStarted) {
            console.log("Total quest time expired, auto-submitting...");
            // handleAutoSubmit();
            setGameStarted(false); // End the game
        }
    }, [timeRemaining, gameStarted]);


    // Initialize Player Animation
    useEffect(() => {
        const getPlayerAdjustY = () => {
            switch (quest?.background) {
                case "Desert":
                    return 50;
                case "Castle Ruins":
                    return 50;
                case "Forest":
                    return 50;
                case "River Crossing":
                    return -120;
                default:
                    return 0; // Default offset
            }
        };

        const timer = setTimeout(() => {
            if (document.getElementById("playerCanvas")) {
                playerRef.current = initGamePlayerAnimation(getPlayerAdjustY());
            }
        }, 100); // Short delay to ensure the canvas is ready
        return () => clearTimeout(timer);
    }, [currentQuestionIndex, quest]);

    // Get Y-offset for Enemy
    const getEnemyAdjustY = () => {
        if (!quest?.enemy) return 0;
        switch (quest.enemy) {
            case "Dragon":
                switch (quest?.background) {
                    case "Desert":
                        return 120;
                    case "Castle Ruins":
                        return 130;
                    case "Forest":
                        return 120;
                    default:
                        return 0;
                }
            case "Mr. Mushroom":
                switch (quest?.background) {
                    case "Desert":
                        return 70;
                    case "Castle Ruins":
                        return 70;
                    case "Forest":
                        return 70;
                    default:
                        return 0;
                }
            default:
                return 0; // Default enemy offset
        }
    };

    // Set enemy animation parameters
    useEffect(() => {
        const setEnemyAnimations = () => {
            if (!quest || !quest.enemy) return;

            switch (quest.enemy) {
                case "Dragon":
                    setEnemyIdleSS("dragonIdle");
                    setEnemyIdleFrames(3);
                    setEnemyHurtSS("dragonHurt");
                    setEnemyHurtFrames(4);
                    setEnemyAttackSS("dragonAttack");
                    setEnemyAttackFrames(5);
                    setEnemyDeathSS("dragonDeath");
                    setEnemyDeathFrames(6);
                    break;

                case "Mr. Mushroom":
                    setEnemyIdleSS("mushroomIdle");
                    setEnemyIdleFrames(7);
                    setEnemyHurtSS("mushroomHurt");
                    setEnemyHurtFrames(5);
                    setEnemyAttackSS("mushroomAttack");
                    setEnemyAttackFrames(10);
                    setEnemyDeathSS("mushroomDeath");
                    setEnemyDeathFrames(11);
                    break;

                default:
                    console.warn("Unknown enemy type");
                    break;
            }
        };

        setEnemyAnimations();
    }, [quest]);

     // Initialize Enemy Animation
     const initializeEnemyAnimation = () => {
        const adjustY = getEnemyAdjustY();
        if (quest?.enemy === "Dragon") {
            enemyRef.current = initGameEnemyAnimation(adjustY);
        } else if (quest?.enemy === "Mr. Mushroom") {
            enemyRef.current = initMushRoomAnimation(adjustY);
        } 
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (document.getElementById("enemyCanvas")) {
                initializeEnemyAnimation();
            }
        }, 100); // Short delay to ensure the canvas is ready
        return () => clearTimeout(timer);
    }, [currentQuestionIndex, quest]);


    // Handle socket events
    useEffect(() => {
        if (!roomCode) return;

        socket.on("user_joined", (data) => {
            setMessages((prev) => [...prev, `The person joined ${data.username}, the players in the room ${data.players}`]);
        });

        socket.on("user_left", (data) => {
            setMessages((prev) => [...prev, `The person left ${data.username}, the players in the room ${data.players}`]);
        });

        socket.on("receive_message", (data) => {
            setMessages((prev) => [...prev, `${data.username}: ${data.message}`]);
        });

        socket.on('code_update', (data) => {
            setSharedCode(data.code);
        });

        socket.on('language_update', (data) => {
            setLanguage(data.language);
        });

        socket.on('update_player_health', (data) => {
            console.log('Player health updated:', data);
            setPlayerHealth(data.health);
        });

        socket.on('update_enemy_health', (data) => {
            console.log('Enemy health updated:', data);
            setEnemyHealth(data.health);
        });

        socket.on('next_question', (data) => {
            console.log('Received next_question event:', data);
            setCurrentQuestionIndex(data.questionIndex);
            setFeedbacks(data.feedbacks || []); 
            setShowContinueButton(false); 
        });

        socket.on('code_submit', (data) => {
            const { questionIndex, grade, advice, showContinueButton } = data; 
            console.log("Code submit event received:", data);
            setFeedbacks((prevFeedbacks) => {
                const newFeedbacks = [...prevFeedbacks];
                newFeedbacks[questionIndex] = { grade, advice };
                return newFeedbacks;
            });

            console.log("Setting showContinueButton from code_submit:", showContinueButton); 
            setShowContinueButton(showContinueButton); 
        });
        

        socket.on('trigger_animation', (data) => {
            const { grade } = data;
            
            if (grade >= 6) {
                // Trigger successful attack animations
                playerRef.current?.changeAnimation("playerAttack1", 6); 
                enemyRef.current?.changeAnimation(enemyHurtSS, enemyHurtFrames);
            } else {
                // Trigger failed attack animations
                playerRef.current?.changeAnimation("playerHurt", 5); 
                enemyRef.current?.changeAnimation(enemyAttackSS, enemyAttackFrames);
            }
        });

        socket.emit('join_room', {
            username: localStorage.getItem('user_id'),
            room: roomCode,
        });

        return () => {
            socket.off('receive_message');
            socket.off('code_update');
            socket.off('language_update');
            socket.off('update_player_health');
            socket.off('next_question');
            socket.off('code_submit');
            socket.off('trigger_animation');
        };
    }, [roomCode, enemyHurtSS, enemyHurtFrames, enemyAttackSS, enemyAttackFrames]);

    // Handle player health updates
    const updatePlayerHealth = (newHealth) => {
        setPlayerHealth(newHealth);

        // Emit health change to other players
        socket.emit('update_player_health', {
            room: roomCode,
            health: newHealth,
        });
    };

    // Handle enemy health updates
    const updateEnemyHealth = () => {
        const healthDecrement = 100 / questions.length; // Calculate decrement based on number of questions
        const newHealth = Math.max(0, enemyHealth - healthDecrement); // Ensure health doesn't go below 0
        setEnemyHealth(newHealth);

        // Emit enemy health change to other players
        socket.emit('update_enemy_health', {
            room: roomCode,
            health: newHealth,
        });
    };


    // Handle code submission
    const submitCode = (answer, language, questionIndex) => {
        const question = questions[questionIndex];
        fetch("/api/check_answer", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question, answer })
        })
            .then(response => response.text())
            .then((text) => {
                const gradeMatch = text.match(/Grade:\s*(\d+)/);
                const adviceMatch = text.match(/Advice:\s*(.+)/);
                const grade = gradeMatch ? parseInt(gradeMatch[1], 10) : null;
                const advice = adviceMatch ? adviceMatch[1] : "";
                
                // Emit grade and showContinueButton for all
                socket.emit('code_submit', {
                    room: roomCode,
                    questionIndex,
                    grade,
                    advice,
                    showContinueButton: grade >= 6 
                });

                // Emit animation event for all users
                socket.emit('trigger_animation', {
                    room: roomCode,
                    grade,
                    questionIndex,
                });

                setFeedbacks((prevFeedbacks) => {
                    const newFeedbacks = [...prevFeedbacks];
                    newFeedbacks[questionIndex] = { grade, advice };
                    return newFeedbacks;
                });

                // handle helath update
                if (grade >= 6) {                   
                    updateEnemyHealth();
                    console.log("PLAYER ATTACKS || ENEMY TAKES DAMAGE");
                } else if (grade < 6 ) {
                    updatePlayerHealth(playerHealth - 25);
                    console.log("PLAYER TAKES DAMGE || ENEMY ATTACKS");``
                } 

                const shouldShowContinue = grade >= 6;
                console.log("Grade:", grade, "Setting showContinueButton in submitCode:", shouldShowContinue);
                setShowContinueButton(shouldShowContinue);
            })
            .catch(error => console.error('Error submitting code:', error));
    };

    const handleNextQuestion = () => {
        const nextIndex = currentQuestionIndex + 1;
    
        console.log("Emitting next_question:", {
            room: roomCode,
            questionIndex: nextIndex,
            feedbacks,
        });
    
        socket.emit('next_question', {
            room: roomCode,
            questionIndex: nextIndex,
            feedbacks,
        });
    
        setCurrentQuestionIndex(nextIndex);
        setShowContinueButton(false); // Reset here as well for consistency
    };    

    // Handle chat message submission
    const sendMessage = () => {
        if (newMessage.trim()) {
            socket.emit('send_message', { room: roomCode, message: newMessage, username: localStorage.getItem('user_id') });
            setNewMessage("");
        }
    };

    // Handle code editor changes
    const handleEditorChange = (value, type) => {
        if (currentPlayer === localStorage.getItem('user_id')) {
            if (type === 'code') {
                setSharedCode(value);
                socket.emit('code_update', { room: roomCode, code: value });
            } else if (type === 'language') {
                setLanguage(value);
                socket.emit('language_update', { room: roomCode, language: value });
            }
        }
    };

    // Handle leaving the room
    const leaveRoom = () => {
        const username = localStorage.getItem('user_id');
        socket.emit('leave_room', { username, room: roomCode });
        navigate("/my-quests");
    };

    const handleStartQuest = async () => {
        if (isRoomCreator) {
            const totalSeconds = 10 * 60; // Total quest time (10 minutes)
            
            try {
                const response = await fetch(`/api/get_player_count?room=${roomCode}`);
                const data = await response.json();
                const playersList = data.player;
    
                if (!playersList || playersList.length === 0) {
                    alert("No players in the room!");
                    return;
                }
    
                setPlayers(playersList);
                playersRef.current = playersList;
    
                const timePerPlayer = Math.floor(totalSeconds / playersList.length);
                let currentPlayerIndex = 0;
                let totalTimeElapsed = 0;
    
                setGameStarted(true);
                socket.emit("start_timer", { room: roomCode });
    
                const turnInterval = setInterval(() => {
                console.log("totalTimeElapse, totalSeconds", totalTimeElapsed, totalSeconds)
                    if (totalTimeElapsed >= totalSeconds) {
                        clearInterval(turnInterval);
                        console.log("Quest time expired, auto-submitting...");
                        //handleAutoSubmit();
                        setGameStarted(false);
                        return;
                    }
    
                    const nextPlayer = playersRef.current[currentPlayerIndex % playersList.length];
                    console.log(nextPlayer)
                    setCurrentPlayer(nextPlayer);
                    setPlayerTime(timePerPlayer);
                    setTimeRemaining(totalSeconds - totalTimeElapsed);
    
                    socket.emit("turn_update", {
                        currentPlayer: nextPlayer,
                        timePerPlayer,
                        totalTimeRemaining: totalSeconds - totalTimeElapsed,
                    });
    
                    totalTimeElapsed += timePerPlayer;
                    currentPlayerIndex++;
                }, timePerPlayer * 1000);
            } catch (error) {
                console.error("Error fetching players:", error);
                alert("Failed to start the quest. Please try again.");
            }
        }
    };

    return (
        <div className="quest-main-page">
            <div className="content-section">
                <div className="header">
                    <h4>Room Code: {roomCode}</h4>
                    <button className="leave-room-button" onClick={leaveRoom}>
                        Leave
                    </button>
                </div>

                {currentQuestionIndex < questions.length && (
                    <div className="question-item">
                        <div className="question-display">
                            <p><strong>Question:</strong> {questions[currentQuestionIndex]}</p>
                        </div>
                        <div
                            className="game-screen"
                            style={{
                                backgroundImage: `url(${gameBackground})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                width: '100%',
                                height: '400px',
                            }}
                        >
                            <img src={knightAttack1} alt="Player Attack 1" style={{ display: "none" }} id="playerAttack1" />
                            <img src={knightDeath} alt="Player Death" style={{ display: "none" }} id="playerDeath" />
                            <img src={knightHurt} alt="Player Hurt" style={{ display: "none" }} id="playerHurt" />
                            <img src={knightIdle} alt="Player Idle" style={{ display: "none" }} id="playerIdle" />
                            <img src={dragonAttack} alt="Dragon Attack SS" id="dragonAttack" style={{display: "none"}} />
                            <img src={dragonIdle} alt="Dragon Idle SS" id="dragonIdle" style={{display: "none"}} />
                            <img src={dragonHurt} alt="Dragon Hurt SS" id="dragonHurt" style={{display: "none"}} />
                            <img src={dragonDeath} alt="Dragon Death SS" id="dragonDeath" style={{display: "none"}} />
                            <img src={dragonWalk} alt="Dragon Walk SS" id="dragonWalk" style={{display: "none"}} />
                            <img src={mushroomIdle} alt="Mushroom Idle SS" id="mushroomIdle" style={{display: "none"}} />
                            <img src={mushroomAttack} alt="Mushroom Attack SS" id="mushroomAttack" style={{display: "none"}} />
                            <img src={mushroomHurt} alt="Mushroom Hurt SS" id="mushroomHurt" style={{display: "none"}} />
                            <img src={mushroomDeath} alt="Mushroom Death SS" id="mushroomDeath" style={{display: "none"}} />
                            <div className="player-and-enemy">
                            {/* Health Bars Container */}
                            <div className="health-bars-container">
                                <div className="player-health-bar-container">
                                    <div className="health-bar">
                                        <div
                                            className="health-bar-inner"
                                            style={{ width: `${playerHealth}%` }}
                                        ></div>
                                    </div>
                                </div>
                                    <div className="enemy-health-bar-container">
                                        <div className="health-bar">
                                            <div
                                                className="health-bar-inner"
                                                style={{ width: `${enemyHealth}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                                {/* Canvas Container */}
                                <div className="canvas-container">
                                    <div className="player-section">
                                        <canvas id="playerCanvas" width="500" height="500"></canvas>
                                    </div>
                                    <div className="enemy-section">
                                        <canvas id="enemyCanvas" width="500" height="500"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {feedbacks[currentQuestionIndex] && (
                            <div className="feedback">
                                <h2>Feedback</h2>
                                <StarRating grade={feedbacks[currentQuestionIndex].grade} />
                                <p><strong>Advice:</strong> {feedbacks[currentQuestionIndex].advice}</p>
                                {showContinueButton && (
                                    <button onClick={handleNextQuestion}>Continue</button>
                                )}
                            </div>
                        )}
                    </div>
                )}
                {/* Reference to dealing with win/lost
                {currentQuestionIndex >= questions.length && <h2>
                    You win! All questions completed!</h2>} 
                {playerHealth <= 0 && <h2>You Lose!</h2>} */}
                {playerHealth <= 0 ? (
                <h2 style={{ backgroundColor: 'red', padding: '10px', borderRadius: '5px', color: 'white' }}>
                    You lose! Better luck next time!
                </h2>
                ) : currentQuestionIndex >= questions.length ? (
                <h2 style={{ backgroundColor: 'white', padding: '10px', borderRadius: '5px' }}>
                    You win! All questions completed!
                </h2>
                ) : null}


            </div>

            <div className="right-container">
                <div className="chat-container">
                    <h2>Collaborate with Your Teammate</h2>
                    <div style={{ border: '1px solid black', padding: '10px', height: '200px', overflowY: 'scroll', width: '1000px' }}>
                        {messages.map((msg, index) => (
                            <p key={index}>{msg}</p>
                        ))}
                    </div>
                    <div className="chat-buttons">
                        <input
                            className = "chat-input"
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Talk to your peer"
                        />
                        <button className="chat-send-button" onClick={sendMessage}>Send</button>
                    </div>
                </div>

                <div className="game-update-container">
                    <div className="update-header">
                        {isRoomCreator && !gameStarted && (
                            <div className="start-button-container">
                                <button className="start-button" onClick={handleStartQuest}>
                                    Start Quest
                                </button>
                            </div>
                        )}
                        <div className="turn-info">
                            <h3>Current Turn:</h3>
                            {currentPlayer ? (
                                <p>
                                    <strong>{currentPlayer}</strong> - Time Remaining:{" "}
                                    {Math.floor(playerTime / 60)}:{playerTime % 60 < 10 ? `0${playerTime % 60}` : playerTime % 60}
                                </p>
                            ) : (
                                <p>Waiting for turn to be assigned...</p>
                            )}
                        </div>
                    </div>

                    <div className="quest-timer">
                        <h3>Total Quest Time Remaining:</h3>
                        <p>
                            {Math.floor(timeRemaining / 60)}:{timeRemaining % 60 < 10 ? `0${timeRemaining % 60}` : timeRemaining % 60}
                        </p>
                    </div>
                </div>


                <div className="code-editor-container">
                    <MultiplayerCodeEditor
                        code={sharedCode}
                        language={language}
                        onChange={handleEditorChange}
                        onCodeSubmit={(code, lang) => submitCode(code, lang, currentQuestionIndex)}
                        disabled = {currentPlayer != localStorage.getItem('user_id')}
                    />
                </div>
            </div>
        </div>
    );
}

export default TwoPlayerQuestPage;