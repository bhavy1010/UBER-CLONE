# API Documentation

## User Registration Endpoint

### Description

This endpoint allows new users to register in the Uber Clone application. It validates the user input, hashes the password, creates a new user# UBER-CLONE

A simple Uber-inspired project with separate user and captain authentication flows. The app includes a landing page, user login/signup screens, and captain login/signup screens.

## Overview

This project is divided into two main parts:

- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express + MongoDB + JWT authentication

## Main Features

- Home page with a modern Uber-style landing experience
- User login page
- User signup page
- Captain login page
- Captain signup page
- Separate routes for users and captains
- Backend support for registration and authentication

## Pages Included

### Home Page
- Landing screen shown at the root route
- Provides a starting point for users to continue to login

### User Flow
- User login: `/login`
- User signup: `/signup`

### Captain Flow
- Captain login: `/captain-login`
- Captain signup: `/captain-signup`

## Project Structure

```text
UBER-CLONE/
├── BACKEND/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── server.js
├── FRONTEND/
│   ├── src/
│   │   ├── pages/
│   │   └── App.jsx
│   └── package.json
└── README.md
```

## Tech Stack

### Frontend
- React
- Vite
- React Router DOM
- Tailwind CSS

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- JWT
- bcrypt

## Getting Started

### Frontend

```bash
cd FRONTEND
npm install
npm run dev
```

The frontend development server will start using Vite.

### Backend

```bash
cd BACKEND
npm install
node server.js
```

## Notes

This project is a beginner-friendly clone that focuses on the UI and authentication flow for both users and captains. It can be extended later with ride booking, driver tracking, maps, and payments.
 in the database, and returns an authentication token.

---

### Endpoint Details

**URL:** `/users/register`

**Method:** `POST`

**Content-Type:** `application/json`

---

### Request Body

The endpoint expects a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "password": "string"
}
```

#### Field Specifications

| Field                | Type   | Required | Validation Rules                   |
| -------------------- | ------ | -------- | ---------------------------------- |
| `fullname.firstname` | string | Yes      | Minimum 3 characters               |
| `fullname.lastname`  | string | No       | Minimum 3 characters (if provided) |
| `email`              | string | Yes      | Must be a valid email format       |
| `password`           | string | Yes      | Minimum 6 characters               |

---

### Example Request

```bash
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "password": "securePassword123"
  }'
```

---

### Response Codes

#### 201 - Created (Success)

User registered successfully. Returns authentication token and user data.

**Response Body:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "socketId": null
  }
}
```

#### 400 - Bad Request (Validation Error)

One or more validation rules failed.

**Response Body:**

```json
{
  "error": [
    {
      "type": "field",
      "value": "",
      "msg": "firstname must be 3 characters long",
      "path": "fullname.firstname",
      "location": "body"
    },
    {
      "type": "field",
      "value": "invalidemail",
      "msg": "invalid Email",
      "path": "email",
      "location": "body"
    }
  ]
}
```

---

### Validation Error Messages

| Field                | Error Message                         |
| -------------------- | ------------------------------------- |
| `email`              | "invalid Email"                       |
| `fullname.firstname` | "firstname must be 3 characters long" |
| `password`           | "password must be 6 characters long"  |

---

### Security Notes

- Passwords are hashed using bcrypt (salt rounds: 10) before being stored
- JWT tokens are generated using `process.env.JWT_SECRET`
- Email addresses must be unique in the database

---

### Implementation Details

**File Location:** `/controllers/user.constroller.js`

**Dependencies:**

- `express-validator` - For request validation
- `bcrypt` - For password hashing
- `jsonwebtoken` - For token generation
- MongoDB/Mongoose - For database operations
