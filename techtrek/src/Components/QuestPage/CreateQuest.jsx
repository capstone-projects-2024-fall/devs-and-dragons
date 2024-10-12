import React, { useState } from 'react';
import { Container, InputLabel, MenuItem, Select, TextField } from '@mui/material';

const CreateQuest = () => {

    // State to store the selected topic
    const [questData, setQuestData] = useState ({
        topic: '',
        number_of_problems: '',
        difficulty: '',
        enemey: '',
        background: '',
    });

    const handleChange = (event) => {
        const { name, value} = event.target;
        setQuestData((prevQuestData) => ({
            ...prevQuestData,
            [name]: value,
        }));
    };

    return (
        <Container sx={{ padding: 5 }}>

            {/* Quest Title Input */}
            <TextField id="outlined-quest-title" label="Quest Title" variant="outlined" fullWidth sx={{ marginBottom: 2}}/>

             {/* Topic Selection */}
            <InputLabel id="topic-select-label">Topic</InputLabel>
            <Select
                labelId="topic-select-label"
                id="topic-select"
                name="topic" 
                value={questData.topic}
                label="Topic"
                onChange={handleChange}
                sx = {{ width: '100%' }}
            >
                <MenuItem value ={'Arrays'}>Arrays</MenuItem>
                <MenuItem value ={'For_Loops'}>For Loops</MenuItem>
                <MenuItem value ={'Linked_List'}>Linked Lists</MenuItem>
                <MenuItem value ={'Hashmaps'}>Hashmaps</MenuItem>
                <MenuItem value ={'BFS'}>BFS</MenuItem>
            </Select>

            {/* Number of Problems Selection */}
            <InputLabel id="problems-select-label">Number of Problems</InputLabel>
            <Select
                labelId="problems-select-label"
                id="problems-select"
                name="number_of_problems"
                value={questData.number_of_problems}
                label="Number of Problems"
                onChange={handleChange}
                sx = {{ width: '100%' }}
            >
                <MenuItem value ={1}>One</MenuItem>
                <MenuItem value ={2}>Two</MenuItem>
                <MenuItem value ={3}>Three</MenuItem>
                <MenuItem value ={4}>Four</MenuItem>
                <MenuItem value ={5}>Five</MenuItem>
            </Select>

            {/* Difficulty Selection */}
            <InputLabel id="difficulty-select-label">Difficulty</InputLabel>
            <Select
                labelId="difficulty-select-label"
                id="difficulty-select"
                name="difficulty"
                value={questData.difficulty}
                label="Difficulty"
                onChange={handleChange}
                sx = {{ width: '100%' }}
            >
                <MenuItem value ={"Easy"}>Easy</MenuItem>
                <MenuItem value ={"Medium"}>Medium</MenuItem>
                <MenuItem value ={"Hard"}>Hard</MenuItem>
            </Select>

            {/* Enemy Selection */}
            <InputLabel id="enemy-select-label">Enemy</InputLabel>
            <Select
                labelId="enemy-select-label"
                id="enemy-select"
                name="enemy"
                value={questData.enemy}
                label="Enemy"
                onChange={handleChange}
                sx = {{ width: '100%' }}
            >
                <MenuItem value ={"Bad Guy Knight"}>Bad Guy Knight</MenuItem>
                <MenuItem value ={"Skeletons"}>Skeletons</MenuItem>
                <MenuItem value ={"Goblins"}>Goblins</MenuItem>
            </Select>

            {/* Background Selection */}
            <InputLabel id="background-select-label">Number of Problems</InputLabel>
            <Select
                labelId="background-select-label"
                id="background-select"
                name="background"
                value={questData.background}
                label="Number of Problems"
                onChange={handleChange}
                sx = {{ width: '100%' }}
            >
                <MenuItem value ={"CodeVille"}>CodeVille</MenuItem>
                <MenuItem value ={"Dungeon"}>Dungeon</MenuItem>
                <MenuItem value ={"Haunted Woods"}>Haunted Woods</MenuItem>
            </Select>

        </Container>
    );
};

export default CreateQuest;