import pymongo
import random
import openai
from flask import Flask, request, jsonify, render_template
from flask_socketio import SocketIO, join_room, leave_room, emit
from pymongo import MongoClient
from contact import Contact
from flask_cors import CORS
import bcrypt
import re
import certifi
import uuid

app = Flask(__name__)
app.config["SECRET_KEY"] = "12345"
CORS(app, resources={r"/*": {"origins": "*"}}) 
socketio = SocketIO(app, cors_allowed_origins="http://10.108.34.229:29000")
socketio = SocketIO(app)


password = "testKey125"
# For better readability
connection = "mongodb+srv://User1:" + password + "@cluster0.1edn5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
cluster_connection = MongoClient(connection, tlsCAFile=certifi.where())
db = cluster_connection["techQuest"]
collection = db["userInfo"]
sequence_collection = db["sequences"]
quests_store = {}
rooms = {}

# Initialize the sequence counter (this is done only once when setting up)
if sequence_collection.find_one({"_id": "user_id"}) is None:
    sequence_collection.insert_one({"_id": "user_id", "seq_value": 0})

# Email validation function
def valid_email(email):
    return re.match(r"^[^\s@]+@[^\s@]+\.[^\s@]+$", email) is not None

# Function to enforce strong password requirements
def eligible_password(password):
    return (len(password) >= 8 and 
            any(char.isdigit() for char in password) and 
            any(char.isalpha() for char in password) and 
            any(char.isupper() for char in password) and 
            any(not char.isalnum() for char in password))

# Function to get the next sequence value for user_id
def get_next_sequence_value(sequence_name):
    sequence_doc = sequence_collection.find_one_and_update(
        {"_id": sequence_name},
        {"$inc": {"seq_value": 1}},
        return_document=True
    )
    return sequence_doc["seq_value"]

# Function to generate a custom ID like USER001, USER002, etc.
def generate_custom_id():
    next_id = get_next_sequence_value("user_id")
    return f"USER{next_id:03d}"  # This will create IDs like USER001, USER002, etc.

@socketio.on('connect')
def handle_connect():
    print('Client connected')

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/create_room", methods=["POST"])
def create_room():
    room_code = str(uuid.uuid4())[:6]
    rooms[room_code] = {"players": []}
    return jsonify({"room_code": room_code})

@app.route("/join_room", methods=["POST"])
def join_room():
    data = request.get_json()
    room_code = data.get("room_code")
    username = data.get("username")
    
    if room_code not in rooms:
        return jsonify({"error": "Room does not exist"})
    
    if username in rooms[room_code]["players"]:
        return jsonify({"error": "Username already taken"})
    
    rooms[room_code]["players"].append(username)
    return jsonify({"message": f"{username}", "room_code": room_code})

@socketio.on('join_room')
def handle_join_room(data):
    print("This is the data handle_join_room socket: ", data)
    username = data["username"]
    room = data["room"]
    
    
    if room not in rooms:
        emit("error", {'message': 'Room does not exist'})
        return 
    
    join_room(room)
    if username not in rooms[room]["players"]:
        rooms[room]["players"].append(username)
    emit('user_joined', {'username': username, 'players': rooms[room]['players']}, room=room)
    

@socketio.on('leave_room')
def handle_leave_room(data):
    username = data["username"]
    room = data["room"]
    
    if room in rooms and username in rooms[room]["players"]:
        rooms[room]["players"].remove(username)
        leave_room(room)
        emit('user_left', {'username': username, 'players': rooms[room]['players']}, room=room)
        # if not rooms[room]["players"]:
        #     del rooms[room]
        
        if not rooms[room]["players"]:
            del rooms[room]
        

@socketio.on('send_message')
def handle_send_message(data):
    print("This is the data handle_send_message socket: ", data)  # Log to check if data is received
    room = data['room']
    message = data['message']
    username = data['username']
    
    emit('receive_message', {'username': username, 'message': message}, room=room)


@socketio.on('code_update')
def handle_code_update(data):
    room = data['room']
    code = data['code']
    
    emit('code_update', {'code': code}, room=room)
    
@socketio.on('language_update')
def handle_language_update(data):
    room = data['room']
    language = data['language']
    
    emit('language_update', {'language': language}, room=room)



@app.route('/create_contact', methods=["POST"])
def create_contact():
    data = request.get_json()
    print("Received data:", data)  # Log to check if data is received
    
    # Check if all required fields are present
    if not data or not data.get("name") or not data.get("email") or not data.get("password"):
        return jsonify({"message": "Missing required fields"}), 400

    # Validate email
    if not valid_email(data["email"]):
        return jsonify({"message": "Invalid email format."}), 400

    # Validate password
    if not eligible_password(data["password"]):
        return jsonify({"message": "Password does not meet security requirements."}), 400

    # Check if email already exists in the database
    if collection.find_one({"email": data["email"]}):
        return jsonify({"message": "Email already exists"}), 400
    
    # Hash the password using bcrypt
    hashed_password = bcrypt.hashpw(data["password"].encode('utf-8'), bcrypt.gensalt())

    # Generate a custom ID
    custom_id = generate_custom_id()

    # Create a new contact with a custom _id
    new_contact = {
        '_id': custom_id,
        'name': data["name"],
        'email': data["email"],
        'password': hashed_password.decode('utf-8'),  # Store hashed password
        'guildsIn': 0,
        "questMade": 0,
        "mock_field": 0
    }

    try:
        # Insert new contact into the database
        collection.insert_one(new_contact)
        return jsonify({"message": "User created successfully", "user_id": custom_id}), 201
    except Exception as e:
        print(f"Error inserting user into MongoDB: {e}")
        return jsonify({"message": "Account creation failed due to server error"}), 500   

@app.route('/update_mock_field', methods=["POST"])
def update_mock_field():
    data = request.get_json()
    user_id = data.get("user_id")
    increment_value = data.get("increment_value", 1)  # Default increment value is 1

    if not user_id:
        return jsonify({"message": "User ID is required"}), 400

    try:
        result = collection.update_one(
            {"_id": user_id},
            {"$inc": {"mock_field": increment_value}}
        )
        if result.modified_count == 1:
            return jsonify({"message": "Mock field updated successfully"}), 200
        else:
            return jsonify({"message": "User not found"}), 404
    except Exception as e:
        print(f"Error updating mock field: {e}")
        return jsonify({"message": "Failed to update mock field"}), 500
    
@app.route('/get_user_data', methods=["GET"])
def get_user_data():
    user_id = request.args.get("user_id")

    if not user_id:
        return jsonify({"message": "User ID is required"}), 400

    try:
        user_data = collection.find_one({"_id": user_id})
        if user_data:
            return jsonify({"user_id": user_data["_id"], "mock_field": user_data["mock_field"]}), 200
        else:
            return jsonify({"message": "User not found"}), 404
    except Exception as e:
        print(f"Error fetching user data: {e}")
        return jsonify({"message": "Failed to fetch user data"}), 500



@app.route("/match_user", methods=["POST"])
def doesTheUserExist():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    # Input Validation
    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400
    
    print(f"Looking for user with email: {email}")

    stored_user = collection.find_one({"email": email})
    if stored_user:
        # Compare the hashed password with the provided password
        if bcrypt.checkpw(password.encode('utf-8'), stored_user["password"].encode('utf-8')):
            print("User exists")
            return jsonify({"message": "User exists", "user_id": str(stored_user["_id"])}), 200
        else:
            print("Incorrect password")
            return jsonify({"message": "Incorrect password"}), 403
    else:
        print("User does not exist")
        return jsonify({"message": "User does not exist"}), 404
    

@app.route("/quest-parameters", methods=["POST", "GET"])
def getResponse():
    messageFromChatGpt = ""
    if request.method == "POST":
        data = request.get_json()
        print(data)
        questTitle = data.get('questTitle')
        codingTopic = data.get("codingTopic")
        problemCount = data.get("problemCount")
        difficultyLevel = data.get("difficultyLevel")
        enemy = data.get("enemy")
        background = data.get("background")
        description = data.get("description")
        programmingLanguage = data.get("programmingLanguage")
        gameType = data.get("gameType")
        
        
        user_input = (f"You're a quest master guiding me on a coding adventure titled '{questTitle}' with the difficulty level '{difficultyLevel}'. "
              f"I need {problemCount} computer science coding challenges on the topic '{codingTopic}', each in the language {programmingLanguage}. "
              f"Please provide a quest story in the '{background}' setting, where I am battling the enemy '{enemy}'. "
              f"Each question should progress the story, incorporating a short description of how each coding challenge helps me defeat '{enemy}' "
              f"or overcome a specific obstacle in the journey. **Do not provide solutions or hints for any question**.\n"
              f"Format the output as:\n"
              f"Background: (Description of the scene)\n"
              f"Question 1: (Describe a scenario where I encounter '{enemy}' or an obstacle, followed by a coding question related to '{codingTopic}' "
              f"that must be solved in {programmingLanguage} to progress)\n"
              f"Question 2: (Next coding question in {programmingLanguage}, with another part of the story building on my progress or another encounter with '{enemy}')\n"
              f"… and so on up to Question {problemCount}.\n"
              f"Example question format:\n"
              f"'The enemy blocks your path with a wall of encrypted data. To proceed, write a function in {programmingLanguage} that can decrypt the data. If possible provide input and expected output as an example'\n"
              f"Use this storyline description for context: {description}")
        
        
        
        print(user_input)    
        
        response = openai.ChatCompletion.create(
            model = "gpt-3.5-turbo",
            messages = [
                {"role": "system", "content": "You are a helpful assitant"},
                {"role": "user", "content": user_input}
            
            ]
        )
        
        #print(response)
        messageFromChatGpt = response['choices'][0]['message']['content']
        questions = messageFromChatGpt.split("Question")[1:]
        quest_id = str(uuid.uuid4())
        print("quest_id: ", quest_id)
        quests_store[0] = questions
        print(quests_store)
        # The returned response is in json format, so we go inside choices and then inside choices, we look, at the 0 th element and then inside that
        # the message and then acessing the content.
        
        return jsonify({"quest_id": quest_id}), 200

    
    else:
        if request.method == 'GET':
            #questions = []
            quest_id = request.args.get('quest_id')
            print("received quest id:", quest_id, type(quest_id))
            if int(quest_id) in quests_store:
                questions = quests_store[int(quest_id)]
                return jsonify(questions), 200
            else:
                return jsonify({"No questions found for the quest_id": quest_id})
            
            


    
# @app.route("/get_questions", methods=["GET"])
# def solutionFromTheUser():
    #answerFromUser = request.json.get('answer')

@app.route("/check_answer", methods=["POST"])
def checkAnswer():
    data = request.get_json()
    question = data.get('question')
    answer = data.get('answer')
    print(answer)
    language = data.get('language')
    sendToOpenAI = f"This is the question: {question}, and based on that grade my solution: {answer}, on a scale 1-10, 1 being the worst code and 10 being the best code, in this programming language: {language}. Be an easy grader. Focus more on the logic than the syntax of the code. The return output should be: Grade, advice"
    
    response = openai.ChatCompletion.create(
        model = "gpt-3.5-turbo",
        messages = [
            {"role": "system", "content": "You are a helpful assitant"},
            {"role": "user", "content": sendToOpenAI}
        
        ]
    )
    messageFromChatGpt = response['choices'][0]['message']['content']
    
    print(messageFromChatGpt)
    
    return jsonify(messageFromChatGpt)


# can insert multiple posts at once
# collection.insert_many([post1, post2])

# results = collection.find({"name": "Lola"})
# for result in results:
#     print(result)

"""

# to find a specifc person's in the DB

we will use result = colleciton.find({"name": "bill})

for result in results:


"""

if __name__ == '__main__':
    HOST, PORT = '10.108.34.229', 29000
    socketio.run(app, host=HOST, port=PORT, debug=True)
    app.run(debug=True)




