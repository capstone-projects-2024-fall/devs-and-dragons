import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useLocation, useNavigate } from 'react-router-dom';
import MultiplayerCodeEditor from '../Editor/MultiplayerCodeEditor';
import './TwoPlayerQuestPage.css';

import initGamePlayerAnimation from './gamePlayer';

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
    const [language, setLanguage] = useState("javascript");
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [showContinueButton, setShowContinueButton] = useState(false);
    const [gameBackground, setGameBackground] = useState(ForestBackground); // Default background
    const playerRef = useRef(null); // Reference to player animation
    const [playerHealth, setPlayerHealth] = useState(100); // Player health

    // Fetch quest data
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
                case 'River Crossing':
                    return RiverBackground;
                case 'Forest':
                default:
                    return ForestBackground;
            }
        };

        setGameBackground(getBackgroundStyle());
    }, [quest]);

    // Initialize Player Animation
    useEffect(() => {
        const getPlayerAdjustY = () => {
            switch (quest?.background) {
                case "Desert":
                    return 50;
                case "Castle Ruins":
                    return 100;
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

        socket.on('update_health', (data) => {
            console.log('Player health updated:', data);
            setPlayerHealth(data.health);
        });

        socket.on('next_question', (data) => {
            console.log('Received next_question event:', data);
            setCurrentQuestionIndex(data.questionIndex);
            if (data.feedbacks) {
                setFeedbacks(data.feedbacks);
            }
            const nextFeedback = data.feedbacks[data.questionIndex];
            const shouldShowContinue = nextFeedback && nextFeedback.grade >= 6;
            console.log("Feedback for next question (from next_question event):", nextFeedback);
            console.log("Setting showContinueButton in next_question handler:", shouldShowContinue);
            setShowContinueButton(shouldShowContinue);
        });

        socket.on('code_submit', (data) => {
            const { questionIndex, grade, advice } = data;
            console.log("Code submit event received:", data);
            setFeedbacks((prevFeedbacks) => {
                const newFeedbacks = [...prevFeedbacks];
                newFeedbacks[questionIndex] = { grade, advice };
                return newFeedbacks;
            });
            const shouldShowContinue = grade >= 6 && questionIndex === currentQuestionIndex;
            console.log("Setting showContinueButton in code_submit handler:", shouldShowContinue);
            setShowContinueButton(shouldShowContinue);
        });

        socket.emit('join_room', {
            username: localStorage.getItem('user_id'),
            room: roomCode,
        });

        return () => {
            socket.off('receive_message');
            socket.off('code_update');
            socket.off('language_update');
            socket.off('update_health');
            socket.off('next_question');
            socket.off('code_submit');
        };
    }, [roomCode, currentQuestionIndex]);

    // Handle health updates
    const updateHealth = (newHealth) => {
        setPlayerHealth(newHealth);

        // Emit health change to other players
        socket.emit('update_health', {
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

                socket.emit('code_submit', {
                    room: roomCode,
                    questionIndex,
                    grade,
                    advice
                });

                setFeedbacks((prevFeedbacks) => {
                    const newFeedbacks = [...prevFeedbacks];
                    newFeedbacks[questionIndex] = { grade, advice };
                    return newFeedbacks;
                });

                if (grade >= 6) {
                    // Successful attack
                    // updateHealth(playerHealth - 10); 
                    playerRef.current?.changeAnimation("playerAttack1", 6); // Play attack animation
                } else {
                    // Failed attack
                    updateHealth(playerHealth - 25);
                    playerRef.current?.changeAnimation("playerHurt", 5); // Play hurt animation
                }

                const shouldShowContinue = grade >= 6;
                console.log("Grade:", grade, "Setting showContinueButton in submitCode:", shouldShowContinue);
                setShowContinueButton(shouldShowContinue);
            })
            .catch(error => console.error('Error submitting code:', error));
    };

    // Handle next question
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
        const nextFeedback = feedbacks[nextIndex];
        const shouldShowContinue = nextFeedback && nextFeedback.grade >= 6;
        console.log("Feedback for next question:", nextFeedback);
        console.log("Setting showContinueButton in handleNextQuestion:", shouldShowContinue);
        setShowContinueButton(shouldShowContinue);
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
        if (type === 'code') {
            setSharedCode(value);
            socket.emit('code_update', { room: roomCode, code: value });
        } else if (type === 'language') {
            setLanguage(value);
            socket.emit('language_update', { room: roomCode, language: value });
        }
    };

    // Handle leaving the room
    const leaveRoom = () => {
        const username = localStorage.getItem('user_id');
        socket.emit('leave_room', { username, room: roomCode });
        navigate("/my-quests");
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
                            <div className="player-section">
                                <div className="health-bar-container">
                                    <div className="health-bar">
                                        <div
                                            className="health-bar-inner"
                                            style={{ width: `${playerHealth}%` }}
                                        ></div>
                                    </div>
                                </div>
                                <canvas id="playerCanvas" width="500" height="500"></canvas>
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
                {currentQuestionIndex >= questions.length && <h2>All questions completed!</h2>}
            </div>

            <div className="right-container">
                <div className="chat-container">
                    <h2>Collaborate with Your Teammate</h2>
                    <div style={{ border: '1px solid black', padding: '10px', height: '200px', overflowY: 'scroll' }}>
                        {messages.map((msg, index) => (
                            <p key={index}>{msg}</p>
                        ))}
                    </div>
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Talk to your peer"
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>

                <div className="code-editor-container">
                    <MultiplayerCodeEditor
                        code={sharedCode}
                        language={language}
                        onChange={handleEditorChange}
                        onCodeSubmit={(code) => submitCode(code, language, currentQuestionIndex)}
                    />
                </div>
            </div>
        </div>
    );
}

export default TwoPlayerQuestPage;

// import React, { useState, useEffect, useRef } from 'react';
// import { io } from 'socket.io-client';
// import { useLocation, useNavigate } from 'react-router-dom';
// import MultiplayerCodeEditor from '../Editor/MultiplayerCodeEditor';
// import './TwoPlayerQuestPage.css';
// import ForestBackground from './GameAssets/Backgrounds/Forest.png';
// import DesertBackground from './GameAssets/Backgrounds/Desert.png';
// import RiverBackground from './GameAssets/Backgrounds/RiverCrossing.png';
// import CastleBackground from './GameAssets/Backgrounds/CastleRuins.png';
// import initGamePlayerAnimation from './gamePlayer';


// // Connect to the backend server socket
// const socket = io('http://10.0.0.93:30000');

// // StarRating component to display stars based on the grade
// function StarRating({ grade }) {
//     const totalStars = 5;
//     const filledStars = Math.round(grade / 2);

//     return (
//         <div className="star-rating">
//             {[...Array(totalStars)].map((_, index) => (
//                 <span key={index} style={{ color: index < filledStars ? 'yellow' : 'gray' }}>★</span>
//             ))}
//         </div>
//     );
// }

// function TwoPlayerQuestPage() {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { roomCode, questData, isRoomCreator } = location.state || {};
//     const [quest, setQuest] = useState(null);
//     const [questions, setQuestions] = useState([]);
//     const [feedbacks, setFeedbacks] = useState([]);
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//     const [sharedCode, setSharedCode] = useState("");
//     const [language, setLanguage] = useState("javascript");
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState("");
//     const [showContinueButton, setShowContinueButton] = useState(false);
//     const [gameBackground, setGameBackground] = useState(ForestBackground); // Default background
//     const playerRef = useRef(null); // Reference to player animation

//     // healthbar 
//     const [playerHealth, setPlayerHealth] = useState(100); // Player health

//     // Fetch quest data
//     useEffect(() => {
//         if (!roomCode || !questData) return;

//         fetch(`/api/quest-parameters?quest_id=${questData}`)
//             .then(response => response.json())
//             .then(data => {
//                 setQuest(data);
//                 if (data && Array.isArray(data.questions)) {
//                     setQuestions(data.questions);
//                 }
//             })
//             .catch(error => console.error('Error fetching quest data:', error));
//     }, [roomCode, questData]);

//     // Dynamically set the background based on quest.background
//     useEffect(() => {
//         if (!quest || !quest.background) return;

//         const getBackgroundStyle = () => {
//             switch (quest.background) {
//                 case 'Desert':
//                     return DesertBackground;
//                 case 'Castle Ruins':
//                     return CastleBackground;
//                 case 'River Crossing':
//                     return RiverBackground;
//                 case 'Forest':
//                 default:
//                     return ForestBackground;
//             }
//         };

//         setGameBackground(getBackgroundStyle());
//     }, [quest]);


//      // Init Player Animation based on background
//      useEffect(() => {
//         const getPlayerAdjustY = () => {
//             switch (quest?.background) {
//                 case "Desert":
//                     return 0; 
//                 case "Castle Ruins":
//                     return 50; 
//                 case "Forest":
//                     return 50; 
//                 case "River Crossing":
//                     return -120;
//                 default:
//                     return 0; // Default offset
//             }
//         };
    
//         const timer = setTimeout(() => {
//             if (document.getElementById("playerCanvas")) {
//                 playerRef.current = initGamePlayerAnimation(getPlayerAdjustY());
//             }
//         }, 100); // Short delay to ensure the canvas is ready
//         return () => clearTimeout(timer);
//     }, [currentQuestionIndex, quest]); // Depend on quest to reinitialize if background changes


//     // Handle socket events
//     useEffect(() => {
//         if (!roomCode) return;

//         socket.on("user_joined", (data) => {
//             setMessages((prev) => [...prev, `The person joined ${data.username}, the players in the room ${data.players}`]);
//         });

//         socket.on("user_left", (data) => {
//             setMessages((prev) => [...prev, `The person left ${data.username}, the players in the room ${data.players}`]);
//         });

//         socket.on("receive_message", (data) => {
//             setMessages((prev) => [...prev, `${data.username}: ${data.message}`]);
//         });

//         socket.on('code_update', (data) => {
//             setSharedCode(data.code);
//         });

//         socket.on('language_update', (data) => {
//             setLanguage(data.language);
//         });

//         socket.on('next_question', (data) => {
//             console.log('Received next_question event:', data);
//             setCurrentQuestionIndex(data.questionIndex);
//             if (data.feedbacks) {
//                 setFeedbacks(data.feedbacks);
//             }
//             const nextFeedback = data.feedbacks[data.questionIndex];
//             const shouldShowContinue = nextFeedback && nextFeedback.grade >= 6;
//             console.log("Feedback for next question (from next_question event):", nextFeedback);
//             console.log("Setting showContinueButton in next_question handler:", shouldShowContinue);
//             setShowContinueButton(shouldShowContinue);
//         });

//         socket.on('code_submit', (data) => {
//             const { questionIndex, grade, advice } = data;
//             console.log("Code submit event received:", data);
//             setFeedbacks((prevFeedbacks) => {
//                 const newFeedbacks = [...prevFeedbacks];
//                 newFeedbacks[questionIndex] = { grade, advice };
//                 return newFeedbacks;
//             });
//             // Determine and set showContinueButton based on the grade and current question index
//             const shouldShowContinue = grade >= 6 && questionIndex === currentQuestionIndex;
//             console.log("Setting showContinueButton in code_submit handler:", shouldShowContinue);
//             setShowContinueButton(shouldShowContinue);
//         });

//         socket.emit('join_room', {
//             username: localStorage.getItem('user_id'),
//             room: roomCode,
//         });

//         return () => {
//             socket.off('receive_message');
//             socket.off('code_update');
//             socket.off('language_update');
//             socket.off('next_question');
//             socket.off('code_submit');
//         };
//     }, [roomCode, currentQuestionIndex]);

//     // Handle code submission
//     const submitCode = (answer, language, questionIndex) => {
//         const question = questions[questionIndex];
//         fetch("/api/check_answer", {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ question, answer })
//         })
//             .then(response => response.text())
//             .then((text) => {
//                 const gradeMatch = text.match(/Grade:\s*(\d+)/);
//                 const adviceMatch = text.match(/Advice:\s*(.+)/);
//                 const grade = gradeMatch ? parseInt(gradeMatch[1], 10) : null;
//                 const advice = adviceMatch ? adviceMatch[1] : "";

//                 socket.emit('code_submit', {
//                     room: roomCode,
//                     questionIndex,
//                     grade,
//                     advice
//                 });

//                 setFeedbacks((prevFeedbacks) => {
//                     const newFeedbacks = [...prevFeedbacks];
//                     newFeedbacks[questionIndex] = { grade, advice };
//                     return newFeedbacks;
//                 });

//                 // Show continue button only if grade >= 6
//                 const shouldShowContinue = grade >= 6;
//                 console.log("Grade:", grade, "Setting showContinueButton in submitCode:", shouldShowContinue);
//                 setShowContinueButton(shouldShowContinue);
//             })
//             .catch(error => console.error('Error submitting code:', error));
//     };

//     // Handle next question
//     const handleNextQuestion = () => {
//         const nextIndex = currentQuestionIndex + 1;

//         console.log("Emitting next_question:", {
//             room: roomCode,
//             questionIndex: nextIndex,
//             feedbacks,
//         });

//         socket.emit('next_question', {
//             room: roomCode,
//             questionIndex: nextIndex,
//             feedbacks,
//         });

//         setCurrentQuestionIndex(nextIndex);
//         // Reset showContinueButton based on the next question's feedback
//         const nextFeedback = feedbacks[nextIndex];
//         const shouldShowContinue = nextFeedback && nextFeedback.grade >= 6;
//         console.log("Feedback for next question:", nextFeedback);
//         console.log("Setting showContinueButton in handleNextQuestion:", shouldShowContinue);
//         setShowContinueButton(shouldShowContinue);
//     };

//     // Handle chat message submission
//     const sendMessage = () => {
//         if (newMessage.trim()) {
//             socket.emit('send_message', { room: roomCode, message: newMessage, username: localStorage.getItem('user_id') });
//             setNewMessage("");
//         }
//     };

//     // Handle code editor changes
//     const handleEditorChange = (value, type) => {
//         if (type === 'code') {
//             setSharedCode(value);
//             socket.emit('code_update', { room: roomCode, code: value });
//         } else if (type === 'language') {
//             setLanguage(value);
//             socket.emit('language_update', { room: roomCode, language: value });
//         }
//     };

//     // Handle leaving the room
//     const leaveRoom = () => {
//         const username = localStorage.getItem('user_id');
//         socket.emit('leave_room', { username, room: roomCode });
//         navigate("/my-quests");
//     };

//     return (
//         <div className="quest-main-page">
//             <div className="content-section">
//                 <div className="header">
//                     <h4>Room Code: {roomCode}</h4>
//                     <button className="leave-room-button" onClick={leaveRoom}>
//                         Leave
//                     </button>
//                 </div>

//                 {currentQuestionIndex < questions.length && (
//                     <div className="question-item">
//                         <div className="question-display">
//                             <p><strong>Question:</strong> {questions[currentQuestionIndex]}</p>
//                         </div>
//                         <div
//                             className="game-screen"
//                             style={{
//                                 backgroundImage: `url(${gameBackground})`,
//                                 backgroundSize: 'cover',
//                                 backgroundPosition: 'center',
//                                 width: '100%',
//                                 height: '400px',
//                             }}
//                         >
//                             <div className="player-section">
//                                 {/* Player Health Bar */}
//                                 <div className="health-bar-container">
//                                     <div className="health-bar">
//                                         <div
//                                             className="health-bar-inner"
//                                             style={{ width: `${playerHealth}%` }}
//                                         ></div>
//                                     </div>
//                                 </div>
//                                 {/* Player Canvas */}
//                                 <canvas id="playerCanvas" width="500" height="500"></canvas>
//                             </div>
//                         </div>
//                         {feedbacks[currentQuestionIndex] && (
//                             <div className="feedback">
//                                 <h2>Feedback</h2>
//                                 <StarRating grade={feedbacks[currentQuestionIndex].grade} />
//                                 <p><strong>Advice:</strong> {feedbacks[currentQuestionIndex].advice}</p>
//                                 {showContinueButton && (
//                                     <button onClick={handleNextQuestion}>Continue</button>
//                                 )}
//                             </div>
//                         )}
//                     </div>
//                 )}
//                 {currentQuestionIndex >= questions.length && <h2>All questions completed!</h2>}
//             </div>

//             <div className="right-container">
//                 <div className="chat-container">
//                     <h2>Collaborate with Your Teammate</h2>
//                     <div style={{ border: '1px solid black', padding: '10px', height: '200px', overflowY: 'scroll' }}>
//                         {messages.map((msg, index) => (
//                             <p key={index}>{msg}</p>
//                         ))}
//                     </div>
//                     <input
//                         type="text"
//                         value={newMessage}
//                         onChange={(e) => setNewMessage(e.target.value)}
//                         placeholder="Talk to your peer"
//                     />
//                     <button onClick={sendMessage}>Send</button>
//                 </div>

//                 <div className="code-editor-container">
//                     <MultiplayerCodeEditor
//                         code={sharedCode}
//                         language={language}
//                         onChange={handleEditorChange}
//                         onCodeSubmit={(code, lang) => submitCode(code, lang, currentQuestionIndex)}
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default TwoPlayerQuestPage;