"use strict";(self.webpackChunkcreate_project_docs=self.webpackChunkcreate_project_docs||[]).push([[7642],{95857:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>l,contentTitle:()=>r,default:()=>u,frontMatter:()=>i,metadata:()=>c,toc:()=>o});var t=s(74848),a=s(28453);const i={sidebar_position:2},r="Class Diagrams",c={id:"system-architecture/class-diagrams",title:"Class Diagrams",description:"Frontend Class Diagram",source:"@site/docs/system-architecture/class-diagrams.md",sourceDirName:"system-architecture",slug:"/system-architecture/class-diagrams",permalink:"/project-techtrek/docs/system-architecture/class-diagrams",draft:!1,unlisted:!1,editUrl:"https://github.com/capstone-projects-2024-fall/project-techtrek/edit/main/documentation/docs/system-architecture/class-diagrams.md",tags:[],version:"current",lastUpdatedBy:"bhoiwalapreet",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"docsSidebar",previous:{title:"Component Descriptions",permalink:"/project-techtrek/docs/system-architecture/component-descriptions"},next:{title:"Sequence Diagrams",permalink:"/project-techtrek/docs/system-architecture/sequence-diagrams"}},l={},o=[{value:"Frontend Class Diagram",id:"frontend-class-diagram",level:2},{value:"Description",id:"description",level:3}];function d(e){const n={h1:"h1",h2:"h2",h3:"h3",li:"li",mermaid:"mermaid",p:"p",ul:"ul",...(0,a.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"class-diagrams",children:"Class Diagrams"}),"\n",(0,t.jsx)(n.h2,{id:"frontend-class-diagram",children:"Frontend Class Diagram"}),"\n",(0,t.jsx)(n.p,{children:"Figure 1:"}),"\n",(0,t.jsx)(n.mermaid,{value:"    classDiagram\n    Quest ..> QuestBot : \n    Guild *-- GuildParty : \n    GuildParty --|> Party : \n    GuildParty --\x3e Quest : \n    Party --\x3e Quest : \n    App --\x3e Quest : \n    App --\x3e Guild : \n    App --\x3e Party : \n    App --\x3e LoginPage : \n    Index --\x3e App : \n    LoginPage ..> User : \n\n    class Index {\n        +render()\n    }\n\n    class App {\n        +initialize()\n        +start()\n        +handleQuest()\n        +handleGuild()\n    }\n\n    class LoginPage {\n        +username : String\n        +password : String\n        +login() \n        +register()\n    }\n\n    class Quest {\n        +title : String\n        +description : String\n        +difficulty : int\n        +startQuest()\n        +completeQuest()\n    }\n\n    class Guild {\n        +name : String\n        +createGuild()\n        +manageGuild()\n    }\n\n    class Party {\n        +partyName : String\n        +addMember()\n        +removeMember()\n    }\n\n    class QuestBot {\n        +generateQuest()\n        +assistPlayer()\n    }\n\n    class GuildParty {\n        +guildName : String\n        +formWithinGuild()\n    }\n\n    class User {\n        +username : String\n        +password : String\n        +login()\n        +register()\n    }\n"}),"\n",(0,t.jsx)(n.h3,{id:"description",children:"Description"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"This class diagram models the core components of the Devs and Dragons application and their relationships. The App class acts as the central controller, interacting with key entities such as Quest, Guild, Party, and LoginPage, facilitating the management of quests, guilds, and user sessions. The Index class serves as the entry point, rendering the application. LoginPage class handles user authentication through the User class, which manages login and registration functionality. The QuestBot class generates quests and assists players, offering coding challenges and guidance during gameplay. The Guild class is responsible for creating and managing guilds, while the Party class oversees member management. The GuildParty class inherits from the Party class, signifying it as a specialized type of party within a guild. Both GuildParty and Party class can initiate quests. The Quest class details each challenge, including title, description, and difficulty, while providing methods for starting and completing quests."}),"\n"]})]})}function u(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},28453:(e,n,s)=>{s.d(n,{R:()=>r,x:()=>c});var t=s(96540);const a={},i=t.createContext(a);function r(e){const n=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:r(e.components),t.createElement(i.Provider,{value:n},e.children)}}}]);