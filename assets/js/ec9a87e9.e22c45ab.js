"use strict";(self.webpackChunkcreate_project_docs=self.webpackChunkcreate_project_docs||[]).push([[6236],{64244:(n,e,t)=>{t.r(e),t.d(e,{assets:()=>c,contentTitle:()=>r,default:()=>h,frontMatter:()=>i,metadata:()=>o,toc:()=>l});var s=t(74848),a=t(28453);const i={sidebar_position:4},r="Database Diagrams",o={id:"system-architecture/database-diagrams",title:"Database Diagrams",description:"database_diagram",source:"@site/docs/system-architecture/database-diagrams.md",sourceDirName:"system-architecture",slug:"/system-architecture/database-diagrams",permalink:"/project-techtrek/docs/system-architecture/database-diagrams",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedBy:"Ishan Aggarwal",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"docsSidebar",previous:{title:"Sequence Diagrams",permalink:"/project-techtrek/docs/system-architecture/sequence-diagrams"},next:{title:"Development Environment",permalink:"/project-techtrek/docs/system-architecture/development-environment"}},c={},l=[];function d(n){const e={h1:"h1",img:"img",li:"li",mermaid:"mermaid",p:"p",strong:"strong",ul:"ul",...(0,a.R)(),...n.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(e.h1,{id:"database-diagrams",children:"Database Diagrams"}),"\n",(0,s.jsx)(e.p,{children:(0,s.jsx)(e.img,{src:"https://github.com/user-attachments/assets/bf10ab52-5794-4f39-85e1-8d63cea00be7",alt:"database_diagram"})}),"\n",(0,s.jsx)(e.mermaid,{value:'erDiagram\nUSER ||--|{ AVATAR : owns\nUSER ||--o{ GUILD : "belongs to"\nUSER ||--o{ QUEST : "created"\nUSER ||--o{ PARTY : "part of"\nGUILD ||--o{ QUEST : "assigned"\nGUILD ||--|{ PARTY : "owns"\n    USER {\n        string username PK\n        string password_hash "PBKDF2"\n        string email\n        list guilds_in "FK to GUILD table"\n        list quests_made "FK to QUEST table"\n    }\n\n    AVATAR {\n        int avatar_id PK\n        string owner FK "USER - username"\n        string avatar_name\n        enum avatar_type\n        int total_health\n        datetime last_interaction\n        datetime birthday\n    }\n\n    QUEST {\n        int quest_id PK\n        enum difficulty "EASY, MEDIUM, HARD"\n        int number_of_problems\n        string problem_topic\n        int time_limit \n        string creator FK "USER - username"\n        string enemy\n        string background\n    }\n\n    GUILD {\n        int guild_id PK\n        string name\n        string description\n        int guild_code \n        int quest_assigned FK "to QUEST table"\n        list guild_parties "FK to PARTY table"\n    }\n\n    PARTY {\n        int party_id PK\n        string name\n        int party_code\n        int quest_assigned FK "QUEST - quest_id"\n        list users_inside "FK to USER table"\n    }\n\n    GUILD_PARTY {\n        int guild_party_id PK\n        string name\n        int guild_party_code\n        int quest_assigned FK "QUEST - quest_id"\n        list users_inside "FK to USER table"\n    }'}),"\n",(0,s.jsx)(e.p,{children:"The diagram shows the individual tables and their relations in our MongoDB database. The tables provide this description:"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["\n",(0,s.jsxs)(e.p,{children:[(0,s.jsx)(e.strong,{children:"USER"}),": The user holds the core information for users who participate in quests and guilds. A user can create quests, be part of multiple guilds, and belong to multiple parties."]}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"USER (many-to-many with GUILD): A USER can belong to many GUILDs."}),"\n",(0,s.jsx)(e.li,{children:"USER (many-to-many with QUEST): A USER can create many QUESTs, but each quest belongs to one user as the creator."}),"\n",(0,s.jsx)(e.li,{children:"USER (many-to-many with PARTY): A USER can be part of multiple PARTYs."}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\n",(0,s.jsxs)(e.p,{children:[(0,s.jsx)(e.strong,{children:"AVATAR"}),": Represents the avatar created and owned by the user. Each avatar belongs to only one user."]}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"AVATAR (many-to-one with USER): One USER can own many avatars."}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\n",(0,s.jsxs)(e.p,{children:[(0,s.jsx)(e.strong,{children:"QUEST"}),": Contains information about quests. A quest is created by a user and can be assigned to guilds and parties."]}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"QUEST (many-to-one with USER): Each QUEST is created by one USER."}),"\n",(0,s.jsx)(e.li,{children:"QUEST (many-to-many with GUILD): A QUEST can be assigned to many GUILDs, and each GUILD can have many quests assigned to it."}),"\n",(0,s.jsx)(e.li,{children:"QUEST (one-to-one with PARTY): Each PARTY can be assigned one QUEST, and each QUEST can have one PARTY associated with it."}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\n",(0,s.jsxs)(e.p,{children:[(0,s.jsx)(e.strong,{children:"GUILD"}),": Represents a group that users can join. A guild can assign quests and have multiple parties inside."]}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"GUILD (many-to-many with USER): A GUILD can have many USERs, and each USER can be in many GUILDs."}),"\n",(0,s.jsx)(e.li,{children:"GUILD (many-to-many with QUEST): A GUILD can assign multiple QUESTs, and each quest can be assigned to multiple GUILDs."}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\n",(0,s.jsxs)(e.p,{children:[(0,s.jsx)(e.strong,{children:"PARTY"}),": Represents a group of users within a guild that works together on a quest. Each party is assigned to one quest and contains several users."]}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"PARTY (many-to-many with USER): A PARTY can have many USERs, and each USER can belong to multiple parties."}),"\n",(0,s.jsx)(e.li,{children:"PARTY (one-to-one with QUEST): Each PARTY is assigned to exactly one QUEST."}),"\n",(0,s.jsx)(e.li,{children:"PARTY (many-to-one with GUILD): A PARTY belongs to one GUILD, but a GUILD can have many PARTYs."}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\n",(0,s.jsxs)(e.p,{children:[(0,s.jsx)(e.strong,{children:"GUILD_PARTY"}),": A subset of parties within a guild. Similar to the party entity but specific to the guild."]}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["\n",(0,s.jsx)(e.p,{children:"GUILD_PARTY (many-to-many with USER): A GUILD_PARTY can have many USERs inside it, and each USER can be part of multiple guild parties."}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\n",(0,s.jsx)(e.p,{children:"GUILD_PARTY (one-to-one with QUEST): A GUILD_PARTY is assigned to exactly one QUEST."}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\n",(0,s.jsx)(e.p,{children:"GUILD_PARTY (many-to-one with GUILD): A GUILD_PARTY belongs to one GUILD, but a GUILD can have multiple guild parties."}),"\n"]}),"\n"]}),"\n"]}),"\n"]})]})}function h(n={}){const{wrapper:e}={...(0,a.R)(),...n.components};return e?(0,s.jsx)(e,{...n,children:(0,s.jsx)(d,{...n})}):d(n)}},28453:(n,e,t)=>{t.d(e,{R:()=>r,x:()=>o});var s=t(96540);const a={},i=s.createContext(a);function r(n){const e=s.useContext(i);return s.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function o(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(a):n.components||a:r(n.components),s.createElement(i.Provider,{value:e},n.children)}}}]);