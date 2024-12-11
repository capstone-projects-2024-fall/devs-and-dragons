---
sidebar_position: 2
---

# System Block Diagram

![](SystemBlockDiag.png)
**Figure 1.** High level design of Devs and Dragons

## Description
**Figure 1** above illustrates Devs and Dragons's full stack. The user interacts with the frontend that is built using **React**. The frontend will handle user actions and sends **RESTful API** requests to the backend.

The backend is built using **Flask**. It will process game logic, verify user inputs, and manage the game state. The backend communicates with the **MongoDB** database to store and retrieve data such as quest made, guilds joined, and in-game answers. 

Multiplayer synchronization will be managed by using **Flask** ensuring that all players remain in sync during a quest.

The back end will use **OpenAI API** calls to comunicate with the GPT bot. The GPT bot will be utilized for three tasks:
- Generate code problems for quests.
- Generate a storyline to sequence problems within a quest.
- Grade user answers during a quest.
