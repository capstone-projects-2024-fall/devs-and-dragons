import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CodeEditor from '../Editor/CodeEditor';
import Timer from '../../components/Timer/timer';
import "./QuestMainPage.css";
import forestImage from './Forest.png'; 
import desertImage from './Desert.png';
import riverImage from './RiverCrossing.png';
import castleImage from './CastleRuins.png';

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
                return "00:05:00";
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
            const gradeMatch = text.match(/Grade:\\s*(\\d+)/);
            const adviceMatch = text.match(/Advice:\\s*(.+)/);
            const grade = gradeMatch ? parseInt(gradeMatch[1], 10) : null;
            const advice = adviceMatch ? adviceMatch[1] : "";
            setFeedbacks(prevFeedbacks => {
                const newFeedbacks = [...prevFeedbacks];
                newFeedbacks[questionIndex] = { grade, advice };
                return newFeedbacks;
            });

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
        }
    };

    if (!quest) {
        return <div>Loading quest...</div>;
    }

    return (
        <div className="quest-main-page">
            <div className="content-section">
                {currentQuestionIndex < quest.questions.length && (
                    <div key={currentQuestionIndex} className="question-item">
                        <p><strong>Question:</strong> {quest.questions[currentQuestionIndex]}</p>
                        <div className="game-screen-container" style={{ backgroundImage: `url(${getBackgroundStyle()})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                            <p>GAME SCREEN</p>
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
