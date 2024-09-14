

# System Overview

**Project Abstract**

We are creating a quest-based web app that is designed to pair students together with the goal of helping them learn and practice code throughout gamified challenges to encourage engagement. Our primary goal is to provide a collaborative platform through diverse quests that align with Temple University’s computer science curriculum. 
Users begin by creating a custom avatar for themselves that they will be playing as and completing an initial survery thereafter. After the setup, the user can now select a difficulty level, which will be based on the temple's courses. For example, if the individual selects CIS 1051 (Introduction to Python), they are presented with the basic concepts of computer science such as for loops, if statements, sequences/file reading, dictionaries and other beginner-friendly fundamentals. 
After concept selection, the user can start the quest tailored to their level; this quest will include various coding challenges that he/she will need to complete in order to move forward. These questions vary in difficulty; for example, for beginners, we will provide some skeleton code but as the user moves forward and completes more challenges, they will not be given starter code.  As they move forward, they will also be presented with challenges that will have a timer to add a level of productive pressure. Nonetheless, if the user gets stuck, we have a standout feature of the platform that allows for the users to get help at any time. The user can opt for ChatGPT Bot assistance. The bot provides instant responses and helps them troubleshoot or explain the programming concepts. As they progress and complete a series of coding interview-style questions, users will also earn points for correct answers. Additional quests with more advanced concepts such as OOP can be introduced as the app grows. 
In addition to completing solo quests, users can team up for the final quests, where they can play with their peers and combine their skills to solve more complex coding problems. This will be done after the user completes the prior quests and levels. This is to ensure that the users have the necessary foundational skills before attempting the ultimate challenge. 

**Conceptual Design**

Our app will use a web-based architecture where the user data is sent to the backend using API calls through Flask. Features such as user login and quest details will be stored in a SQL database for data management. Things like in-game actions and chatbot conversations are saved in MongoDB. The backend uses OpenAI API to match users based on their skill levels. All the processed data is sent back to the frontend. React and Phaser then use this data to update the user interface. 

**Background**

There are several resources available for users to practice coding such as leetcode, codify, replit, youtube and these are just to name a few. However, what sets our application apart is that we include personalized content tailored to each user's needs with a touch of game elements and alignment with future courses. This approach creates a more engaging and collaborative environment. 

