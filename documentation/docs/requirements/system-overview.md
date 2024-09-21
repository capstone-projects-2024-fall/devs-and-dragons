---
sidebar_position: 1
---

# System Overview

**Project Abstract**

This document proposes Tech Quest, a web-based platform that pairs students together to practice coding through gamified challenges. Users can generate quests based on user preferences, gradually increasing in difficulty. They will work in guilds to progress through sequenced problems. Features include a chatbot assistance using Chat GPT’s API to offer hints and guidance, without solving the problem for the user. It includes a point-based reward structure which will allow the user to earn gold and use it to customize their avatar. Group battles operate in a turn-based system where each participant is given set time to contribute. The group placement will be based on the performance of the user. By using this platform, users will have a collaborative way to improve their programming skills through personalized coding challenges. 


**Conceptual Design**

Our app will use a web-based architecture where the user data is sent to the backend using API calls through Flask. Features such as user login and quest details will be stored in a SQL database for data management. Things like in-game actions and chatbot conversations are saved in MongoDB. All the processed data is sent back to the frontend. React and Phaser then use this data to update the user interface. 


**Background**

Similar products include leetcode, codify and replit. These are all products that provide an online environment to write code. Tech Quest is similar to these products in that it provides an outlet to practice coding. However, this app also includes personalized content tailored to each user's needs with a touch of game elements and alignment with future courses. This approach creates a more engaging and collaborative environment. 

 

