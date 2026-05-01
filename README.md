# FlowTrack - Smart Team Workflow Manager

A modern, lightweight MERN-based task management and team workflow system designed for small to medium-sized teams. Streamline project management with intuitive workspaces, intelligent task prioritization, and real-time analytics.

![FlowTrack](https://img.shields.io/badge/MERN-Stack-blue?style=flat-square)
![License](https://img.shields.io/badge/license-ISC-green?style=flat-square)
![Status](https://img.shields.io/badge/status-Active-brightgreen?style=flat-square)

---

## 🎯 Features

### Core Functionality
- **JWT Authentication**: Secure user registration and login with role-based access control
- **Workspace Management**: Create isolated project spaces and manage team members
- **Task Creation & Assignment**: Create tasks with deadlines, priorities, and assign to team members
- **Smart Task Sorting**: Automatic prioritization (overdue → high priority → nearest deadline)
- **Status Tracking**: Real-time task status updates (Todo → In Progress → Done)
- **Deadline Highlighting**: Visual indicators for overdue (red), near-deadline (yellow), and normal tasks
- **Task Analytics**: Dashboard insights showing workload, overdue tasks, and high-priority items
- **Role-Based Access**: Admin (create tasks) vs Member (execute tasks) workflows

### Technical Highlights
- ✅ Responsive React UI with Vite bundler
- ✅ Express.js REST API with comprehensive error handling
- ✅ MongoDB Atlas cloud database with optimized indexes
- ✅ bcryptjs password hashing for security
- ✅ JWT token-based stateless authentication
- ✅ Middleware-level authorization checks
- ✅ Clean separation of concerns (MVC architecture)
- ✅ Production-ready error handling

---

## 🛠 Tech Stack

### Frontend
- **React 18**: Modern component-based UI framework
- **Vite**: Next-generation build tool with instant HMR
- **Axios**: Promise-based HTTP client with interceptors
- **React Router**: Client-side navigation
- **Lucide React**: Beautiful SVG icon library
- **CSS3**: Responsive styling with flexbox/grid

### Backend
- **Node.js**: JavaScript runtime for server-side code
- **Express.js**: Lightweight web application framework
- **MongoDB Atlas**: Cloud-hosted NoSQL database
- **Mongoose**: Object data modeling (ODM) library
- **jsonwebtoken**: JWT token generation and verification
- **bcryptjs**: Secure password hashing
- **CORS**: Cross-Origin Resource Sharing middleware
- **dotenv**: Environment variable management

### Tools & Services
- **MongoDB Atlas**: Cloud database hosting
- **Git/GitHub**: Version control and collaboration
- **npm**: Package manager
- **Nodemon**: Development server auto-reload

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- npm or yarn
- MongoDB Atlas account (free tier available)
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/santhoshyella/FlowTrack-Smart-Team-Workflow-Manager.git
cd FlowTrack
```

2. **Setup Backend**
```bash
cd backend

# Install dependencies
npm install

# Create .env file with your credentials
# Copy from .env.example
cp .env.example .env

# Edit .env with your MongoDB URI and JWT secret
nano .env
# Or use your preferred editor

# Start development server
npm run dev
# Backend runs on http://localhost:5000
```

3. **Setup Frontend**
```bash
cd ../frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server
npm run dev
# Frontend runs on http://localhost:5173
```

### Environment Variables

**Backend (.env)**
```
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your_long_random_secret_key_here
CLIENT_URL=http://localhost:5173
```

**Frontend (.env)**
```
VITE_API_URL=http://localhost:5000/api
```

---

## 📖 Usage

### For Admins
1. **Sign up** with admin role
2. **Create workspace** for a project
3. **Add team members** by searching their email
4. **Create tasks** with title, description, assignee, deadline, and priority
5. **Monitor analytics** to see team workload and bottlenecks
6. **Reassign tasks** as needed

### For Team Members
1. **Sign up** with member role
2. **View assigned workspaces** you're added to
3. **See your tasks** with smart prioritization (overdue first, then high priority)
4. **Update task status** as you work (Todo → In Progress → Done)
5. **Check analytics** to understand your workload
6. **Meet deadlines** with visual deadline indicators

### Example Workflow
```
Admin creates workspace "Website Redesign"
    ↓
Admin adds Jane and Bob to workspace
    ↓
Admin creates task "Design homepage" → assigned to Jane, due tomorrow, high priority
    ↓
Jane sees task highlighted in RED (high priority + near deadline)
    ↓
Jane marks task as "In Progress"
    ↓
Admin sees update immediately on dashboard
    ↓
Jane completes task, marks as "Done"
    ↓
Admin's analytics update automatically
```

---

## 📁 Project Structure

```
flowtrack/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection setup
│   ├── controllers/
│   │   ├── authController.js     # Signup, login, user management
│   │   ├── taskController.js     # Task CRUD and analytics
│   │   └── workspaceController.js # Workspace and member management
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT verification
│   │   └── roleMiddleware.js     # Role-based access control
│   ├── models/
│   │   ├── User.js               # User schema and methods
│   │   ├── Workspace.js          # Workspace schema
│   │   └── Task.js               # Task schema with indexes
│   ├── routes/
│   │   ├── authRoutes.js         # Authentication endpoints
│   │   ├── taskRoutes.js         # Task endpoints
│   │   └── workspaceRoutes.js    # Workspace endpoints
│   ├── utils/
│   │   ├── asyncHandler.js       # Async error wrapper
│   │   └── generateToken.js      # JWT token generation
│   ├── .env.example              # Environment template
│   └── server.js                 # Express app setup
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx        # Navigation header
│   │   │   ├── TaskCard.jsx      # Individual task component
│   │   │   └── WorkspaceCard.jsx # Workspace component
│   │   ├── context/
│   │   │   └── AuthContext.jsx   # Global auth state
│   │   ├── pages/
│   │   │   ├── Login.jsx         # Login page
│   │   │   ├── Signup.jsx        # Registration page
│   │   │   ├── Dashboard.jsx     # Main dashboard
│   │   │   ├── Workspace.jsx     # Workspace details
│   │   │   └── TaskBoard.jsx     # Kanban-style board
│   │   ├── services/
│   │   │   └── api.js            # Axios instance and API calls
│   │   ├── utils/
│   │   │   └── taskUtils.js      # Task utility functions
│   │   ├── App.jsx               # Main app component
│   │   ├── index.jsx             # React entry point
│   │   └── index.css             # Global styles
│   ├── .env.example              # Environment template
│   ├── vite.config.js            # Vite configuration
│   └── package.json
│
├── FLOWTRACK_COMPLETE_ANALYSIS.md # Detailed technical documentation
├── README.md                       # This file
└── package.json                    # Root package manifest
```

---

## 🔐 Authentication & Security

### How It Works
1. **Signup**: Email/password → bcryptjs hash → MongoDB stored
2. **Login**: Email/password → bcryptjs compare → JWT generated
3. **Protected Routes**: JWT verified → User attached to request → Authorization checked
4. **Stateless**: Server doesn't store sessions, JWT contains all needed info

### Security Features
- ✅ **Password Hashing**: bcryptjs with 10 salt rounds
- ✅ **JWT Tokens**: 7-day expiration, HMAC-SHA256 signature
- ✅ **Role-Based Access**: Middleware enforces permissions
- ✅ **Owner Verification**: Double-checks user ownership
- ✅ **Environment Secrets**: JWT_SECRET and MongoDB URI in .env
- ✅ **Input Validation**: Backend validates all inputs
- ✅ **CORS Protection**: Only allows requests from configured origin

---

## 📊 Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: "admin" | "member",
  createdAt: Date,
  updatedAt: Date
}
```

### Workspaces Collection
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  createdBy: ObjectId (ref: User),
  members: [ObjectId] (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

### Tasks Collection
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  workspaceId: ObjectId (ref: Workspace),
  assignedTo: ObjectId (ref: User),
  status: "todo" | "in-progress" | "done",
  priority: "low" | "medium" | "high",
  deadline: Date,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Authenticate user
- `GET /api/auth/me` - Get current user (protected)
- `GET /api/auth/users?search=name` - Search users (admin only)

### Workspaces
- `GET /api/workspaces` - List user's workspaces (protected)
- `POST /api/workspaces` - Create workspace (admin only)
- `GET /api/workspaces/:id` - Get workspace details (protected)
- `POST /api/workspaces/:id/members` - Add member (admin + creator only)

### Tasks
- `GET /api/tasks` - List user's tasks (protected)
- `POST /api/tasks` - Create task (admin only)
- `PATCH /api/tasks/:id/status` - Update task status (protected)
- `GET /api/tasks/analytics/summary` - Get task analytics (protected)

---

## 📈 Performance Optimizations

- **Database Indexing**: Strategic indexes on frequently-queried fields
- **Smart Sorting**: Single-pass algorithm for overdue → priority → deadline
- **Selective Queries**: Only fetch needed fields from database
- **Token Caching**: JWT tokens cached in localStorage
- **Error Handling**: Centralized error middleware prevents crashes
- **Request Validation**: Frontend validation reduces unnecessary API calls

---

## 🎓 Learning Outcomes

This project demonstrates:
- ✅ Full-stack MERN development
- ✅ JWT authentication and authorization
- ✅ Role-based access control (RBAC)
- ✅ MongoDB data modeling and indexing
- ✅ Express.js middleware and error handling
- ✅ React component architecture
- ✅ Axios interceptors for API calls
- ✅ RESTful API design
- ✅ Security best practices
- ✅ Production-ready code patterns

---

## 🤝 Contributing

Contributions are welcome! Here's how to help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Areas for Contribution
- Real-time collaboration with WebSockets
- Advanced filtering and search
- Task comments and activity feed
- File attachments
- Time tracking
- Email notifications
- Unit and integration tests
- Performance optimizations

---

## 📚 Documentation

For comprehensive technical documentation, architecture diagrams, and interview preparation guides, see:
- **[FLOWTRACK_COMPLETE_ANALYSIS.md](./FLOWTRACK_COMPLETE_ANALYSIS.md)** - 8000+ word detailed technical breakdown

---

## 🐛 Known Issues & Future Improvements

### Known Issues
- Token doesn't auto-refresh (7-day expiration)
- No real-time updates (requires page refresh for others' changes)
- Limited to localStorage (localStorage is XSS vulnerable)

### Planned Features
- [ ] Real-time collaboration with WebSockets
- [ ] Refresh token implementation
- [ ] Email notifications
- [ ] File attachments and cloud storage
- [ ] Task comments and activity feed
- [ ] Advanced filtering and reporting
- [ ] Time tracking and estimates
- [ ] API rate limiting
- [ ] Comprehensive test suite
- [ ] Docker containerization

---

## 📝 License

This project is licensed under the ISC License.

---

## 👨‍💻 Author

**Santhosh Yella**
- GitHub: [@santhoshyella](https://github.com/santhoshyella)

---

## 🙏 Acknowledgments

- MongoDB Atlas for cloud database hosting
- React community for excellent documentation
- Express.js community for powerful middleware ecosystem
- All contributors and supporters

---

## 📞 Support

If you have questions or need help:

1. **Check the documentation**: See [FLOWTRACK_COMPLETE_ANALYSIS.md](./FLOWTRACK_COMPLETE_ANALYSIS.md)
2. **Open an issue**: [GitHub Issues](https://github.com/santhoshyella/FlowTrack-Smart-Team-Workflow-Manager/issues)
3. **Contact**: Reach out via GitHub

---

## 🔗 Links

- **Repository**: https://github.com/santhoshyella/FlowTrack-Smart-Team-Workflow-Manager
- **Issues**: https://github.com/santhoshyella/FlowTrack-Smart-Team-Workflow-Manager/issues
- **MongoDB Atlas**: https://www.mongodb.com/cloud/atlas
- **React Documentation**: https://react.dev
- **Express.js Documentation**: https://expressjs.com
- **Vite Documentation**: https://vitejs.dev

---

**Made with ❤️ by Santhosh Yella**

⭐ If this project helped you, please consider giving it a star on GitHub!
