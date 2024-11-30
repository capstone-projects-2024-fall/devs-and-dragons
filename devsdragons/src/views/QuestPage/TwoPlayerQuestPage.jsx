import React, {useState, useEffect} from 'react';
import {io} from 'socket.io-client';
import { useLocation } from 'react-router-dom'
import CodeEditor from '../Editor/CodeEditor';

//connect to the backend server
const socket = io('http://10.108.34.229:29000')

function TwoPlayerQuestPage() {
    const location = useLocation();
    const {roomCode, isRoomCreator } = location.state || {};

    console.log("this is the roomCode:", roomCode)

    
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [sharedCode, setSharedCode] = useState("");
    const [language, setLanguage] = useState("javascript");

    // set up the socket listeners
    useEffect(() => {
        if(!roomCode) return;

        
        socket.on("receive_message", (data) => {
            setMessages((prev) => [...prev, `${data.username}: ${data.message}`]);
        });

        // handle shared code updates
        socket.on('code_update', (data) => {
            setSharedCode(data.code);
        });

        // handle language updates
        socket.on('language_update', (data) => {
            setLanguage(data.language);
        });

        // notify the server about room join

        socket.emit('join_room', {
            username: localStorage.getItem('email') || 'player1',
            room: roomCode
        });
        socket.emit('join_room', {room: roomCode});

        // cleaning any event listerners when the component unmounts
        return () => {
            socket.off('receive_message');
            socket.off('code_update');
            socket.off('language_update');
        }
    }, [roomCode]);


    const sendMessage = () => {
        if (newMessage.trim()) {
            socket.emit('send_message', { room: roomCode, message: newMessage, username: localStorage.getItem('email') || 'player1'}); // Send the message to the server
            setNewMessage(""); // Clear the input field
        }
    };

    const handleEditorChange = (value, type) => {
        if (type === 'code') {
            setSharedCode(value); // Update the shared code locally
            socket.emit('code_update', { room: roomCode, code: value }); // Broadcast the code update to other players
        } else if (type === 'language') {
            setLanguage(value); // Update the language locally
            socket.emit('language_update', { room: roomCode, language: value }); // Broadcast the language update to other players
        }
    };

    return (
        <div>
            <h1> Two Player Quest</h1>
            {/* for the chat session */}
            <div>
                <h2> Work with your peers to solve the problem </h2>
                <div style={{ border: '1px solid black', padding: '10px', height: '200px', overflowY: 'scroll' }}>
                    {messages.map((msg, index) => (
                        <p key={index}>{msg}</p> // Display each chat message
                    ))}
                </div>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message"
                />
                <button onClick={sendMessage}>Send</button> {/* Button to send a chat message */}
            </div>
            {/* Shared code space  */}
            <div>
            <h2>Shared Code Editor</h2>
                <CodeEditor
                    code={sharedCode} // Shared code between players
                    language={language}
                    onChange={handleEditorChange}
                    onCodeSubmit={(code, lang) => {
                      console.log('Code submitted:', code, 'Language:', lang);
                    }}
                />
            </div>
        </div>
    
    );
}

export default TwoPlayerQuestPage;