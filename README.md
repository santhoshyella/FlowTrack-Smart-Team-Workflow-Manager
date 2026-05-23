# FlowTrack – Smart Team Workflow Manager (Powered by Antigravity AI)

## 📌 About the Project

This project was built to solve a common problem noticed while working in teams — managing tasks and tracking progress becomes confusing when everything is scattered.

So I created **FlowTrack**, a smart workflow manager where admins can assign tasks and team members can easily track and update their work. 

To bring real-world enterprise intelligence, **FlowTrack runs with the help of the Google Antigravity Agent Framework**. Unlike standard, passive MERN stack REST APIs, FlowTrack features a **Self-Muting Decision Engine** in the backend. When triggered, autonomous AI agents retrieve pending tasks, analyze workloads and deadlines, predict task completion failure risks, compile automatic subtasks, and actively write/mutate database records.

---

## ⚙️ Features

* **✨ Antigravity Workflow Optimizer Agent**: A self-mutating decision engine that automatically reads database state, predicts risks, generates checklists, and writes back updates using the official Google Generative AI SDK (`gemini-1.5-flash`).
* **📈 Smart Task Queue**: Live updates of automated task analysis, displaying AI-generated subtasks checklist, risk meter badges, and italicized diagnostic summaries.
* **🔒 Secure API & Environment Control**: Full environment management securing the Google Gemini AI Layer.
* * User authentication (Signup / Login using JWT)
* * Role-based access (Admin and Member)
* * Workspace creation and team management
* * Task creation and assignment
* * Task status tracking (Todo → In Progress → Done)
* * Priority system (High / Medium / Low)
* * Deadline tracking with overdue highlighting
* * Basic dashboard to view tasks and progress

---

## 🛠 Tech Stack

**AI Engine:**

* **Google Antigravity Agent Framework**
* **Official Google Generative AI SDK (`gemini-1.5-flash`)**

**Frontend:**

* React.js
* Vite
* Axios
* Lucide Icons

**Backend:**

* Node.js
* Express.js
* Dotenv

**Database:**

* MongoDB Atlas (Mongoose ODM)

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
