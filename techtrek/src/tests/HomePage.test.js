import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from '../Components/HomePage/HomePage.jsx';

afterEach(cleanup); // ensures proper teardown after each test -- otherwise we are running tests with added values from previous tests

describe('HomePage Component', () => {

    // Testing opening the menu options for the Quest button
    test("Renders the 'Quests' button and opens the menu", () => {
        render(
            <MemoryRouter>
                <HomePage />
            </MemoryRouter>
        );

        // Find the Quests button and simulate a click
        const questsButton = screen.getByRole('button', { name: /quests/i });
        fireEvent.click(questsButton);

        //Check if the menu options render for the user
        const myQuestsOption = screen.getByText(/my quests/i);
        const createQuestOption = screen.getByText(/create quest/i);

        expect(myQuestsOption).toBeInTheDocument();
        expect(createQuestOption).toBeInTheDocument();
    });

});


// References:
// https://stackoverflow.com/questions/74934446/how-to-write-unit-test-for-button-component-title-using-material-ui-in-react
// https://jskim1991.medium.com/react-dont-give-up-on-testing-when-using-material-ui-with-react-ff737969eec7

// Developer Notes:
// For tesing that the use is navigated to the correct route I got an error because I was using getAllByRole and that was returning an array
// This is because the Menu has multiple options, and so I figured out that I had to use getByRole instead to select a specific option