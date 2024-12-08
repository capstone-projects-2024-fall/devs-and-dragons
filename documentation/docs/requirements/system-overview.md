---
sidebar_position: 1
---

# System Overview

## Project Abstract

Devs and Dragons is a multiplayer web-based application that's designed as a gamified learning platform for Computer Science students. Users can form parties of two to four members to tackle quests involving coding challenges. Team members take turns solving problems within a time limit determined by the selected difficulty level. Quests and their coding problems are generated and graded by a GPT bot based on user(s) input, problem type, difficulty, and quest description.


## High Level Requirements

### Group Dynamics
- **Party:** Small group of 2 to 4 members
- **Create Room:**  User can create a quest and invite others to join by sharing a unique room code
- **Join Room:**  User can join an existing quest by entering the shared room code

### Game Mechanics
![Timer](https://github.com/user-attachments/assets/ab9dd4d5-2544-461d-a894-28ed702d74bf)             
**Figure 1.**
**Timed Challenge:** The party is given a set amount of time, based on the selected difficulty, to solve each problem. The amount of time is divided equally among the party members.

![visualConcept_battle](https://github.com/user-attachments/assets/e323bf35-b6bb-4b4e-91dd-a4346f2886f7)
**Figure 2.**

**Turn-based coding:** Each party member takes turns coding, picking up where their team members left off. If the final code is still incorrect after the last member's turn, the party loses health. The timer restarts and the member who went first will start. This repeats until the party fixes their code to solve the problem, or the party's health reaches zero.

### Grading User Input
- Grading does not start until all members have taken a turn
- Ensures that proper logic is being used to solve
  - A problem expecting an output of "10" will not accept "return 10" as a correct input
- GPT rates answers from 1 to 5 stars, based on a 10-point grading scale
  - **1 star**: Grade 0–3/10 (Extremely inefficient; irrelevant or incorrect)
  - **2 stars**: Grade 4–5/10 (Inefficient; partially helpful but unclear or incomplete)
  - **3 stars**: Grade 6–7/10 (Efficient; clear, relevant, and complete)
  - **4 stars**: Grade 8–9/10 (Highly efficient; exceeds expectations)
  - **5 stars**: Grade 10/10 (Exceptional; goes above and beyond)

### Quest Creation
All users can create a quest by filling out a form that specifies the difficulty, number of problems, computer science related topic(s), enemy, and background.

### Starting a Quest
In multiplayer mode, the user must be in a party of two or more people in order to start a quest made by the user. The user who created the quest can provide a unique code for others to join the quest.

## Conceptual Design
The frontend of Devs and Dragons is developed using React.js to build UI components and manage the application state. The backend is powered by Flask, handling user authentication, API requests, and integrating with the OpenAI GPT model for generating and grading coding challenges. The MongoDB database stores the user data, quest configurations, and coding submissions. WebSockets manage the multiplayer connections to allow players to collaborate in real-time during quests. 

## Background
Educators often face the challenge of addressing differences in students’ preparedness, as coding experience can vary widely among those entering a computer science program. This diversity makes it difficult to teach in a way that is engaging and effective for everyone. Additionally, the importance of soft skills, particularly teamwork and collaboration, can be hard to implement when some students may feel discouraged due to many students choosing to work alone or within their circle. Devs and Dragons addresses these challenges by combining the multiplayer dynamic of video games with the rigor of programming challenges. By fostering a collaborative environment, the platform not only aims to aid individual learning but also enhances group problem-solving skills.