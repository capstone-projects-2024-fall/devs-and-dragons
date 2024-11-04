"use strict";(self.webpackChunkcreate_project_docs=self.webpackChunkcreate_project_docs||[]).push([[3374],{22496:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>u,frontMatter:()=>r,metadata:()=>o,toc:()=>c});var s=n(74848),i=n(28453);const r={sidebar_position:1},a="System Overview",o={id:"requirements/system-overview",title:"System Overview",description:"Project Abstract",source:"@site/docs/requirements/system-overview.md",sourceDirName:"requirements",slug:"/requirements/system-overview",permalink:"/project-techtrek/docs/requirements/system-overview",draft:!1,unlisted:!1,editUrl:"https://github.com/capstone-projects-2024-fall/project-techtrek/edit/main/documentation/docs/requirements/system-overview.md",tags:[],version:"current",lastUpdatedBy:"justanimish",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"docsSidebar",previous:{title:"Requirements Specification",permalink:"/project-techtrek/docs/category/requirements-specification"},next:{title:"System Block Diagram",permalink:"/project-techtrek/docs/requirements/system-block-diagram"}},l={},c=[{value:"Project Abstract",id:"project-abstract",level:2},{value:"High Level Requirements",id:"high-level-requirements",level:2},{value:"Group Dynamics",id:"group-dynamics",level:3},{value:"Game Mechanics",id:"game-mechanics",level:3},{value:"Grading User Input",id:"grading-user-input",level:3},{value:"Quest Creation",id:"quest-creation",level:3},{value:"Starting a Quest",id:"starting-a-quest",level:3},{value:"Conceptual Design",id:"conceptual-design",level:2},{value:"Background",id:"background",level:2}];function d(e){const t={br:"br",em:"em",h1:"h1",h2:"h2",h3:"h3",img:"img",li:"li",p:"p",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h1,{id:"system-overview",children:"System Overview"}),"\n",(0,s.jsx)(t.h2,{id:"project-abstract",children:"Project Abstract"}),"\n",(0,s.jsx)(t.p,{children:"Devs and Dragons is a multiplayer web-based application that provides a gamified learning platform for computer science students and educators. Users must form parties of two to four members to take on quests that involve solving coding problems. Alternatively, users can create guilds to hold multiple parties and assign multiple quests. Each user in a party takes turns coding to solve the problem with a given time constraint based on difficulty. Each quest and the problems created for the quest are generated using user input and a GPT bot."}),"\n",(0,s.jsx)(t.h2,{id:"high-level-requirements",children:"High Level Requirements"}),"\n",(0,s.jsx)(t.h3,{id:"group-dynamics",children:"Group Dynamics"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.strong,{children:"Party:"})," Small group of 2 to 4 members"]}),"\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.strong,{children:"Guild:"})," Large group capable of holding up to 150 members, can be assigned multiple quests"]}),"\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.strong,{children:"Guild Party:"})," Similar to a ",(0,s.jsx)(t.em,{children:"Party"}),", but are made within a guild"]}),"\n"]}),"\n",(0,s.jsx)(t.h3,{id:"game-mechanics",children:"Game Mechanics"}),"\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.img,{src:"https://github.com/user-attachments/assets/ab9dd4d5-2544-461d-a894-28ed702d74bf",alt:"Timer"}),(0,s.jsx)(t.br,{}),"\n",(0,s.jsx)(t.strong,{children:"Figure 1."})]}),"\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.strong,{children:"Timed Challenge:"})," The party is given a set amount of time that is based on difficulty to solve each problem. The amount of time is divided equally amongst the party members."]}),"\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.img,{src:"https://github.com/user-attachments/assets/e323bf35-b6bb-4b4e-91dd-a4346f2886f7",alt:"visualConcept_battle"}),"\n",(0,s.jsx)(t.strong,{children:"Figure 2."})]}),"\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.strong,{children:"Turn-based coding:"})," Each party member takes turns coding, picking back off where their members left off. After the last member is finished, if the final code is not correct, then the party loses health. The timer restarts and the member who went first will start.  This repeats until the party fixes their code to solve the problem, or the party's health reaches zero."]}),"\n",(0,s.jsx)(t.h3,{id:"grading-user-input",children:"Grading User Input"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:"Grading does not start until all members have taken a turn"}),"\n",(0,s.jsxs)(t.li,{children:["Ensures that proper logic is being used to solve","\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:'A problem expecting an output of "10" will not accept "return 10" as a correct input'}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(t.li,{children:["GPT rates successful answers from 1 to 3 stars","\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:"1 being extremely inefficient"}),"\n",(0,s.jsx)(t.li,{children:"2 being decently efficient"}),"\n",(0,s.jsx)(t.li,{children:"3 being the most efficient"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(t.h3,{id:"quest-creation",children:"Quest Creation"}),"\n",(0,s.jsx)(t.p,{children:"All users can create a quest by filling out a form that specifies the difficulty, number of problems, computer science related topic(s), enemy, and background."}),"\n",(0,s.jsx)(t.h3,{id:"starting-a-quest",children:"Starting a Quest"}),"\n",(0,s.jsx)(t.p,{children:"User must be in a party of two or more people in order to start a quest made by the user. Guild parties can start a quest that is assigned to their guild. Multiple guild parties can start and complete the same quest."}),"\n",(0,s.jsx)(t.h2,{id:"conceptual-design",children:"Conceptual Design"}),"\n",(0,s.jsx)(t.p,{children:"The frontend of Devs and Dragons will be developed using React.js to build UI components and manage the application state. The backend will be powered by Flask, handling user authentication, API requests, and integrating with the OpenAI GPT model for generating and grading coding challenges. MongoDB will be the database, storing user data, quest configurations, and coding submissions. React Game Kit will develop the game component using its tools to create and manage animations and game mechanics."}),"\n",(0,s.jsx)(t.h2,{id:"background",children:"Background"}),"\n",(0,s.jsx)(t.p,{children:"Educators face the challenge of students\u2019 differences in preparedness. Students vary in coding experience when entering the computer science program. This makes it difficult to teach in a way that is engaging and effective for everyone. Additionally, the importance of soft skills, particularly teamwork and collaboration, can be hard to implement when some students may feel discouraged due to many students choosing to work alone or within their circle."}),"\n",(0,s.jsx)(t.p,{children:"Devs and Dragons addresses these challenges by combining the multiplayer dynamic of video games with the rigor of programming challenges. By fostering a collaborative environment, the platform not only aims to aid individual learning but also enhances group problem-solving skills."})]})}function u(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},28453:(e,t,n)=>{n.d(t,{R:()=>a,x:()=>o});var s=n(96540);const i={},r=s.createContext(i);function a(e){const t=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),s.createElement(r.Provider,{value:t},e.children)}}}]);