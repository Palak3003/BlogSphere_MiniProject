# BlogSphere_MiniProject

A full-stack blogging platform built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The application provides secure authentication, role-based access control, and an admin dashboard for managing users and moderating blog content.
-------------------------------------------------------------------------------------------------

Features

>User Features
>User registration and login
>JWT-based authentication
>Create, read, update, delete (CRUD) blog posts
>View all blogs and individual blog pages
>Responsive and user-friendly UI

 Security Features

>Password hashing using bcrypt
>Protected routes using JWT
>Input validation and error handling

Admin Features

>Admin dashboard
>View and manage all users
>Delete inappropriate blog posts
>Role-based access control (RBAC)

System Features

>RESTful API architecture
>Client-server architecture
>Modular and scalable backend
-------------------------------------------------------------------------------------------------
Tech Stack

Frontend

* React.js (Create React App)
* Tailwind CSS

Backend

* Node.js
* Express.js

Database

* MongoDB

Authentication

* JSON Web Token (JWT)
* bcrypt

-------------------------------------------------------------------------------------------------
Architecture


User (Browser)
      ↓
React Frontend (Client)
      ↓
API Requests (HTTP)
      ↓
Node.js + Express Backend (Server)
      ↓
MongoDB Database
      ↓
Response Sent Back
      ↓
Frontend Updates UI

-------------------------------------------------------------------------------------------------
Project Structure

BlogSphere_Miniproject/
│
├── client/                        # React Frontend
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── server/                        # Node.js + Express Backend
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
└── README.md
-------------------------------------------------------------------------------------------------

1️⃣ Clone Repository

git clone https://github.com/Palak3003/BlogSphere_MiniProject
cd BlogSphere_Miniproject

2️⃣ Backend Setup

cd server
npm install
npm run dev

👉 Runs on: http://localhost:5000

3️⃣ Frontend Setup (Create React App)

cd client
npm install
npm start

👉 Runs on: http://localhost:3000
-------------------------------------------------------------------------------------------------

🌐 Environment Variables

Create .env file inside server/

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
⚛️ Frontend Scripts (Create React App)

Inside client/, you can run:

npm start      # Run development server
npm test       # Run tests
npm run build  # Production build
Runs on: http://localhost:3000
Auto reload on changes
Optimized production build

-------------------------------------------------------------------------------------------------
API Endpoints
Authentication

POST /api/auth/register → Register user
POST /api/auth/login → Login user

Blogs

GET /api/blogs → Get all blogs
POST /api/blogs → Create blog
PUT /api/blogs/:id → Update blog
DELETE /api/blogs/:id → Delete blog

 Admin

GET /api/admin/users → Get all users
DELETE /api/admin/blog/:id → Delete blog
------------------------------------------------------------------------------------------------
 Security

*Password hashing using bcrypt
*JWT authentication
*Protected API routes
*Secure data handling
--------------------------------------------------------------------------------------------
 Objectives

*Build a full-stack MERN application
*Implement authentication and authorization
*Enable CRUD operations for blogs
*Develop admin control system
---------------------------------------------------------------------------------------------
 Future Improvements

* Comments & likes system
* Search functionality
* Image upload
* Notifications
-------------------------------------------------------------------------------------------------

Contributors

* Palak Bharadwaj
* Nishant Singh
* Nipun Rawat
* Nikhel soam
* Nupur Agarwal

-------------------------------------------------------------------------------------------------
❤️ Made With

React.js
Node.js
Express.js
MongoDB
-------------------------------------------------------------------------------------------------