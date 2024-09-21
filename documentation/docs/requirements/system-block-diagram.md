---
sidebar_position: 2
---

# System Block Diagram

![image](https://github.com/user-attachments/assets/3f2fa9f0-8786-4aef-98c4-f160d0f308a0)
**Figure 1.** High level design of the Tech Quest application

## Description
**Figure 1** above demonstrates how Tech Quest will take user input and process that data. Structured data, such as user login information and quest results, will be sent to the backend using RESTful API calls with Flask. After the data reaches the backend, it is stored in an SQL database. The backend will retrieve this structured data to validate user login. Users' quest data will be utilized for generating teams. 

Unstrucutred data, such as in-game inputs and chatbot responses/inputs, follow a similar path but instead will be stored in a MongoDB database. This data is used when making OpenAI API calls to review user answers as well as genereating chatbot reponses.

All of the processed information from both data types is sent back to the frontend where it will be used by React and Phaser for user interaction, updating the game, and chatbot responses.
