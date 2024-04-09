### TaskEase - Task Management Application

TaskEase is a task management application built using React for the frontend, Express for the backend, MongoDB for data storage, and RESTful APIs for communication. It provides users with a simple and intuitive interface to manage their tasks efficiently.
one can add n number of categories and each category can have n number of tasks.  you can add, delete, and edit tasks as well as categories anytime.

### Table of Contents

1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Technologies Used](#technologies-used)
6. [Screenshots](#screenshots)
7. [License](#license)

### Prerequisites

Before running TaskEase, ensure that you have the following prerequisites installed on your system:

- Node.js
- npm (Node Package Manager)
- MongoDB (if you use DB locally)

### Installation

Follow these steps to install and run TaskEase on your local machine:

1. Clone the repository:

```
git clone https://github.com/utkarshgupta04092003/mern-todo
```

2. Navigate to the project directory:

```
cd mern-todo
```

3. Install dependencies for both frontend and backend:

```
cd frontend
npm install

cd ..
cd backend
npm install
```

4. Configure MongoDB:

   - Make sure MongoDB is installed and running on your system or You are using Mongo cloud.
   - Update the MongoDB connection URL in the backend configuration file if necessary.

5. Setup env file:
   - Inside the backend folder create a .env file and fill in the proper details
  ```
DATABASE_URI = YOUR_MONGO_URL
PORT = CHOOSE_FREE_PORT
DB_NAME = DB_NAME
CLOUDINARY_URL= YOUR_CLOUDINARY_URL
```

6. Run the application:

```
cd  frontend
npm run dev

cd..

cd backend
npm start
```

7. Open your web browser and navigate to `http://localhost:5173` to access TaskEase.

### Usage

- Upon opening the application, users can sign up or log in to their accounts.
- Once logged in, users can create, update, and delete categories and tasks.
- Users can categorize tasks, set deadlines, mark tasks as completed, and mark tasks as important.
- The application provides a dashboard view to visualize tasks based on different parameters like importnat, and completed, etc.

### Technologies Used

- **Frontend**: React.js
- **Backend**: Express.js, MongoDB
- **Database**: MongoDB
- **Deployment**: Render (for backend), Netlify (for frontend)

### Screenshots

#### SignUp Page
![image](https://github.com/utkarshgupta04092003/mern-todo/assets/63789702/15812ed8-8ec5-411b-ab23-f267b8df262e)

#### Task view
![image](https://github.com/utkarshgupta04092003/mern-todo/assets/63789702/fb46aef7-8c74-48be-8fe8-f2c0fd65ac43)

#### Edit task view
![image](https://github.com/utkarshgupta04092003/mern-todo/assets/63789702/47ef6eec-7b00-471c-9b11-e277476423cb)

#### Profile view
![image](https://github.com/utkarshgupta04092003/mern-todo/assets/63789702/6ad971fe-0f58-4f5c-a926-9912a04fb62e)



### Contributions
Feel free to contribute to this repo.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
