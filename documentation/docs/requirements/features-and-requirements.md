# Features and Requirements

<ins>**User Control**</ins>
- [ ] Registration and Authentication: Users can register and log in using their credentials. Credentials are matched against the database.
- [ ] Role-Based Access Control: Students and administrators have different kinds of access. The latter enjoys extended privileges like user management and content management.
- [ ] Avatar Creation: Students will be able to create and customize their avatar with gold that they receive through participation in the activities.

<ins>**Content Management**</ins>
- [ ] Custom Content Delivery: An adaptive learning engine creates personalized content delivery based on user responses from a survey or quiz. 
- [ ] Categorization of Content: All content needs to be categorized by course codes, such as 1051, 1068, and 2107, among others, for easy access.

<ins>**Quizzes and Surveys Smart Grading**</ins>
- [ ] Algorithm: The quizzes will automatically get graded, and feedback will also be provided. 
- [ ] Personalization as per Survey: Results from the survey will adjust the difficulty and type of content to be delivered.  
                                  
<ins>**Dashboard and KPIs**</ins>
- [ ] Progress Tracking: Graphical representation of quiz scores, achieved learning milestones, and goal achievements.
- [ ] Analytics Downloadable: Detailed performance reports to instructors on student performance. 

<ins>**Games and Group Learning**</ins>
- [ ] Group Formation Automatically put students in diverse groups, ensuring there is at least one experienced member in each group. 
- [ ] Group Projects In-code tasks with code tracking and contribution monitoring. 
- [ ] Quest-Based Games Learning-based games that encompass course material. 
- [ ] 1 vs. 1 Coding Battles Real-time competitive coding. 

<ins>**Real-Time Features**</ins>
- [ ] WebSocket Integration: For real-time communication in collaborative projects and coding battles.
- [ ] Notifications and Reminders: Notifications about uncompleted or almost completed assignments. 

<ins>**APIs**</ins>
- [ ] RESTful API: To simplify the communications from the frontend to the backend through Flask. 
- [ ] Third-party APIs: Integration with other services such as OpenAI and GitHub is possible. 

<ins>**User Interface**</ins>
- [ ] Dashboard: Main hub of the application, showing KPIs, content modules, information about the team. 
- [ ] Content Module: Video watching zone, area for coding exercises, quizzes. 
- [ ] Team Page: Group project page, collaborative code zone.
- [ ] 1 vs. 1 Coding Battle: Interface for competitive coding challenges.
- [ ] Avatar Section: Create and manage custom avatars.

## Functional Requirements

<ins>**User Management**</ins>
- [ ] FR1: The user must be able to create an account, log in, and maintain his or her profile.
- [ ] FR2: The system must support the student and administrator access rights.
- [ ] FR3: Students should be able to create and customize an avatar with the gold they have earned.

<ins>**Content Management**</ins>
- [ ] FR4: Platform should deliver customized content to users according to the result of a user's survey or quiz.
- [ ] FR5: Content must be categorized by course codes and accessible accordingly.

<ins>**Quiz and Survey**</ins>
- [ ] FR6: The system shall automatically score quizzes and give feedback.
- [ ] FR7: Surveys shall be used to adapt the content difficulty and types.

<ins>**Dash Board and KPIs**</ins>
- [ ] FR8: Dashboard shall show progress metrics, quiz scores, learning milestones.
- [ ] FR9: The instructors shall be allowed to download detailed performance analytics.

<ins>**Games And Group Learning**</ins>
- [ ] FR10: The system should divide the group of students into different groups comprising at least one senior member in each group.
- [ ] FR11: Group projects should track contribution and commits made by each student.
- [ ] FR12: Quest-based games and 1 vs. 1 coding battles should be integrated into the system.

<ins>**Realtime Features**</ins>
- [ ] FR13: The application should support WebSockets communication for real-time communication features.
- [ ] FR14: The system should deliver notifications and reminders regarding assignment submissions.

<ins>**APIs**</ins>
- [ ] FR15: RESTful APIs at the back end should handle the communication between the front-end and back-end.
- [ ] FR16: The system should incorporate Third-party APIs where necessary.

<ins>**User Interface**</ins>
- [ ] FR17: The UI should be intuitive and user-friendly throughout the application - Dashboards, content modules, and team pages.
- [ ] FR18: The UI for Avatar customization should also be user-friendly.

## Non Functional Requirements

<ins>**Performance**</ins>
- [ ] NFR1: Application performance should sustain multiple users at any given time, especially during real-time interactions.

<ins>**Scalability**</ins>
- [ ] NFR2: The platform must scale in line with the growth of users and content fed onto it.

<ins>**Security**</ins>
- [ ] NFR3: Ensure data security and privacy, in particular, for user credentials and personal information.

<ins>**Usability**</ins>
- [ ] NFR4: The system should be available and easy to use; the navigation should be intuitive, with a minimal learning curve.

<ins>**Reliability**</ins>
- [ ] NFR5: The application should be reliable and spend no more time down than up. Any problem detected is to be fixed as soon as possible.

<ins>**Maintainability**</ins>
- [ ] NFR6: The system should be designed in such a way that maintenance and updates are easily accessible.

<ins>**Compatibility**</ins>
- [ ] NFR7: The solution should be compatible with popular browsers and devices.
