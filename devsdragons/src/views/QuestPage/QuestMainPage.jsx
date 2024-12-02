import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CodeEditor from '../Editor/CodeEditor';
import Timer from '../../components/Timer/timer';
import "./QuestMainPage.css";

//Animations
import initGamePlayerAnimation from './gamePlayer';
import initGameEnemyAnimation from './gameEnemy';

//Images
import forestImage from './Forest.png'; 
import desertImage from './Desert.png';
import riverImage from './RiverCrossing.png';
import castleImage from './CastleRuins.png';
import knightAttack1 from "./GameAssets/Avatar/knight/knightAttack1.png";
import knightDeath from "./GameAssets/Avatar/knight/knightDeath.png";
import knightHurt from "./GameAssets/Avatar/knight/knightHurt.png";
import knightIdle from "./GameAssets/Avatar/knight/knightIdle.png";
import dragonAttack from "./GameAssets/Enemy/Dragon/dragonAttack.png";
import dragonIdle from "./GameAssets/Enemy/Dragon/dragonIdle.png";
import dragonHurt from "./GameAssets/Enemy/Dragon/dragonHurt.png";
import dragonDeath from "./GameAssets/Enemy/Dragon/dragonDeath.png";
import dragonWalk from "./GameAssets/Enemy/Dragon/dragonWalk.png";

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

function QuestMainPage() {
    const [quest, setQuest] = useState(null);
    const [feedbacks, setFeedbacks] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showContinueButton, setShowContinueButton] = useState(false);
    const playerRef = useRef(null);
    const enemyRef = useRef(null);
    const [playerHealth, setPlayerHealth] = useState(100); // Initial health
    const [dragonHealth, setDragonHealth] = useState(100); // Initial health
    const [gameOver, setGameOver] = useState(false);
    const [gameWin, setGameWin] = useState(false);

    const location = useLocation();
    const questId = new URLSearchParams(location.search).get("quest_id");

    // Function to get the background style URL
    const getBackgroundStyle = () => {
        if (!quest || !quest.background) return forestImage; // Use imported image as default

        switch (quest.background) {
            case 'Desert':
                return desertImage;
            case 'Castle Ruins':
                return castleImage;
            case 'Forest':
                return forestImage; 
            case 'River Crossing':
                return riverImage;
            default:
                return forestImage; // Use default
        }
    };

    // Determine the timer length based on quest difficulty
    const getTimerLength = () => {
        if (!quest || !quest.difficultyLevel) return "00:03:00"; // Default to 3 minutes
        switch (quest.difficultyLevel.toLowerCase()) {
            case "easy":
                return "00:03:00";
            case "medium":
                return "00:00:10";
            case "hard":
                return "00:07:00";
            default:
                return "00:03:00";
        }
    };

    useEffect(() => {
        if (!questId) {
            alert("No quest ID provided.");
            return;
        }
        fetch(`http://127.0.0.1:5000/quest-parameters?quest_id=${questId}`)
            .then(response => response.json())
            .then(data => setQuest(data))
            .catch(error => console.error('Error fetching quest data:', error));
    }, [questId]);


    // Initialize or re-initialize the player animation
    useEffect(() => {
        const timer = setTimeout(() => {
            if (document.getElementById("playerCanvas")) {
                playerRef.current = initGamePlayerAnimation();
            }
        }, 100); // Short delay to ensure the canvas is ready
        return () => clearTimeout(timer);
    }, [currentQuestionIndex]); // Depend on currentQuestionIndex to re-trigger when it changes

    // Initialize or re-initialize the enemy animation
    useEffect(() => {
        const enemyTimer = setTimeout(() => {
            if (document.getElementById("enemyCanvas")) {
                enemyRef.current = initGameEnemyAnimation();
            }
        }, 100);
        return () => clearTimeout(enemyTimer);
    }, [currentQuestionIndex]); // Depend on currentQuestionIndex to re-trigger when it changes

    //win lose check
    useEffect(() => {
        if (playerHealth <= 0) {
            setGameOver(true);
        }
    }, [playerHealth]);

    useEffect(() => {
        if (dragonHealth <= 0) {
            setGameWin(true);
        }
    }, [dragonHealth]);
    
    

    const submitCode = (answer, language, questionIndex) => {
        if (!quest || !quest.questions[questionIndex]) {
            console.error("Question not found.");
            return;
        }
        const question = quest.questions[questionIndex];
        fetch("http://127.0.0.1:5000/check_answer", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question, answer, language })
        })
        .then(response => response.text())
        .then(text => {
            const gradeMatch = text.match(/Grade:\s*(\d+)/);
            const adviceMatch = text.match(/Advice:\s*(.+)/);
            const grade = gradeMatch ? parseInt(gradeMatch[1], 10) : null;
            const advice = adviceMatch ? adviceMatch[1] : "";

            setFeedbacks(prevFeedbacks => {
                const newFeedbacks = [...prevFeedbacks];
                newFeedbacks[questionIndex] = { grade, advice };
                return newFeedbacks;
            });

             // Trigger animations based on grade
            //  if (playerRef.current) {
            //     if (grade >= 7) {
            //         playerRef.current.changeAnimation("playerAttack1", 6); // Attack animation
            //     } else if (grade <= 5) {
            //         playerRef.current.changeAnimation("playerHurt", 5); // Hurt animation
            //     } else {
            //         playerRef.current.changeAnimation("playerIdle", 7); // Idle animation
            //     }
            // }

            // if (enemyRef.current) {
            //     if (grade >= 7) {
            //         enemyRef.current.changeAnimation("dragonHurt", 4); // Hurt animation
            //     } else if (grade <= 5) {
            //         enemyRef.current.changeAnimation("dragonAttack", 5); // Attack animation
            //     } else {
            //         enemyRef.current.changeAnimation("dragonIdle", 3); // Idle animation
            //     }
            // }
            
              // Health Logic
              const totalQuestions = quest.questions.length;

              if (grade >= 7) {
                  // Player attacks successfully
                  setDragonHealth((prev) => Math.max(prev - 100 / totalQuestions, 0)); // Ensure health does not go below 0
                  playerRef.current?.changeAnimation("playerAttack1", 6); // Attack animation
                  enemyRef.current?.changeAnimation("dragonHurt", 4); // Hurt animation
              } else if (grade <= 5) {
                  // Enemy attacks successfully
                  setPlayerHealth((prev) => Math.max(prev - 25, 0)); // Ensure health does not go below 0
                  playerRef.current?.changeAnimation("playerHurt", 5); // Hurt animation
                  enemyRef.current?.changeAnimation("dragonAttack", 5); // Attack animation
              } else {
                  // Neutral animations
                  playerRef.current?.changeAnimation("playerIdle", 7);
                  enemyRef.current?.changeAnimation("dragonIdle", 3);
              }

            setShowContinueButton(grade >= 5 && questionIndex === currentQuestionIndex);
        })
        .catch(error => console.error('Error submitting code:', error));
    };

    const handleNextQuestion = () => {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        setShowContinueButton(false);
    };

    const handleAutoSubmit = () => {
        const question = quest.questions[currentQuestionIndex];
        if (question) {
            submitCode("", "auto", currentQuestionIndex); // Auto-submit with empty answer and "auto" as language
            // setPlayerHealth((prev) => Math.max(prev - 25, 0)); 
        }
    };

    if (!quest) {
        return <div>Loading quest...</div>;
    }

    if (gameWin) {
        return (
            <div className="win-screen">
                <h1>You Win!</h1>
            </div>
        );
    }

    if (gameOver) {
        return (
            <div className="lose-screen">
                <h1>You Lose!</h1>
            </div>
        );
    }

    
    return (
        <div className="quest-main-page">
            <div className="content-section">
                {currentQuestionIndex < quest.questions.length && (
                    <div key={currentQuestionIndex} className="question-item">
                        <div className="question-display">
                            <p><strong>Question:</strong> {quest.questions[currentQuestionIndex]}</p>
                        </div>
                        <div className="game-screen-container" style={{ backgroundImage: `url(${getBackgroundStyle()})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                            <div id="game-container">
                                {/* Hidden images for animation frames */}
                                <img src={knightAttack1} alt="Player Attack 1" style={{ display: "none" }} id="playerAttack1" />
                                <img src={knightDeath} alt="Player Death" style={{ display: "none" }} id="playerDeath" />
                                <img src={knightHurt} alt="Player Hurt" style={{ display: "none" }} id="playerHurt" />
                                <img src={knightIdle} alt="Player Idle" style={{ display: "none" }} id="playerIdle" />
                                <img src={dragonAttack} alt="Dragon Attack SS" id="dragonAttack" style={{display: "none"}} />
                                <img src={dragonIdle} alt="Dragon Idle SS" id="dragonIdle" style={{display: "none"}} />
                                <img src={dragonHurt} alt="Dragon Hurt SS" id="dragonHurt" style={{display: "none"}} />
                                <img src={dragonDeath} alt="Dragon Death SS" id="dragonDeath" style={{display: "none"}} />
                                <img src={dragonWalk} alt="Dragon Walk SS" id="dragonWalk" style={{display: "none"}} />

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

                                {/* Enemy Section */}
                                <div className="enemy-section">
                                    <div className="health-bar-container">
                                        <div className="health-bar">
                                            <div
                                                className="health-bar-inner"
                                                style={{ width: `${dragonHealth}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                    <canvas id="enemyCanvas" width="500" height="500"></canvas>
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
            </div>
            <div className="right-container">
                <div className="timer-container">
                    <Timer TIME={getTimerLength()} onTimeout={handleAutoSubmit} />
                </div>
                <div className="code-editor-container">
                    <CodeEditor onCodeSubmit={(code, language) => submitCode(code, language, currentQuestionIndex)} />
                 </div>
            </div>
        </div>
    );
}

export default QuestMainPage;
