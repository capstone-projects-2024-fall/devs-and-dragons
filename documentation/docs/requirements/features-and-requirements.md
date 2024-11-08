---
sidebar_position: 4
---

# Features and Requirements

## Functional Requirments

* Users must be able to create quests through filling out a form that takes in
  * Quest title
  * Coding topic
  * Amount of problems
  * Difficulty level
  * Enemy
  * Background
* Users must be able to create and customize an Avatar
* Game must include a timer for each party member
* Game must be able to generate coding problems based on topic and difficulty chosen
* Game must be able grade answers based on correct output
* Users must make an account
* Users must be able to log in created account
* Users must be able to log into existing accounts
* Users can opt to abandon a started quest
* All user data will be stored in MongoDB
 

## Non-Functional Requirements

* Application must be able to support multiple users
  * The use of AWS will enable Devs and Dragons to host up to 1000 concurrrent users
* Users can track their progress
  * Dashboard with KPIs (Key performance indicators)
* The backend must handle errors in GPT-generated coding questions or feedback without affecting users' attempts
* Automated daily backups must be performed

