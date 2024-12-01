import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CodeEditor from '../Editor/CodeEditor';
import "./QuestMainPage.css";

// Component to display a star rating based on the numerical grade
function StarRating({ grade }) {
    const totalStars = 5;
    const filledStars = Math.round(grade / 2);  // Calculate filled stars as half of the grade
    return (
        <div className="star-rating">
            {[...Array(totalStars)].map((_, index) => (
                <span key={index} style={{ color: index < filledStars ? 'yellow' : 'gray' }}>★</span>
            ))}
        </div>
    );
}

function QuestMainPage() {
    const [quest, setQuest] = useState(null); // State to store the current quest data
    const [feedbacks, setFeedbacks] = useState([]); // State to store feedback for each question
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // State to track the current question index
    const [showContinueButton, setShowContinueButton] = useState(false); // State to control the display of the "Continue" button

    const location = useLocation();
    const questId = new URLSearchParams(location.search).get("quest_id"); // Extract quest_id from URL parameters

    // Fetch quest details from the server when the component mounts or the questId changes
    useEffect(() => {
        if (!questId) {
            alert("No quest ID provided."); // Alert the user if no quest ID is in the URL
            return;
        }
        fetch(`http://127.0.0.1:5000/quest-parameters?quest_id=${questId}`)
            .then(response => response.json())
            .then(data => setQuest(data))
            .catch(error => console.error('Error fetching quest data:', error));
    }, [questId]);

    // Function to handle the submission of code
    const submitCode = (answer, language, questionIndex) => {
        if (!quest || !quest.questions[questionIndex]) {
            console.error("Question not found."); // Log error if the question isn't found
            return;
        }
        const question = quest.questions[questionIndex];
        fetch("http://127.0.0.1:5000/check_answer", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ question, answer, language }) // Send the question, answer, and language to the server
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

            setShowContinueButton(grade >= 5 && questionIndex === currentQuestionIndex); // Show continue button if correct
        })
        .catch(error => console.error('Error submitting code:', error));
    };

    // Function to advance to the next question
    const handleNextQuestion = () => {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        setShowContinueButton(false); // Hide the "Continue" button
    };

    if (!quest) {
        return <div>Loading quest...</div>; // Display loading message if quest data isn't available yet
    }

    return (
        <div className="quest-main-page">
            <div className="content-section">
                {/* <h1>{quest.questTitle}</h1>
                <p><strong>Description:</strong> {quest.description}</p>
                <p><strong>Background:</strong> {quest.background}</p> */}
                {currentQuestionIndex < quest.questions.length && (
                    <div key={currentQuestionIndex} className="question-item">
                        <p><strong>Question:</strong> {quest.questions[currentQuestionIndex]}</p>
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
            <div className="code-editor-container">
                <CodeEditor onCodeSubmit={(code, language) => submitCode(code, language, currentQuestionIndex)} />
            </div>
        </div>
    );
}

export default QuestMainPage;
