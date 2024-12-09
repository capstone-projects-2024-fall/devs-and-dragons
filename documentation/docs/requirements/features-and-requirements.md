---
sidebar_position: 4
---

# Features and Requirements

## Functional Requirements (sourced from Use Cases)

[//]: # (Use case 1 functional requirements, Create Account)

* Users must be able to create accounts.

* Users must be able to log into created accounts.

* Users must be able to create and customize an Avatar for themselves.

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
* If a multiplayer quest is made, then a room/party code must be generated. The code is needed so others can form/join a party with the original user (who created the quest).
* Users must be able to join existing parties/rooms with the correct code.
* Users can create guilds to host multiple guild parties and assign multiple quests.
* Users can start, play, and finish a quest solo or with a party.
* For multiplayer quests, users must take turns answering a question/problem within a quest.


* The quest/game component must be loaded and presented on a 2D plane filling the entire screen.

* The quest/game component must include a timer for each party member.

* The quest/game component must be able to generate coding problems based on the topic and the difficulty selected in the quest form.

* The quest/game component must display the selected background in the quest form.

* Users can opt out or leave a started quest.


* Users must able to view, access, and modifiy a code editor component to submit their answers.

* Users must be able to toggle dark mode or light mode on the code editor during ongoing quests (depending on their preference).

* The dragon sprite, representing the enemy, should be able to:
  * Take damage (its health bar decreasing).
  * Animate whenever an action is being performed (taking or inflicting damage, idle, etc.)

* The user sprite, representing the user, should be able to:

  * Take damage (its health bar decreasing).

  * Animate whenever an action is being performed (taking or inflicting damage, idle, etc.).


* The GPT component of the game must be able to grade answers based on correct and incorrect user(s) input:
  
  * Users must be able to see GPT's grading feedback during an ongoing quest, so they may know if they can continue to the next question.

  * GPT must not mark an incorrect answer (such as a blank answer, an answer with content irrelavant to the question, or an answer without an actual algorithm) as a valid solution (which would let user(s) move on to the next question).

  * GPT must rate the answers as either valid or invalid, determing the course of the quest/game.

  * Answer quality must be indicated/viewable to the user using 5 stars and the amount they're filled.

  * User(s) must only be able to move on to the next question after they submit a "valid" answer. Invalid answers must not allow user(s) to continue to the next questions of the quest.

  * Answers which are not at least 50% correct are marked invalid by GPT.

  * Answers which are at least 50% correct are marked valid by GPT.

* Game timer reaching 0 must produce a defeat result unless the dragon's/enemy's health bar reaches 0 by that time (context: all questions have not been correctly answered yet).

* Health bar of dragon reaching 0 must trigger a victory result.

* Health bar of user(s) reaching 0 must trigger a defeat result.

* Users must see a quest result at the end of each quest (either victory or defeat).

* Users must be able to log out.

* All user data must be stored in and retreived from the MongoDB database using the Flask backend.
 

## Non-Functional Requirements
* Application must be able to support multiple users via websockets.
* The backend must generate questions based on the topic the user selected.
* The backend must generate a storyline for the quest based on the quest form filled out by the user.
* The game must sequence through each question utilizing the storyline generated.
* GPT reponses time during grading must be within 1 to 5 seconds.
* Automated daily backups must be performed.

