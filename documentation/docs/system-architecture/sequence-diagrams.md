---
sidebar_position: 3
---

# Sequence Diagrams

## Use Case 1 - Account Creation
**A user wants to create a new account.**

```mermaid
sequenceDiagram
    actor User
    participant DevsAndDragonsApp as LandingPage
    participant RegistrationForm
    participant Backend
    participant Database

    
    User->>DevsAndDragonsApp: Opens application for the first time
    activate User
    activate DevsAndDragonsApp
    DevsAndDragonsApp-->>User: Displays home screen with "Create Account" button
    DevsAndDragonsApp->>RegistrationForm: Selects "Create Account" button
    deactivate DevsAndDragonsApp

    
    activate RegistrationForm
    RegistrationForm-->>User: Displays account registration form
    User->>RegistrationForm: Fills out form (username, password, email)
    RegistrationForm->>Backend: Sends form data to backend
    deactivate RegistrationForm

    activate Backend
    Backend->>Database: Checks if username or email already exists
    activate Database
    Database-->>Backend: Returns validation result
    deactivate Database
    Backend-->>RegistrationForm: Returns success or error message
    deactivate Backend
    activate RegistrationForm
    RegistrationForm-->>User: Displays success message or prompts to try again (if fields are incorrect)
    deactivate RegistrationForm
    deactivate User
```

  1. The user opens the Devs & Dragons application for the first time.
  2. The user selects the ‘Create Account’ button to begin the account registration process.
  3. The user enters the desired username, password, and email into the form.
  4. If any fields are filled out incorrectly, the user is notified and asked to try again.

## Use Case 2 - Logging in
**A user wants to log in to an account they created**

```mermaid
sequenceDiagram
    actor User
    participant HomePage as LandingPage
    participant LoginForm
    participant Backend
    participant EmailService
    participant Database as MongoDB

    User->>HomePage: Navigates to landing page
    activate User
    activate HomePage
    HomePage-->>User: Displays home page
    HomePage->>LoginForm: Selects "Login" button
    deactivate HomePage

    activate LoginForm
    LoginForm-->>User: Displays login form
    User->>LoginForm: Enters username and password
    LoginForm->>Backend: Verifies credentials
    activate Backend
    Backend->>Database: Checks credentials
    activate Database
    Database-->>Backend: Credentials verified
    deactivate Database
    Backend->>EmailService: Request to send 2FA code
    activate EmailService
    EmailService-->>User: Sends email with 2FA code
    deactivate EmailService
    User->>LoginForm: Enters 2FA code
    LoginForm->>Backend: Verifies 2FA code
    Backend->Database: Confirms 2FA
    activate Database
    Database-->>Backend: 2FA code is valid
    deactivate Database
    Backend-->>LoginForm: 2FA verified
    deactivate Backend
    LoginForm-->>User: Redirects to home page
    deactivate LoginForm

    LoginForm-->>User: Sends 2FA code to email
    activate LoginForm
    LoginForm->>EmailService: Request to send 2FA code
    activate EmailService
    EmailService-->>User: Sends email with 2FA code
    deactivate EmailService
    deactivate LoginForm

    User->>LoginForm: Enters 2FA code
    activate LoginForm
    LoginForm->>Backend: Verifies 2FA code
    activate Backend
    Backend->>Database: Confirms 2FA
    activate Database
    Database-->>Backend: 2FA code is valid
    deactivate Database
    Backend-->>LoginForm: 2FA verified
    deactivate Backend
    LoginForm-->>User: Redirects to home page
    deactivate LoginForm
    deactivate User
```
1. The user navigates to the site's landing page
2. The user selects the ‘login’ button
3. The user enters their username and password
4. After providing the correct credentials, the user will receive a 2FA code in their email
5. The user enters the 2FA code
6. After providing the correct 2FA code, the user is brought to the home page

## Use Case 3 - Quest Creation
**A user wants to create a new quest.**

```mermaid
sequenceDiagram
    actor User
    participant HomePage
    participant QuestTab
    participant Backend
    participant GPTBot
    participant Database as MongoDB

    User->>HomePage: Navigates to home page
    activate User
    activate HomePage
    HomePage-->>User: Displays home page
    deactivate HomePage

    User->>QuestTab: Selects "Quests" tab
    activate QuestTab
    QuestTab-->>User: Displays "Create Quest" button
    User->>QuestTab: Selects "Create Quest" button
    QuestTab-->>User: Displays quest creation form
    User->>QuestTab: Fills out form 
    QuestTab-->>User: Displays review input option
    User->>QuestTab: Selects "Confirm" button
    QuestTab->>Backend: Sends form data to backend
    deactivate QuestTab

    activate Backend
    Backend->>GPTBot: Processes request to generate quest
    activate GPTBot
    GPTBot-->>Backend: Returns generated quest
    deactivate GPTBot

    Backend->>Database: Stores generated quest
    activate Database
    Database-->>Backend: Quest stored
    deactivate Database

    Backend-->>QuestTab: Displays the new quest line
    deactivate Backend
    activate QuestTab
    QuestTab-->>User: Displays the new quest line
    deactivate QuestTab
    deactivate User
```

1. From the home page, the user selects the “Quests” tab.
2. The user selects the “Create Quest” button.
3. The user fills out a form for the following:
   - Quest Title
   - Coding Topic
   - Amount of problems
   - Difficulty level
   - Enemy
   - Background
4. User reviews their input and selects the “Confirm” button.

## Use Case 4 - Create Avatar
**A user wants to create their Avatar.**
```mermaid
sequenceDiagram
    actor User
    participant HomePage
    participant AvatarTab
    participant AvatarSelection
    participant ColorScheme
    participant Backend
    participant Database

    User->>HomePage: Navigates to home page
    activate User
    activate HomePage
    HomePage-->>User: Displays home screen with "Avatar" button
    HomePage->>AvatarTab: Selects "Avatar" button
    deactivate HomePage

    activate AvatarTab
    AvatarTab-->>User: Displays "Create Avatar" button
    User->>AvatarTab: Selects "Create Avatar" button
    AvatarTab->>AvatarSelection: Opens avatar selection screen
    deactivate AvatarTab

    activate AvatarSelection
    AvatarSelection-->>User: Displays six avatar options
    User->>AvatarSelection: Chooses an avatar
    AvatarSelection->>ColorScheme: User proceeds to color scheme selection
    deactivate AvatarSelection

    activate ColorScheme
    ColorScheme-->>User: Displays color-scheme customization options
    User->>ColorScheme: Selects color-scheme
    ColorScheme->>Backend: Sends avatar and color-scheme details to backend
    deactivate ColorScheme

    activate Backend
    Backend->>Database: Stores avatar and color-scheme details
    activate Database
    Database-->>Backend: Confirms avatar update
    deactivate Database
    Backend-->>AvatarTab: Sends success message to avatar tab
    deactivate Backend

    activate AvatarTab
    AvatarTab-->>User: Displays success message and updated avatar preview
    deactivate AvatarTab
    deactivate User 
```
1. From the homepage, the user selects "Avatar" tab.
2. The user selects between six avatar options.
3. The user selects a color-scheme for the selected avatar.
4. User selects "Save Changes" button.

## Use Case 12 - Solving a Problem in a Quest (gameplay)
**Two users want to solve a coding problem together during a quest.**

```mermaid
sequenceDiagram
    actor User1
    actor User2 
    participant GPTBot
    participant GameEngine as Game
    participant Backend
    participant Database as MongoDB

    activate User1
    activate User2
    activate Backend
    Backend->>GameEngine: Provides first problem
    activate GameEngine
    GameEngine-->>User1: Displays coding problem
    GameEngine-->>User2: Displays coding problem
    User1->>GameEngine: Presses "Begin" button
    
    GameEngine->>Backend: Starts timer
    Backend-->>GameEngine: Timer Ticks Down
    GameEngine-->>User1: Display Timer Tick Down
    GameEngine-->>User2: Display Timer Tick Down
    User1->>GameEngine: Writes code in text box
    User1->>GameEngine: Clicks "Submit" button
    GameEngine->>Backend: Receives code and ends User1's turn
    Backend->>Database: Stores User1's code submission
    activate Database
    deactivate Database
    GameEngine-->>User1: Displays current code entered
    GameEngine-->>User2: Displays current code entered
    GameEngine->Backend: Reset Timer for User 2
    GameEngine-->>User2: Display their turn starts now
    GameEngine->Backend: Start Timer
    Backend-->GameEngine: Timer Ticks Down
    GameEngine-->>User2: Display Time Tick Down
    GameEngine-->>User1: Display Time Tick Down
    User2->>GameEngine: Writes code in text box
    User2->>GameEngine: Clicks "Submit" button
    
    GameEngine->>Backend: Receives code and ends User2's turn
    
    Backend->>Database: Stores User2's code submission
    activate Database
    deactivate Database
    GameEngine-->>User1: Displays current code entered
    GameEngine-->>User2: Displays current code entered
    deactivate GameEngine
    Backend->>GPTBot: Sends final submission for analysis
    activate GPTBot
    GPTBot-->>Backend: Rates solution (1-3)
    deactivate GPTBot
    Backend-->>User1: Displays party's rating
    Backend-->>User2: Displays party's rating
    deactivate Backend
    deactivate User1
    deactivate User2
    alt Solution is incorrect
        activate User1
        Backend->>GameEngine: Party loses health
        activate GameEngine
        activate Backend
        GameEngine->>Backend: Resets timer for next turn
        deactivate GameEngine
        Backend-->>User1: User 1 goes again for another turn
        deactivate Backend
        deactivate User1
       
    end
```

1. The users are given their first problem.
2. User 1 is randomly selected and when the party is done reading the problem, user 1 presses the “Begin” button.
3. The timer begins and user 1 starts to write code in the provided text box.
4. User 1 clicks the “Submit” button.
5. User 1’s turn is done and the timer restarts.
6. The timer begins as it is now user 2's turn to write code in the provided text box.
7. User 2 clicks the “Submit” button.
8. GPT-bot analyzes the final submission and rates the party’s solution from 1 to 3.
9. If the final submission is incorrect, the party loses health, the timer resets, and user 1 starts a new turn.
