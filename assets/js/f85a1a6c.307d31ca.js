"use strict";(self.webpackChunkcreate_project_docs=self.webpackChunkcreate_project_docs||[]).push([[6244],{21926:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>d,contentTitle:()=>l,default:()=>h,frontMatter:()=>r,metadata:()=>a,toc:()=>c});var t=n(74848),i=n(28453);const r={sidebar_position:1},l="Unit Tests",a={id:"testing/unit-testing",title:"Unit Tests",description:"Unit Test Reports",source:"@site/docs/testing/unit-testing.md",sourceDirName:"testing",slug:"/testing/unit-testing",permalink:"/project-techtrek/docs/testing/unit-testing",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedBy:"justanimish",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"docsSidebar",previous:{title:"Test Procedures",permalink:"/project-techtrek/docs/category/test-procedures"},next:{title:"Integration Tests",permalink:"/project-techtrek/docs/testing/integration-testing"}},d={},c=[{value:"Unit Test Reports",id:"unit-test-reports",level:2},{value:"Frontend Unit Tests",id:"frontend-unit-tests",level:2},{value:"Application",id:"application",level:3},{value:"Test Case 1: Authorize User Login",id:"test-case-1-authorize-user-login",level:4},{value:"Home Page",id:"home-page",level:3},{value:"Test Case 1: Dropdown Menu",id:"test-case-1-dropdown-menu",level:4},{value:"Create Quest Page",id:"create-quest-page",level:3},{value:"Test Case 1: Quest Title Input",id:"test-case-1-quest-title-input",level:4},{value:"Test Case 2: Topic Selection",id:"test-case-2-topic-selection",level:4},{value:"Test Case 3-6: Number of Problems, Difficulty, Enemy, and Background Selection",id:"test-case-3-6-number-of-problems-difficulty-enemy-and-background-selection",level:4},{value:"Backend Unit Test",id:"backend-unit-test",level:2},{value:"User Registration",id:"user-registration",level:3},{value:"Test Case 1: Create a New User Successfully",id:"test-case-1-create-a-new-user-successfully",level:4},{value:"Test Case 2: Create a User with Duplicate Email",id:"test-case-2-create-a-user-with-duplicate-email",level:4},{value:"Test Case 3: Create a User with a Weak Password",id:"test-case-3-create-a-user-with-a-weak-password",level:4},{value:"Test Case 4: Create a User with an Invalid Email",id:"test-case-4-create-a-user-with-an-invalid-email",level:4},{value:"Strong Credential Validation",id:"strong-credential-validation",level:3},{value:"Test Case 1: User Exists and Password is Correct",id:"test-case-1-user-exists-and-password-is-correct",level:4},{value:"Test Case 2: User Exists, but Password is Incorrect",id:"test-case-2-user-exists-but-password-is-incorrect",level:4},{value:"Test Case 3: User Does Not Exist",id:"test-case-3-user-does-not-exist",level:4}];function o(e){const s={a:"a",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(s.h1,{id:"unit-tests",children:"Unit Tests"}),"\n",(0,t.jsx)(s.h2,{id:"unit-test-reports",children:"Unit Test Reports"}),"\n",(0,t.jsxs)(s.p,{children:["You can find the generated unit test report ",(0,t.jsx)(s.a,{href:"https://docs.google.com/document/d/1LXl8B6zVj_wNwBaXmDyHSxlF1FM4JaUEBZPb5mn5QmY/edit?usp=sharing",children:"here"}),"."]}),"\n",(0,t.jsx)(s.h2,{id:"frontend-unit-tests",children:"Frontend Unit Tests"}),"\n",(0,t.jsx)(s.h3,{id:"application",children:"Application"}),"\n",(0,t.jsx)(s.h4,{id:"test-case-1-authorize-user-login",children:"Test Case 1: Authorize User Login"}),"\n",(0,t.jsx)(s.p,{children:"Goal: Verify that a user is able to log into an account created."}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"User Action"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:["A user inputs ",(0,t.jsx)(s.strong,{children:"username"})," and ",(0,t.jsx)(s.strong,{children:"password"})," in the login form."]}),"\n",(0,t.jsxs)(s.li,{children:["The user clicks the ",(0,t.jsx)(s.strong,{children:'"login"'})," button."]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"Expected Behavior"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:["The frontend calls ",(0,t.jsx)(s.strong,{children:"loginUser()"}),", which will send a ",(0,t.jsx)(s.strong,{children:"POST request"})," to the backend with the user's credentials."]}),"\n",(0,t.jsxs)(s.li,{children:["The backend queries the ",(0,t.jsx)(s.strong,{children:"MongoDB"})," to find a matching user."]}),"\n",(0,t.jsxs)(s.li,{children:["On ",(0,t.jsx)(s.strong,{children:"success"}),", the user is authorized and redirected to the ",(0,t.jsx)(s.strong,{children:"home page"}),"."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(s.h3,{id:"home-page",children:"Home Page"}),"\n",(0,t.jsx)(s.h4,{id:"test-case-1-dropdown-menu",children:"Test Case 1: Dropdown Menu"}),"\n",(0,t.jsx)(s.p,{children:"Goal: Verify that a user can open the dropdown menu."}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"User Action:"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:["User clicks the ",(0,t.jsx)(s.strong,{children:"Quests"})," button to open the dropdown menu."]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"Expected Behavior:"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:["The dropdown menu opens and displays the following options:","\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsx)(s.li,{children:(0,t.jsx)(s.strong,{children:"My Quests"})}),"\n",(0,t.jsx)(s.li,{children:(0,t.jsx)(s.strong,{children:"Create Quest"})}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(s.li,{children:"Both options are visible and can be clicked."}),"\n",(0,t.jsx)(s.li,{children:"The dropdown menu remains open until the user selects an option or clicks outside the menu."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(s.h3,{id:"create-quest-page",children:"Create Quest Page"}),"\n",(0,t.jsx)(s.h4,{id:"test-case-1-quest-title-input",children:"Test Case 1: Quest Title Input"}),"\n",(0,t.jsxs)(s.p,{children:["Goal: Verify that the user can enter a ",(0,t.jsx)(s.strong,{children:"quest title"})," in the input field."]}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"User Action:"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsx)(s.li,{children:"A user inputs the desired title name in the text field provided."}),"\n",(0,t.jsx)(s.li,{children:'User enters "My First Quest".'}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"Expected Behavior:"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:["The ",(0,t.jsx)(s.strong,{children:"quest title"})," input field updates to display the entered quest title."]}),"\n",(0,t.jsxs)(s.li,{children:["The value in the input field reflects the text: ",(0,t.jsx)(s.strong,{children:'"My First Quest"'}),"."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(s.h4,{id:"test-case-2-topic-selection",children:"Test Case 2: Topic Selection"}),"\n",(0,t.jsx)(s.p,{children:"Goal: Verify that the user can select one of the provided topics."}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"User Action:"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:["User clicks the ",(0,t.jsx)(s.strong,{children:"Topic Selection Dropdown"})," to open it."]}),"\n",(0,t.jsxs)(s.li,{children:["User selects the ",(0,t.jsx)(s.strong,{children:'"Arrays"'})," option from the dropdown."]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"Expected Behavior:"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:['The topic dropdown displays the text "',(0,t.jsx)(s.strong,{children:"Arrays"}),'" after selection.']}),"\n",(0,t.jsx)(s.li,{children:"The correct topic value is stored in the dropdown state."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(s.h4,{id:"test-case-3-6-number-of-problems-difficulty-enemy-and-background-selection",children:"Test Case 3-6: Number of Problems, Difficulty, Enemy, and Background Selection"}),"\n",(0,t.jsxs)(s.p,{children:["The remaining selections above follow the same test as ",(0,t.jsx)(s.strong,{children:"Test Case 2"}),"."]}),"\n",(0,t.jsx)(s.h2,{id:"backend-unit-test",children:"Backend Unit Test"}),"\n",(0,t.jsx)(s.h3,{id:"user-registration",children:"User Registration"}),"\n",(0,t.jsx)(s.h4,{id:"test-case-1-create-a-new-user-successfully",children:"Test Case 1: Create a New User Successfully"}),"\n",(0,t.jsx)(s.p,{children:"Goal: Verify that a new user can be created successfully."}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"User Action"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsx)(s.li,{children:"Clean up any existing user with the same email to ensure a clean slate."}),"\n",(0,t.jsxs)(s.li,{children:["Provide the following new user data:","\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsx)(s.li,{children:'Name: "Test User"'}),"\n",(0,t.jsxs)(s.li,{children:['Email: "',(0,t.jsx)(s.a,{href:"mailto:testuser@example.com",children:"testuser@example.com"}),'"']}),"\n",(0,t.jsx)(s.li,{children:'Password: "TestPassword123!"'}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(s.li,{children:"Send a POST request to the /create_contact endpoint with the user data in JSON format."}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"Expected Behavior"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsx)(s.li,{children:"The backend should process the request and create a new user in the database."}),"\n",(0,t.jsx)(s.li,{children:"The server responds with a 201 status code, indicating success."}),"\n",(0,t.jsx)(s.li,{children:'The response message should be "User created successfully."'}),"\n",(0,t.jsx)(s.li,{children:"Cleanup should be performed after the test, removing the test user from the database."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(s.h4,{id:"test-case-2-create-a-user-with-duplicate-email",children:"Test Case 2: Create a User with Duplicate Email"}),"\n",(0,t.jsx)(s.p,{children:"Goal: Verify that attempting to create a user with an already existing email address results in an error."}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"User Action"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:['Add an existing user to the database with the email "',(0,t.jsx)(s.a,{href:"mailto:existinguser@example.com",children:"existinguser@example.com"}),'."']}),"\n",(0,t.jsxs)(s.li,{children:["Attempt to create a new user with the following data:","\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsx)(s.li,{children:'Name: "Duplicate User"'}),"\n",(0,t.jsxs)(s.li,{children:['Email: "',(0,t.jsx)(s.a,{href:"mailto:existinguser@example.com",children:"existinguser@example.com"}),'"']}),"\n",(0,t.jsx)(s.li,{children:'Password: "AnotherPassword123!"'}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(s.li,{children:"Send a POST request to the /create_contact endpoint with the user data in JSON format."}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"Expected Behavior"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsx)(s.li,{children:"The backend should reject the request due to the duplicate email."}),"\n",(0,t.jsx)(s.li,{children:"The server responds with a 400 status code, indicating failure."}),"\n",(0,t.jsx)(s.li,{children:'The response message should be "Email already exists."'}),"\n",(0,t.jsxs)(s.li,{children:['Cleanup should be performed after the test, removing the user with "',(0,t.jsx)(s.a,{href:"mailto:existinguser@example.com",children:"existinguser@example.com"}),'" from the database.']}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(s.h4,{id:"test-case-3-create-a-user-with-a-weak-password",children:"Test Case 3: Create a User with a Weak Password"}),"\n",(0,t.jsx)(s.p,{children:"Goal: Verify that attempting to create a user with a weak password results in an error."}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"User Action"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:["Provide the following new user data with a weak password:","\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsx)(s.li,{children:'Name: "Weak Password User"'}),"\n",(0,t.jsxs)(s.li,{children:['Email: "',(0,t.jsx)(s.a,{href:"mailto:weakpassword@example.com",children:"weakpassword@example.com"}),'"']}),"\n",(0,t.jsx)(s.li,{children:'Password: "123" (intentionally weak)'}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(s.li,{children:"Send a POST request to the /create_contact endpoint with the user data in JSON format."}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"Expected Behavior"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsx)(s.li,{children:"The backend should reject the request due to the weak password not meeting security requirements."}),"\n",(0,t.jsx)(s.li,{children:"The server responds with a 400 status code, indicating failure."}),"\n",(0,t.jsx)(s.li,{children:'The response message should be "Password does not meet security requirements."'}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(s.h4,{id:"test-case-4-create-a-user-with-an-invalid-email",children:"Test Case 4: Create a User with an Invalid Email"}),"\n",(0,t.jsx)(s.p,{children:"Goal: Verify that attempting to create a user with an invalid email format results in an error."}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"User Action"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:["Provide the following new user data with an invalid email:","\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsx)(s.li,{children:'Name: "Invalid Email User"'}),"\n",(0,t.jsx)(s.li,{children:"Email: \"invalid-email\" (missing '@' and domain part)"}),"\n",(0,t.jsx)(s.li,{children:'Password: "ValidPassword123!"'}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(s.li,{children:["Send a POST request to the /create_contact endpoint with the user data in JSON format.\n",(0,t.jsx)(s.strong,{children:"Expected Behavior"})]}),"\n",(0,t.jsx)(s.li,{children:"The backend should reject the request due to the invalid email format."}),"\n",(0,t.jsx)(s.li,{children:"The server responds with a 400 status code, indicating failure."}),"\n",(0,t.jsx)(s.li,{children:'The response message should be "Invalid email format."'}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(s.h3,{id:"strong-credential-validation",children:"Strong Credential Validation"}),"\n",(0,t.jsx)(s.h4,{id:"test-case-1-user-exists-and-password-is-correct",children:"Test Case 1: User Exists and Password is Correct"}),"\n",(0,t.jsx)(s.p,{children:"Goal: Verify that a user with the correct email and password can authenticate successfully."}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"User Action"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:["Add a test user to the database with the following data:","\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:['Email: "',(0,t.jsx)(s.a,{href:"mailto:testuser@example.com",children:"testuser@example.com"}),'"']}),"\n",(0,t.jsx)(s.li,{children:'Password: "CorrectPassword123"'}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(s.li,{children:["Provide the following login credentials:","\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:['Email: "',(0,t.jsx)(s.a,{href:"mailto:testuser@example.com",children:"testuser@example.com"}),'"']}),"\n",(0,t.jsx)(s.li,{children:'Password: "CorrectPassword123"'}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(s.li,{children:"Send a POST request to the /match_user endpoint with the login data in JSON format."}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"Expected Behavior"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsx)(s.li,{children:"The backend should verify that the user exists and that the password is correct."}),"\n",(0,t.jsx)(s.li,{children:"The server responds with a 200 status code, indicating success."}),"\n",(0,t.jsx)(s.li,{children:'The response message should be "User exists."'}),"\n",(0,t.jsx)(s.li,{children:"Cleanup should be performed after the test, removing the test user from the database."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(s.h4,{id:"test-case-2-user-exists-but-password-is-incorrect",children:"Test Case 2: User Exists, but Password is Incorrect"}),"\n",(0,t.jsx)(s.p,{children:"Goal: Verify that a user with an incorrect password is denied authentication."}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"User Action"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:["Add a test user to the database with the following data:","\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:['Email: "',(0,t.jsx)(s.a,{href:"mailto:testuser@example.com",children:"testuser@example.com"}),'"']}),"\n",(0,t.jsx)(s.li,{children:'Password: "CorrectPassword123"'}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(s.li,{children:["Provide the following login credentials with an incorrect password:","\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:['Email: "',(0,t.jsx)(s.a,{href:"mailto:testuser@example.com",children:"testuser@example.com"}),'"']}),"\n",(0,t.jsx)(s.li,{children:'Password: "WrongPassword123"'}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(s.li,{children:"Send a POST request to the /match_user endpoint with the login data in JSON format."}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"Expected Behavior"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsx)(s.li,{children:"The backend should verify the user exists but reject the login due to the incorrect password."}),"\n",(0,t.jsx)(s.li,{children:"The server responds with a 403 status code, indicating failure."}),"\n",(0,t.jsx)(s.li,{children:'The response message should be "Incorrect password."'}),"\n",(0,t.jsx)(s.li,{children:"Cleanup should be performed after the test, removing the test user from the database."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(s.h4,{id:"test-case-3-user-does-not-exist",children:"Test Case 3: User Does Not Exist"}),"\n",(0,t.jsx)(s.p,{children:"Goal: Verify that attempting to log in with an email that does not exist results in an error."}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"User Action"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:["Provide the following login credentials for a non-existent user:","\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:['Email: "',(0,t.jsx)(s.a,{href:"mailto:nonexistentuser@example.com",children:"nonexistentuser@example.com"}),'"']}),"\n",(0,t.jsx)(s.li,{children:'Password: "SomePassword123"'}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(s.li,{children:"Send a POST request to the /match_user endpoint with the login data in JSON format."}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"Expected Behavior"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsx)(s.li,{children:"The backend should verify that the user does not exist in the database."}),"\n",(0,t.jsx)(s.li,{children:"The server responds with a 404 status code, indicating failure."}),"\n",(0,t.jsx)(s.li,{children:'The response message should be "User does not exist."'}),"\n"]}),"\n"]}),"\n"]})]})}function h(e={}){const{wrapper:s}={...(0,i.R)(),...e.components};return s?(0,t.jsx)(s,{...e,children:(0,t.jsx)(o,{...e})}):o(e)}},28453:(e,s,n)=>{n.d(s,{R:()=>l,x:()=>a});var t=n(96540);const i={},r=t.createContext(i);function l(e){const s=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function a(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:l(e.components),t.createElement(r.Provider,{value:s},e.children)}}}]);