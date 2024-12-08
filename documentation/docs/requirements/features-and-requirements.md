---
sidebar_position: 4
---

# Features and Requirements

## Functional Requirements

* Users must be able to create quests through filling out a form that takes in:
  * Quest Title
  * Coding Topic
  * Amount of Problems (3 - 8)
  * Difficulty Level
  * Enemy 
  * Background
  * Programming Language
  * Quest Description
* Users must be able to create and customize an Avatar.
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
* Users must be able to create accounts.
* Users must be able to log into created accounts.
* Users can opt out or leave a started quest.
* Users must be able to log out.
* Users should see a quest results at the end of each quest (either victory or defeat).
* Users must be able to toggle dark mode or light mode during ongoing quests (depending on their preference).
* All user data must be stored in MongoDB.
 

## Non-Functional Requirements
* Application must be able to support multiple users via websockets.
* The backend must generate questions based on the topic the user selected.
* The backend must generate a storyline for the quest based on the quest form filled out by the user.
* The game must sequence through each question utilizing the storyline generated.
* GPT reponses time during grading must be within 1 to 5 seconds.
* Automated daily backups must be performed.

