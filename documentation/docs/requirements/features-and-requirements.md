---
sidebar_position: 4
---

# Features and Requirements

## Functional Requirements (sourced from Use Cases)

[//]: # (Use case 1 functional requirements, Create Account)

* Users must be able to create accounts.

[//]: # (Use case 2 functional requirements, Log In)

* Users must be able to log into created accounts.

[//]: # (Use case 3 functional requirements, Avatar)

* Users must be able to create and customize an Avatar.

[//]: # (Use case 4 functional requirements)
* Users must be able to create quests through filling out a form that takes in:
  * Quest Title
  * Coding Topic
  * Amount of Problems (3 - 8)
  * Difficulty Level
  * Enemy 
  * Background
  * Programming Language
  * Quest Description

* Users must be able to create parties/rooms of two to four to start a quest.
* Users must be able to join parties/rooms.
* Users can add other users.
  * User can search for another's username and click "Add Friend".
* Users can create guilds to host multiple guild parties and assign multiple quests.
* Users can play and finish a quest (game).
* Users can take turns answering a question/problem within a quest (game).
* Game must include a timer for each party member.
* Game must be able to generate coding problems based on topic and difficulty chosen.
* Game must be able grade answers based on correct and incorrect user(s) input.
* Users can opt out or leave a started quest.
* Users must be able to log out.
* A user must be able to play a quest in single player (by themself).
* Users must able to play a quest together (multiplayer; two player).
* Users should see a quest results at the end of each quest (either victory or defeat).
* Users must be able to toggle dark mode or light mode during ongoing quests (depending on their preference).
* Users must able to view, access, and modifiy a code editor component to submit their answers.
* Dragon sprite should be able to:
  * Take damage (its health bar decreasing).
  * Animate whenever an action is being performed (taking or inflicting damage, idle, etc.)
* User(s) sprite should be able to:
  * Take damage (its health bar decreasing).
  * Animate whenever an action is being performed (taking or inflicting damage, idle, etc.)
* All user data must be stored in MongoDB.
* Chosen background from the quest form must display during the ongoing quest.
* User(s) should be able to move on to the next question after they submit a "valid" answer.
* Users must be able to see GPT's grading feedback during an ongoing quest, so they may know if they can continue onto the rest of the quest.
* GPT should not accept an irrelevant answer (such as blank answer, answer irrelavant to the question, answers that try to cheat).
* Game timer reaching 0 must produce a defeat result unless the dragon's/enemy's health bar reaches 0 by that time.
 

## Non-Functional Requirements
* Application must be able to support multiple users via websockets.
* The backend must generate questions based on the topic the user selected.
* The backend must generate a storyline for the quest based on the quest form filled out by the user.
* The game must sequence through each question utilizing the storyline generated.
* GPT reponses time during grading must be within 1 to 5 seconds.
* Automated daily backups must be performed.

