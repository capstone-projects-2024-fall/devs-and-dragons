"use strict";(self.webpackChunkcreate_project_docs=self.webpackChunkcreate_project_docs||[]).push([[6549],{35525:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>c,contentTitle:()=>a,default:()=>h,frontMatter:()=>r,metadata:()=>i,toc:()=>d});var n=s(74848),o=s(28453);const r={sidebar_position:1},a="Component Descriptions",i={id:"system-architecture/component-descriptions",title:"Component Descriptions",description:"OpenAI",source:"@site/docs/system-architecture/component-descriptions.md",sourceDirName:"system-architecture",slug:"/system-architecture/component-descriptions",permalink:"/project-techtrek/docs/system-architecture/component-descriptions",draft:!1,unlisted:!1,editUrl:"https://github.com/capstone-projects-2024-fall/project-techtrek/edit/main/documentation/docs/system-architecture/component-descriptions.md",tags:[],version:"current",lastUpdatedBy:"Jake Creasy",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"docsSidebar",previous:{title:"System Architecture",permalink:"/project-techtrek/docs/category/system-architecture"},next:{title:"Class Diagrams",permalink:"/project-techtrek/docs/system-architecture/class-diagrams"}},c={},d=[];function l(e){const t={h1:"h1",p:"p",strong:"strong",...(0,o.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h1,{id:"component-descriptions",children:"Component Descriptions"}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.strong,{children:"OpenAI"})}),"\n",(0,n.jsx)(t.p,{children:"OpenAI\u2019s ChatGPT will be used with the basic 3.5 version to generate coding problems and a storyline sequencing the two together. An API key will be needed for this and the ChatGPT will be integrated with the Flask backend to receive prompts. Flask will send a request to the API with the prompt and other details, like how long the response should be. OpenAI will process the prompt and send back a response in JSON format, which contains the generated coding challenge or storyline which Flask will then format to send it to React for display. Using ChatGPT\u201ds API key costs around $0.0015 per 1,000 tokens."}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.strong,{children:"MongoDB"})}),"\n",(0,n.jsx)(t.p,{children:"MongoDB is an open source database management database program designed to handle structured and unstructured data, making it usable for storing dynamic game data. MongoDB can store user data such as progress, avatar customization and chatbot interactions. This will be done by setting the MongoDB environment, designing the database scheme and connecting MongoDB to Flask Backend."}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.strong,{children:"React.js"})}),"\n",(0,n.jsx)(t.p,{children:"React.js is a JavaScript framework for building user interfaces. React.js will handle the visual components of the platform. It will be installed through Node.JS. Components will be created for each part of the game interface like avatar customization, buttons, and score display. These components will be reusable across different sections of the game. Each React component that requires data, such as user progress or avatar details, will send HTTP requests to Flask and get the necessary data, which will be used to update the component's state to reflect real-time changes like a user's score after completing a quest."}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.strong,{children:"Restful API with Flask"})}),"\n",(0,n.jsx)(t.p,{children:"Python framework used to build web APIs. The restful api is designed for interacting with React through HTTP requests to handle data exchange between the client and server. It will process user actions by receiving API requests from React. Flask will be used to set up API routes that handle requests from the front end. Each route will handle specific tasks, like saving user progress or retrieving coding challenges. Flask will process the requests, interact with MongoDB to store or retrieve data, and send responses back to React. There are libraries such as pyMongo to connect to MongoDB. It will store or retrieve data as needed, format the response in JSON, and send it back to React via the API route for updating the interface."})]})}function h(e={}){const{wrapper:t}={...(0,o.R)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(l,{...e})}):l(e)}},28453:(e,t,s)=>{s.d(t,{R:()=>a,x:()=>i});var n=s(96540);const o={},r=n.createContext(o);function a(e){const t=n.useContext(r);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:a(e.components),n.createElement(r.Provider,{value:t},e.children)}}}]);