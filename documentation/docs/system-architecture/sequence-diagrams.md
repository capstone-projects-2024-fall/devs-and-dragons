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

## Use Case 5 - Starting a Quest
**A user wants to start a quest they made.**
```mermaid
sequenceDiagram
    actor User
    participant HomePage
    participant QuestsTab
    participant DropdownMenu
    participant QuestDisplay
    participant Database
    participant Backend
    participant Game
    User->>HomePage: Navigates to home page
    activate User
    activate HomePage
    HomePage-->>User: Displays home screen with "Quests" button
    HomePage->>QuestsTab: User selects "Quests" tab
    deactivate HomePage
    
    activate QuestsTab
    QuestsTab->>DropdownMenu: Opens dropdown menu
    activate DropdownMenu
    deactivate QuestsTab
    DropdownMenu->>User: Displays "My Quests" option
    User->>DropdownMenu: Selects "My Quests"
    DropdownMenu->>QuestDisplay: Displays list of user-created quests
    deactivate DropdownMenu
    activate QuestDisplay
    QuestDisplay-->>User: User views quests
    User->>QuestDisplay: Selects a quest to start
    QuestDisplay->>Backend: Sends selected quest to backend for initiation
    deactivate QuestDisplay
    activate Backend
    Backend->>Database: Updates quest status to active
    activate Database
    Database-->>Backend: Confirms quest start
    deactivate Database
    Backend-->>Game: Initial game component
    activate Game
    deactivate Backend
    Game-->>User: Displays game window as quests begins
    deactivate User
    deactivate Game
```

1. From the homepage, the user selects "Quests" tab.
2. The user selects the dropdown menu option, "My Quests."
3. The quests the user made are displayed, the user selects the quests interested in starting.
4. The user selects "Start Quest" button.

## Use Case 6 - Playing a Quest Solo
**Two users want to solve a coding problem together during a quest.**

```mermaid
sequenceDiagram
    actor User
    participant Game
    participant Timer
    participant CodeEditor as Editor
    participant GPTBot
    participant Backend
    User->>Game: Starts quest
    activate User
    activate Game
    Game->>User: Prompt with coding question
    Game-->>User: Displays quest briefing with story
    Game->>Timer: Starts countdown
    activate Timer
    loop Timer countdown
        Timer-->>Game: Timer ticks down
        alt Timer reaches 0
            Game->>User: Display user health bar decreaseing
            Timer->>Game: Reset timer or end game if player health is 0
        end
    end
    deactivate Timer
    
    User->>Editor: Writes code
    activate Editor
    User->>Editor: Clicks "Submit" button
    Editor->>Backend: Sends code for analysis
    deactivate Editor
    activate Backend
    Backend->>GPTBot: Analyzes submission
    activate GPTBot
    GPTBot-->>Backend: Provides feedback with rating (1-3)
    deactivate GPTBot
    Backend-->>Game: Sends feedback and rating
    deactivate Backend
    Game->>User: Displays feedback
    alt Rating 1
        Game->>User: Decreases user's health, prompts retry
    else Rating 2
        Game->>User: Provides tips, offers choice to retry or continue
    else Rating 3
        Game->>User: User successfully attacks, moves to next question
    end
    deactivate Game
    deactivate User
```

1. The quest begins by displaying the quest briefing to the user, providing a story for the user.
2. The game screen is now displayed to the user where they can see:
   - User's avatar
   - User's health bar
   - Enemy
   - Enemy's health bar
   - Timer
   - Code Editor
3. The user is prompted with a question.
4. The timer begins to tick down.
   - If the user does not submit an answer before the timer reaches 0, then the user's health bar decreases.
5. The user writes code in the provided code editor.
6. The user clicks the "Submit" button.
7. The GPT-bot analyzes the user's submission and provides feedback with a rating from 1 to 3.
8. Based on the GPT-bot’s rating:
   - **Feedback is provided to the user**:
     - If the rating is 1, the user’s health bar decreases, and the quest continues with the timer reset for a new attempt.
     - If the rating is 2, the user receives tips on improving their solution and chooses to try again or continue.
     - If the rating is 3, the user successfully damages the enemy, the enemy’s health bar decreases, and the user proceeds to the next question if available.
9. The user continues to engage with the quest until all questions are answered, the user quits, or the user’s health bar reaches zero.

## Use Case 7 - Creating a Party to Start a Quest
**A user wants to start a quest outside of a guild.**
```mermaid
sequenceDiagram
    actor User as User 1
    actor Peer as User 2
    participant HomePage
    participant QuestTab
    participant Backend
    participant Database as MongoDB
    User->>HomePage: Navigates to home page
    activate User
    activate HomePage
    HomePage-->>User: Displays home page
    deactivate HomePage
    User->>QuestTab: Selects "Quests" tab
    activate QuestTab
    QuestTab-->>User: Displays "My Quests"
    User->>QuestTab: Selects "My Quests"
    QuestTab-->>User: Displays available quests
    User->>QuestTab: Selects the quest to start
    QuestTab-->>User: Displays "Start Quest" button
    User->>QuestTab: Selects "Start Quest" button
    QuestTab-->>User: Asks to create a party code
    User->QuestTab: Creates party code
     QuestTab->>Backend: Sends party code
    deactivate QuestTab
    activate Backend
    Backend->>Database: Stores party code
    activate Database
    deactivate Database
    deactivate Backend
    User->>Peer: Shares party code with peer(s)
    activate Peer
    Peer->>Backend: Joins party using code
    activate Backend
    Backend->>Database: Updates party members count
    activate Database
    Database-->>Backend: Party size updated
    deactivate Database
    Backend-->>User: Displays party size
    deactivate Backend
    User->>QuestTab: Selects "Start Quest" button when party is 2-4 members
    activate QuestTab
    QuestTab->>Backend: Starts the quest
     deactivate QuestTab
    activate Backend
    Backend->>Database: Updates quest status
    activate Database
    Database-->>Backend: Quest Started set to true
    deactivate Database
    Backend-->>User: Quest has started
    deactivate User
    Backend-->>Peer: Quest has started
    deactivate Peer
    deactivate Backend
```
1. From the homepage, the user selects the “Quests” tab.
2. The user selects “My Quests”.
3. The user selects the quest they want to do.
4. The user selects the “Start Quest” button.
5. The user creates a party code and shares it with their peer(s).
6. The user waits for party size to be at two to four members, then clicks the “Start Quest” button.

## Use Case 8 - Join a Party
**A user wants to join another user’s party.**
```mermaid
sequenceDiagram
    actor User
    participant HomePage
    participant JoinPartyForm
    participant Backend
    participant Database as MongoDB
    User->>HomePage: Navigates to home page
    activate User
    activate HomePage
    HomePage-->>User: Displays home page with "Join Party" button
    HomePage->>JoinPartyForm: Clicks "Join Party" button
    deactivate HomePage
    activate JoinPartyForm
    JoinPartyForm-->>User: Displays form to enter party code
    JoinPartyForm-->>User: Displays "join" button
    User->>JoinPartyForm: Enters party code
    User->>JoinPartyForm: Selects "Join" button
    JoinPartyForm->>Backend: Sends party code to backend
    activate Backend
    Backend->>Database: Validates party code and updates party members
    activate Database
    Database-->>Backend: Party code valid, member added
    deactivate Database
    Backend-->>JoinPartyForm: Confirms successful party join
    deactivate Backend
    JoinPartyForm-->>User: Displays confirmation of joining the party
    deactivate User
    deactivate JoinPartyForm
```
1. From the home page, the user clicks on the “Join Party” button.
2. The user enters the party code.
3. The user selects the “Join” button.

## Use Case 9 - Playing a Quest with a Party
**Two users want to solve a coding problem together during a quest.**

```mermaid
sequenceDiagram
    actor User1 as User 1
    actor User2 as User 2
    participant Game
    participant Timer
    participant CodeEditor as Editor
    participant GPTBot
    participant Backend

    User1->>Game: Starts quest
    activate User1
    activate Game
    Game->>User1: Prompt with coding question
    Game-->>User1: Displays quest briefing with story
    Game->>Timer: Starts countdown
    activate Timer
    loop Timer countdown
        Timer-->>Game: Timer ticks down
        alt Timer reaches 0
            Game->>User1: Display user health bar decrease
            Timer->>Game: Reset timer or end game if player health is 0
        end
    end
    deactivate Timer
    
    User1->>Editor: Writes code
    activate Editor
    User1->>Editor: Clicks "Submit" button
    User2->>Editor: Adds to code
    activate User2
    User2->>Editor: Clicks "Submit" button
    deactivate User2
    Editor->>Backend: Sends code for analysis
    deactivate Editor
    activate Backend
    Backend->>GPTBot: Analyzes submission
    activate GPTBot
    GPTBot-->>Backend: Provides feedback with rating (1-3)
    deactivate GPTBot
    Backend-->>Game: Sends feedback and rating
    deactivate Backend
    Game->>User1: Displays feedback
    alt Rating 1
        Game->>User1: Decreases user's health, prompts retry
    else Rating 2
        Game->>User1: Provides tips, offers choice to retry or continue
    else Rating 3
        Game->>User1: User successfully attacks, moves to next question
    end
    deactivate Game
    deactivate User1
```

1. The quest begins by displaying the quest briefing to the user, providing a story for the user.
2. The game screen is now displayed to the user where they can see:
   - User's avatar
   - User's health bar
   - Enemy
   - Enemy's health bar
   - Timer
   - Code Editor
3. The user is prompted with a question.
4. The timer begins to tick down.
   - If the user does not submit an answer before the timer reaches 0, then the user's health bar decreases.
5. The user writes code in the provided code editor.
6. The user clicks the "Submit" button.
7. The second user in the party adds onto the code editor to solve the problem if needed.
8. The second user clicks the "Submit" button.
9. The GPT-bot analyzes the user's submission and provides feedback with a rating from 1 to 3.
10. Based on the GPT-bot’s rating:
   - **Feedback is provided to the user**:
     - If the rating is 1, the user’s health bar decreases, and the quest continues with the timer reset for a new attempt.
     - If the rating is 2, the user receives tips on improving their solution and chooses to try again or continue.
     - If the rating is 3, the user successfully damages the enemy, the enemy’s health bar decreases, and the user proceeds to the next question if available.
11. The two users continue to engage with the quest until all questions are answered, the user quits, or the user’s health bar reaches zero.