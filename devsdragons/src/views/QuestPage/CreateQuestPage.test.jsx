import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import CreateQuestsPage from './CreateQuests'; 
import { QuestContext } from './QuestContext';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter

describe('CreateQuestsPage', () => {
    it('allows the user to input a quest title', () => {
        // Mock `addQuest` function
        const mockAddQuest = vi.fn();

        // Wrap the component with QuestContext.Provider and MemoryRouter
        render(
            <QuestContext.Provider value={{ addQuest: mockAddQuest }}>
                <MemoryRouter>
                    <CreateQuestsPage />
                </MemoryRouter>
            </QuestContext.Provider>
        );

        // Find the input field for the quest title
        const questTitleInput = screen.getByPlaceholderText('Enter quest title');

        // Simulate user typing a quest title
        fireEvent.change(questTitleInput, { target: { value: 'My First Quest' } });

        // Assert that the input field displays the typed value
        expect(questTitleInput.value).toBe('My First Quest');
    });
});
