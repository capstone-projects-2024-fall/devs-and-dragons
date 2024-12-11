Final ReadMe to run the project (for development, release v1.1 is already published):

Installing needed dependencies:

Backend

1. Cd into "devsdragons".
2. Cd into "server".
3. In main.py, "pip install -r requirements.txt", "pip3" may work as well. This will install all the needed libraries.
4. On line 21, you must input your OpenAI API Key. You can accquire this on OpenAI.com!


Frontend

1. Cd into "devsdragons".
2. Run "npm install".
3. Also, run "npm install socket.io".


To run the project:

1. Start the backend server first, cd into "devsdragons/server". Configure the HOST to either "localhost" or your physical location's IP on line 684 & line 18 in main.py.
2. Also, in "devsdragons\src\views\QuestPage\TwoPlayerQuestPage.jsx", modify line 38 to suit the HOST chosen in the previous step.  
3. Run "python main.py" from "devsdragons\server\main.py" first.
4. Run "npm run dev" after cd(ing) into "devsdragons".





