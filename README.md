# FlowTrack – Smart Team Workflow Manager

## 📌 About the Project

This project was built to solve a common problem I noticed while working in teams — managing tasks and tracking progress becomes confusing when everything is scattered.

So I created **FlowTrack**, a simple workflow manager where admins can assign tasks and team members can easily track and update their work.

The main goal of this project is to keep things **simple, clear, and useful for real-world team collaboration** rather than making it overly complex.

---

## ⚙️ Features

* User authentication (Signup / Login using JWT)
* Role-based access (Admin and Member)
* Workspace creation and team management
* Task creation and assignment
* Task status tracking (Todo → In Progress → Done)
* Priority system (High / Medium / Low)
* Deadline tracking with overdue highlighting
* Basic dashboard to view tasks and progress

---

## 🛠 Tech Stack

**Frontend:**

* React.js
* Vite
* Axios

**Backend:**

* Node.js
* Express.js

**Database:**

* MongoDB Atlas

**Authentication:**

* JWT (JSON Web Tokens)

**Deployment:**

* Railway

---

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/flowtrack.git
cd flowtrack
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm run dev
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 📖 How It Works

### Admin

* Creates a workspace
* Adds team members
* Assigns tasks with priority and deadlines

### Member

* Views assigned tasks
* Updates task status
* Tracks deadlines

---

## 💡 Why I Built This

While learning full-stack development, I wanted to build something beyond a basic CRUD application.

Many task management tools are either too complex or too simple.
So I tried to build something balanced — easy to use but still useful for team workflows.

This project helped me understand:

* How role-based systems work
* How frontend and backend interact
* How to structure a full-stack application

---

## 🔮 Future Improvements

* Real-time updates (WebSockets)
* Email notifications for deadlines
* Task comments and activity tracking
* Better analytics dashboard

---

## ⚠️ Note

This project is built as part of a full-stack assignment and is still being improved.

---

## 👨‍💻 Author

Santhosh Yella

---

## 🔗 Links

* Live App: (Add after deployment)
* GitHub Repo: (Your repo link)

---
