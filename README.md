# 🚀 City-Hand Backend API

City-Hand is a **scalable local service provider backend application** designed to connect users with trusted home and technical service providers. It handles **service management, booking system, authentication, and role-based access control** with a clean and structured REST API.

---

## 🌐 Live Links

- 🔗 Frontend: https://city-hand-chi.vercel.app/  
- 🔗 Backend Base URL: https://city-hand-backend.onrender.com/  
- 📘 API Documentation (Postman): https://documenter.getpostman.com/view/41187911/2sBXirjoqX  

---

## 📂 Repositories

- 🖥️ Frontend Repo: https://github.com/Antor-Sarker/city-hand  
- ⚙️ Backend Repo: https://github.com/Antor-Sarker/city-hand-backend  

---

## 🛠️ Tech Stack

```bash
## 🛠️ Tech Stack

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB
- Mongoose (ODM)

**Authentication & Security**
- JWT (Access & Refresh Token)
- HTTP-only Cookies (Secure session handling)
- Role-Based Access Control (RBAC)

**File Handling**
- Multer (File upload middleware)
- Cloudinary (Image storage & CDN)
```  

---

## 🧠 System Overview

The backend follows a **RESTful architecture** with clear separation of concerns:

- Controllers → Business logic  
- Routes → API endpoints  
- Middleware → Auth, RBAC, validation  
- Models → Database schema (Mongoose)  

## ✨ Core Features

### 🛠️ Service Management
- Get all services
- Get service details by ID
- Category-based filtering
- Search functionality (query-based)
- Admin can create services with image upload

---

### 📅 Booking System
- Create Service booking with validation
- Prevent duplicate bookings
- Dynamic booking update (PATCH)
- User booking history endpoint
- User-specific booking history
- Admin can view all bookings
- Booking status control:
  - Pending
  - Confirmed
  - Completed
  - Cancelled
---

### 👤 User Management
- Get user profile information
- Update profile (PATCH)
- Role included in auth response
- User booking history tracking
---

### ⚙️ Admin Features
- Manage all bookings
- Add new services with image upload
- Role-based protected routes
---

### 🔐 Authentication
- User registration & login with JWT
- Refresh token flow with secure HTTP-only cookies
- Logout functionality

---

### 🛡️ Authorization (RBAC)
- Protected routes using JWT middleware
- Role-based access (Admin / User)
- Admin-only endpoints for service & booking management

---

## 📡 API Overview
### API Documentation (Postman): https://documenter.getpostman.com/view/41187911/2sBXirjoqX
### 🔑 Auth Routes
- POST /api/auth/register  
- POST /api/auth/login  
- POST /api/auth/refresh-token  
- POST /api/auth/logout  

### 👤 User Routes
- GET /api/user/profile  
- PATCH /api/user/profile  
- GET /api/user/bookings  

### 🛠️ Service Routes
- GET /api/service
- GET /api/service?category=it
- GET /api/service?search=clean
- GET /api/service/:id  
- POST /api/service (Admin)  

### 📅 Booking Routes
- POST /api/booking  
- PATCH /api/booking/:id  
- GET /api/booking (Admin)  

---


### 🧪 🖥️ Frontend Highlights (Next.js)
- JWT-based authentication with session persistence
- Role-based dashboard (Admin / User)
- Booking management UI with filters
- Service filtering, search & category system
- Image upload during service creation
- Responsive dashboard layout
- Axios API service wrapper
- Middleware-based route protection


### 🧪 Error Handling & Improvements
- Proper HTTP status codes (200, 201, 400, 401, 403, 500)
- Duplicate data validation
- Improved API structure and naming conventions
- Consistent response format
---


### 📌 Future Improvements

- 🔔 Notification system
- ⚡ Real-time updates (Socket.IO)
- 📊 Admin analytics dashboard
- 💳 Payment integration

## ⚙️ Installation & Setup

### 📌 Prerequisites
- Node.js installed  
- MongoDB database (local or cloud)  

---

### 🔧 Run Locally

```bash
# Clone the repository
git clone https://github.com/Antor-Sarker/city-hand-backend.git

# Go to project folder
cd city-hand-backend

# Install dependencies
npm install
```


### 🔑 Environment Variables
Create a .env file in root directory and add:
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
NODE_ENV=dev
FRONTEND_URL=http://localhost:3000

ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

```


### ▶️   Start Server
```bash
# Development mode
npm run dev
# Production mode
npm start

#Server will run on:
http://localhost:5000
```


### 👨‍💻 Author
- Antor Sarker
- GitHub: https://github.com/Antor-Sarker

### 📄 License
- This project is licensed under the MIT License.