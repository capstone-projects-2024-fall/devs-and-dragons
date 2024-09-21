---
sidebar_position: 2
---

# System Block Diagram

![image](https://github.com/user-attachments/assets/3f2fa9f0-8786-4aef-98c4-f160d0f308a0)

The diagram above demonstrates how TechTrek will take user input and process that data. For structured data, such as user login information and quest results, we send it to the backend using RESTful API calls with Flask. After the data reaches the backend, it is stored in an SQL database. The backend will retrieve this structured data to validate user login. The data is also utilized when using OpenAI API to pair users together based on progress and skill level, data apart of the user's information.

Similarly, unstrucutred data, such as in-game inputs and chatbot responses/inputs, follow a similar path. However, unstrucutred data is instead stored in a MongoDB database. This data is used when making OpenAI API calls to review user answers as well as genereating chatbot reponses.

Finally, all of the processed information from both data types is sent back to the frontend. From there, React and Phaser will use the data for user interaction, updating the game, and chatbot responses.
