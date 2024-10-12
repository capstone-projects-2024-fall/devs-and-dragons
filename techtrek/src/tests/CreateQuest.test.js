import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CreateQuest from '../Components/QuestPage/CreateQuest.jsx'; 

// we are testing user input in quest form for all input fields
describe('CreateQuest Component', () => {

    //Quest Title Input Test
    test('allows user to enter a quest title', () => {
        render(<CreateQuest />);
        const titleInput = screen.getByLabelText(/quest title/i);
    
        fireEvent.change(titleInput, { target: { value: 'My First Quest'} });
    
        expect(titleInput.value).toBe('My First Quest');
    });

     // Topic Selection Test
     test('allows user to select a topic', () => {
        render(<CreateQuest />);

        // Find the topic selection
        const topicSelect = screen.getByLabelText(/topic/i);

        // Simulate clicking to open dropdown
        fireEvent.mouseDown(topicSelect);

        // Simulate the selection of 'Arrays' option
        const arraysOption = screen.getByText('Arrays');
        fireEvent.click(arraysOption);

        // Check if the value was updated correctly
        expect(topicSelect).toHaveTextContent('Arrays');
    });

    // Number of Problems Selection Test
    test('allows user to select the number of problems', () => {
        render(<CreateQuest />);

        // Find the number of problems selection
        const problemsSelect = screen.getByLabelText(/number of problems/i);

        // Simulate clicking to open dropdown
        fireEvent.mouseDown(problemsSelect);

        // Simulate the selection of '3' option
        const threeOption = screen.getByText('Three');
        fireEvent.click(threeOption);

        // Check if the value was updated correctly
        expect(problemsSelect).toHaveTextContent('Three');
    });

    // Difficulty Selection Test
    test('allows user to select a difficulty', () => {
        render(<CreateQuest />);

        // Find the difficulty selection
        const difficultySelect = screen.getByLabelText(/difficulty/i);

        // Simulate clicking to open dropdown
        fireEvent.mouseDown(difficultySelect);

        // Simulate the selection of 'Hard' option
        const hardOption = screen.getByText('Hard');
        fireEvent.click(hardOption);

        // Check if the value was updated correctly
        expect(difficultySelect).toHaveTextContent('Hard');
    });

    // Enemy Selection Test
    test('allows user to select an enemy', () => {
        render(<CreateQuest />);

        // Find the enemy selection
        const enemySelect = screen.getByLabelText(/enemy/i);

        // Simulate clicking to open dropdown
        fireEvent.mouseDown(enemySelect);

        // Simulate the selection of 'Goblins' option
        const goblinsOption = screen.getByText('Goblins');
        fireEvent.click(goblinsOption);

        // Check if the value was updated correctly
        expect(enemySelect).toHaveTextContent('Goblins');
    });


    // Background Selection Test
    test('allows user to select a background', () => {
        render(<CreateQuest />);

        // Find the background seleciton
        const backgroundSelect = screen.getByLabelText(/background/i);

        // Simulate clicking to open dropdown
        fireEvent.mouseDown(backgroundSelect);

        // Simulate the selection of 'Dungeon' option
        const dungeonOption = screen.getByText('Dungeon');
        fireEvent.click(dungeonOption);

        // Check if the value was updated correctly
        expect(backgroundSelect).toHaveTextContent('Dungeon');
    });
});

// References:
// https://stackoverflow.com/questions/55184037/react-testing-library-on-change-for-material-ui-select-component
// https://jskim1991.medium.com/react-dont-give-up-on-testing-when-using-material-ui-with-react-ff737969eec7

