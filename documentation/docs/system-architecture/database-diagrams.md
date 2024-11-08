---
sidebar_position: 4
---

# Database Diagrams


```mermaid
erDiagram
USER ||--|{ AVATAR : owns
USER ||--o{ QUEST : "created"

    USER {
        string username PK
        string password_hash "PBKDF2"
        string email
        list quests_made "FK to QUEST table"
    }

    AVATAR {
        int avatar_id PK
        string owner FK "USER - username"
        string avatar_name
        enum avatar_type
        int total_health
        datetime last_interaction
        datetime birthday
    }

    QUEST {
        int quest_id PK
        enum difficulty "EASY, MEDIUM, HARD"
        int number_of_problems
        string problem_topic
        int time_limit 
        string creator FK "USER - username"
        string enemy
        string background
    }

```

The diagram shows the individual tables and their relations in our MongoDB database. The tables provide this description:

- **USER**: The user holds the core information for the quests he wants to participate in. A user can create multiple quests.
  - USER (many-to-many with QUEST): A USER can create many QUESTs, but each quest belongs to one user as the creator.  

- **AVATAR**: Represents the avatar created and owned by the user. Each avatar belongs to only one user.  
  - AVATAR (many-to-one with USER): One USER can own many avatars.

- **QUEST**: Contains information about quests. A user creates a quest.  
  - QUEST (many-to-one with USER): Each QUEST is created by one USER.  


  

  
