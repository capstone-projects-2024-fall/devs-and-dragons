"use strict";(self.webpackChunkcreate_project_docs=self.webpackChunkcreate_project_docs||[]).push([[3374],{22496:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>h,frontMatter:()=>r,metadata:()=>o,toc:()=>c});var s=n(74848),i=n(28453);const r={sidebar_position:1},a="System Overview",o={id:"requirements/system-overview",title:"System Overview",description:"Project Abstract",source:"@site/docs/requirements/system-overview.md",sourceDirName:"requirements",slug:"/requirements/system-overview",permalink:"/project-techtrek/docs/requirements/system-overview",draft:!1,unlisted:!1,editUrl:"https://github.com/capstone-projects-2024-fall/project-techtrek/edit/main/documentation/docs/requirements/system-overview.md",tags:[],version:"current",lastUpdatedBy:"Jericho R Orienza",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"docsSidebar",previous:{title:"Requirements Specification",permalink:"/project-techtrek/docs/category/requirements-specification"},next:{title:"System Block Diagram",permalink:"/project-techtrek/docs/requirements/system-block-diagram"}},l={},c=[{value:"Project Abstract",id:"project-abstract",level:2},{value:"High Level Requirements",id:"high-level-requirements",level:2},{value:"Group Dynamics",id:"group-dynamics",level:3},{value:"Game Mechanics",id:"game-mechanics",level:3},{value:"Grading User Input",id:"grading-user-input",level:3},{value:"Quest Creation",id:"quest-creation",level:3},{value:"Starting a Quest",id:"starting-a-quest",level:3},{value:"Conceptual Design",id:"conceptual-design",level:2},{value:"Background",id:"background",level:2}];function d(e){const t={br:"br",h1:"h1",h2:"h2",h3:"h3",img:"img",li:"li",p:"p",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h1,{id:"system-overview",children:"System Overview"}),"\n",(0,s.jsx)(t.h2,{id:"project-abstract",children:"Project Abstract"}),"\n",(0,s.jsx)(t.p,{children:"Devs and Dragons is a multiplayer web-based application that's designed as a gamified learning platform for Computer Science students. Users can form parties of two to four members to tackle quests involving coding challenges. Team members take turns solving problems within a time limit determined by the selected difficulty level. Quests and their coding problems are generated and graded by a GPT bot based on user(s) input, problem type, difficulty, and quest description."}),"\n",(0,s.jsx)(t.h2,{id:"high-level-requirements",children:"High Level Requirements"}),"\n",(0,s.jsx)(t.h3,{id:"group-dynamics",children:"Group Dynamics"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.strong,{children:"Party:"})," Small group of 2 to 4 members."]}),"\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.strong,{children:"Create Room:"}),"  User can create a quest and invite others to join by sharing a unique room code."]}),"\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.strong,{children:"Join Room:"}),"  User can join an existing quest by entering the shared room code."]}),"\n"]}),"\n",(0,s.jsx)(t.h3,{id:"game-mechanics",children:"Game Mechanics"}),"\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.img,{src:"https://github.com/user-attachments/assets/ab9dd4d5-2544-461d-a894-28ed702d74bf",alt:"Timer"}),(0,s.jsx)(t.br,{}),"\n",(0,s.jsx)(t.strong,{children:"Figure 1."}),"\n",(0,s.jsx)(t.strong,{children:"Timed Challenge:"})," The party is given a set amount of time (based on the selected difficulty) to solve each problem. The amount of time is divided equally among the party members."]}),"\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.img,{src:"https://github.com/user-attachments/assets/e323bf35-b6bb-4b4e-91dd-a4346f2886f7",alt:"visualConcept_battle"}),"\n",(0,s.jsx)(t.strong,{children:"Figure 2."})]}),"\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.strong,{children:"Turn-based coding:"})," Each party member takes turns writing code by picking up where their party members left off. If the answer is incorrect after cycling through all of the party, then the party loses health. The timer restarts and the member who went first will start again. This repeats until the party fixes their solution to solve the problem, or the party's health reaches zero (which means the party lost)."]}),"\n",(0,s.jsx)(t.h3,{id:"grading-user-input",children:"Grading User Input"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:"GPT grades user(s) input."}),"\n",(0,s.jsx)(t.li,{children:"GPT grading does not start until all members have taken a turn."}),"\n",(0,s.jsx)(t.li,{children:'GPT ensures and verifies correct logic is used to solve problems. E.g., for a problem which the solution is 10, GPT will not accept a function with a one liner being "return 10" (for the answer).'}),"\n",(0,s.jsxs)(t.li,{children:["GPT rates answers from 1 to 5 stars, based on a 10-point grading scale:","\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.strong,{children:"1 star"}),": Rating of 0% - 30% signfies a solution which is extremely inefficient, irrelevant, or incorrect."]}),"\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.strong,{children:"2 stars"}),": Rating of 40% \u2013 50% signifies a solution which is generally inefficient, partially helpful, but still unclear or incomplete."]}),"\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.strong,{children:"3 stars"}),": Rating of 60% to 70% signifies a solution which is efficient clear, relevant, and generally complete."]}),"\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.strong,{children:"4 stars"}),": Rating of 80% to 90% signifies a solution which is highly efficient and exceeds expectations."]}),"\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.strong,{children:"5 stars"}),": Rating of 100% signfies an exceptional and perfect solution."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(t.h3,{id:"quest-creation",children:"Quest Creation"}),"\n",(0,s.jsx)(t.p,{children:"All users can create a quest by filling out a form that specifies the difficulty, number of problems, topic of problems (Computer Science related), enemy, and background."}),"\n",(0,s.jsx)(t.h3,{id:"starting-a-quest",children:"Starting a Quest"}),"\n",(0,s.jsx)(t.p,{children:'In multiplayer mode, a party of two or more users are needed in order to start a multiplyer (or "Two Player") quest. The user who created the quest can provide a unique code for others to join the quest.'}),"\n",(0,s.jsx)(t.h2,{id:"conceptual-design",children:"Conceptual Design"}),"\n",(0,s.jsx)(t.p,{children:"The frontend of Devs and Dragons is developed using React JS to build UI components and manage the application state. The backend is powered by Flask, API requests, and an integration with OpenAI's GPT (Model 4) for generating and grading users' answers to coding challenges (quests). The MongoDB database stores the user data, quest configurations, and coding submissions. WebSockets manage the multiplayer connections to allow players to collaborate in real-time during ongoing quests."}),"\n",(0,s.jsx)(t.p,{children:"After users log in, and choose to start and play a quest together or by themselves, a game must be on a 2D plane with Sprites representing the User and the Enemy (similar to a fighting style game, e.g, Mortal Kombat) where there is a Code Editor that allows user(s) to input their solutions. A question dedicated space is also present for the questions/problems/challenges of a quest. Real-time grading of answers is dynamically achieved by GPT. Multiplayer quests should rotate the ability to input code between users of a same party (through turns) to demonstrate teamwork."}),"\n",(0,s.jsx)(t.h2,{id:"background",children:"Background"}),"\n",(0,s.jsx)(t.p,{children:"Educators often face the challenge of addressing differences in students\u2019 preparedness as coding experience can vary widely among Computer Science freshmen. This range of difference in initial knowledge makes it difficult to teach in a way that is engaging and effective for everyone. Additionally, the importance of soft skills, particularly teamwork and collaboration, can be hard to implement when some students may feel discouraged due to many students choosing to work alone or within their circle. Devs and Dragons addresses these challenges by combining the multiplayer dynamic of video games with the rigor of programming challenges. By fostering a collaborative environment, the platform not only aims to aid individual learning but also to enhance group problem-solving skills."})]})}function h(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},28453:(e,t,n)=>{n.d(t,{R:()=>a,x:()=>o});var s=n(96540);const i={},r=s.createContext(i);function a(e){const t=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),s.createElement(r.Provider,{value:t},e.children)}}}]);