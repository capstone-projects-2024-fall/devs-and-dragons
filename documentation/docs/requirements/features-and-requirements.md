---
sidebar_position: 4
---

# Features and Requirements

## Functional Requirements (sourced from Use Cases)

[//]: # (Use case 1 functional requirements, Create Account)

* Users must be able to create accounts.

* Users must be able to log into created accounts.

* Users must be able to create and customize an Avatar.

* Users must be able to create "singleplayer", "one player", or "solo" quests to play them by themselves.
* Users must be able to create "multiplayer", "two player", or "co-player" quests to play them with others.
* For single player and multiplayer quests: A user must be able to create quests through filling out a form that takes in:
  * Quest Title
  * Coding Topic
  * Amount of Problems (3 - 8)
  * Difficulty Level
  * Enemy 
  * Background
  * Programming Language
  * Quest Description
* If a multiplayer quest is made, then a room/party code must be generated so others can join party with the user who created the quest.
* Users must be able to join existing parties/rooms with the correct code.
* Users can create guilds to host multiple guild parties and assign multiple quests.
* Users can start, play, and finish a quest solo or with a party.
* For multiplayer quests, users must take turns answering a question/problem within a quest.
* Game must include a timer for each party member.
* Game must be able to generate coding problems based on topic and difficulty chosen.
* Chosen background from the quest form must display during the ongoing quest.
* Game must be able grade answers based on correct and incorrect user(s) input.
* Users can opt out or leave a started quest.


* Users must be able to toggle dark mode or light mode during ongoing quests (depending on their preference).
* Users must able to view, access, and modifiy a code editor component to submit their answers.
* Dragon sprite should be able to:
  * Take damage (its health bar decreasing).
  * Animate whenever an action is being performed (taking or inflicting damage, idle, etc.)
* User(s) sprite should be able to:
  * Take damage (its health bar decreasing).
  * Animate whenever an action is being performed (taking or inflicting damage, idle, etc.)

* Users should see a quest results at the end of each quest (either victory or defeat).



* Users must be able to see GPT's grading feedback during an ongoing quest, so they may know if they can continue onto the rest of the quest.
* GPT should not accept an irrelevant answer (such as blank answer, answer irrelavant to the question, answers that try to cheat).

* User(s) should be able to move on to the next question after they submit a "valid" answer.

* Game timer reaching 0 must produce a defeat result unless the dragon's/enemy's health bar reaches 0 by that time.

* Health bar of dragon reaching 0 must trigger a victory result.

* Users must be able to log out.

* All user data must be stored in and retreived from the MongoDB database using the Flask backend.
 

## Non-Functional Requirements
* Application must be able to support multiple users via websockets.
* The backend must generate questions based on the topic the user selected.
* The backend must generate a storyline for the quest based on the quest form filled out by the user.
* The game must sequence through each question utilizing the storyline generated.
* GPT reponses time during grading must be within 1 to 5 seconds.
* Automated daily backups must be performed.

