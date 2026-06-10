# 🚖 UBER CLONE

<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" width="200"/>
</p>

<p align="center">
  A full-stack Uber-inspired ride booking application built with the MERN Stack.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-blue?logo=react">
  <img src="https://img.shields.io/badge/Node.js-Backend-green?logo=node.js">
  <img src="https://img.shields.io/badge/MongoDB-Database-green?logo=mongodb">
  <img src="https://img.shields.io/badge/JWT-Authentication-orange">
  <img src="https://img.shields.io/badge/TailwindCSS-Styling-38BDF8?logo=tailwindcss">
</p>

---

## 🌟 Project Overview

Uber Clone is a modern ride-booking application inspired by Uber. The project includes separate authentication flows for Users and Captains (Drivers), secure JWT authentication, MongoDB integration, and a responsive UI built with React and Tailwind CSS.

---

## ✨ Features

### 👤 User Features

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* User Profile
* User Logout

### 🚖 Captain Features

* Captain Registration
* Captain Login
* Vehicle Registration
* Protected Routes
* Captain Profile
* Captain Logout

### 🔒 Security Features

* Password Hashing using bcrypt
* JWT Authentication
* Token Expiration (24 Hours)
* Blacklisted Token Logout System
* Protected API Routes

---

## 📸 Application Flow

### User Flow

```text
Home
 ↓
User Login
 ↓
User Signup
 ↓
User Profile
```

### Captain Flow

```text
Home
 ↓
Captain Login
 ↓
Captain Signup
 ↓
Captain Dashboard
```

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* React Router DOM
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* express-validator
* cookie-parser

---

## 📂 Project Structure

```text
UBER-CLONE
│
├── BACKEND
│   ├── controllers
│   ├── db
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── services
│   ├── app.js
│   └── server.js
│
├── FRONTEND
│   ├── public
│   ├── src
│   │   ├── pages
│   │   ├── assets
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Clone Repository

```bash
git clone https://github.com/yourusername/uber-clone.git
cd uber-clone
```

---

## ⚙️ Backend Setup

### Install Dependencies

```bash
cd BACKEND
npm install
```

### Create Environment Variables

Create a `.env` file:

```env
PORT=4000
DB_CONNECT=mongodb://127.0.0.1:27017/uber-clone
JWT_SECRET=your_secret_key
```

### Start Backend

```bash
npm start
```

Server runs on:

```text
http://localhost:4000
```

---

## 🎨 Frontend Setup

### Install Dependencies

```bash
cd FRONTEND
npm install
```

### Start Development Server

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## 📄 Pages

| Page           | Route           |
| -------------- | --------------- |
| Home           | /               |
| User Login     | /login          |
| User Signup    | /signup         |
| Captain Login  | /captain-login  |
| Captain Signup | /captain-signup |

---

## 🔐 Authentication

The application uses JSON Web Tokens (JWT).

### Authentication Flow

```text
Register/Login
        ↓
Generate JWT
        ↓
Store Token
        ↓
Access Protected Routes
        ↓
Logout
        ↓
Blacklist Token
```

---

## 🎯 Future Features

* Ride Booking
* Google Maps Integration
* Real-Time Location Tracking
* Socket.IO
* Ride History
* Fare Calculation
* Online Payments
* Captain Availability System

---

## 👨‍💻 Developer

### Bhavy Patel

MERN Stack Developer

Built for learning modern full-stack web development using React, Node.js, Express, and MongoDB.

---

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub.


# 🔗 User & Captain Authentication Integration

Today the application was integrated with the backend authentication APIs for both Users and Captains.

## User Flow

### User Signup

When a user submits the signup form:

```http
POST /users/register
```

* User details are sent to the backend using Axios.
* The backend creates a new user account.
* A JWT token is returned.
* The token is stored in `localStorage`.
* User data is stored in `UserContext`.
* The user is automatically redirected to:

```text
/home
```

### User Login

When a user logs in:

```http
POST /users/login
```

* Credentials are verified by the backend.
* A JWT token is returned.
* The token is stored in `localStorage`.
* User information is stored in `UserContext`.
* The user is redirected to:

```text
/home
```

---

## Captain Flow

### Captain Signup

When a captain submits the signup form:

```http
POST /captains/register
```

* Captain details and vehicle information are sent to the backend.
* The backend creates a new captain account.
* A JWT token is returned.
* The token is stored in `localStorage`.
* Captain data is stored in `CaptainContext`.
* The captain is automatically redirected to:

```text
/captain-home
```

### Captain Login

When a captain logs in:

```http
POST /captains/login
```

* Credentials are verified by the backend.
* A JWT token is returned.
* The token is stored in `localStorage`.
* Captain information is stored in `CaptainContext`.
* The captain is redirected to:

```text
/captain-home
```

---

## Protected Routes

### User Protected Routes

The `UserProtectWrapper`:

* Checks for JWT token in `localStorage`
* Calls:

```http
GET /users/profile
```

* If the token is valid, the requested page is rendered.
* If the token is invalid or missing, the user is redirected to:

```text
/login
```

### Captain Protected Routes

The `CaptainProtectWrapper`:

* Checks for JWT token in `localStorage`
* Calls:

```http
GET /captains/profile
```

* If the token is valid, the requested page is rendered.
* If the token is invalid or missing, the captain is redirected to:

```text
/captain-login
```

---

## React Context Integration

Two separate Context APIs are used:

### User Context

```text
UserDataContext
```

Stores authenticated user information across the application.

### Captain Context

```text
CaptainDataContext
```

Stores authenticated captain information across the application.

This separation ensures that User and Captain authentication states remain independent throughout the application.
