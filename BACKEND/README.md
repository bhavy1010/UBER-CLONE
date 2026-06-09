# 🚖 Uber Clone Backend API

![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-green)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![License](https://img.shields.io/badge/License-MIT-blue)

Backend API for the Uber Clone application built with Node.js, Express.js, MongoDB, JWT Authentication and Socket.IO.

---

## 📚 Table of Contents

- User APIs
  - Register User
  - Login User
  - User Profile
  - Logout User
- Captain APIs
  - Register Captain
  - Login Captain
  - Captain Profile
  - Logout Captain
- Authentication
- Error Handling

# 👤 User Registration Endpoint

## Description

This endpoint allows new users to register in the Uber Clone application. It validates user information, hashes the password, creates a new user account, and returns an authentication token.

---

## Endpoint Details

| Property     | Value              |
| ------------ | ------------------ |
| URL          | `/users/register`  |
| Method       | `POST`             |
| Content-Type | `application/json` |

---

## Request Body

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com",
  "password": "securePassword123"
}
```

### Field Specifications

| Field              | Type   | Required | Validation           |
| ------------------ | ------ | -------- | -------------------- |
| fullname.firstname | String | Yes      | Minimum 3 characters |
| fullname.lastname  | String | No       | Minimum 3 characters |
| email              | String | Yes      | Valid email format   |
| password           | String | Yes      | Minimum 6 characters |

---

## Example Request

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

## Success Response

### 201 Created

```json
{
  "token": "jwt_token_here",
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

---

## Error Responses

### 400 Bad Request

```json
{
  "errors": [
    {
      "msg": "firstname must be at least 3 characters long"
    }
  ]
}
```

### 400 User Already Exists

```json
{
  "message": "User with this email already exists"
}
```

---

## Security Notes

* Passwords are hashed using bcrypt with 10 salt rounds.
* JWT tokens are generated using `JWT_SECRET`.
* Email addresses must be unique.
* Password field is never returned in API responses.

---

# 🔐 User Login Endpoint

## Description

This endpoint allows registered users to log in to the Uber Clone application. It validates credentials, verifies the password, and returns an authentication token.

---

## Endpoint Details

| Property     | Value              |
| ------------ | ------------------ |
| URL          | `/users/login`     |
| Method       | `POST`             |
| Content-Type | `application/json` |

---

## Request Body

```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

### Field Specifications

| Field    | Type   | Required | Validation           |
| -------- | ------ | -------- | -------------------- |
| email    | String | Yes      | Valid email format   |
| password | String | Yes      | Minimum 6 characters |

---

## Example Request

```bash
curl -X POST http://localhost:3000/users/login \
-H "Content-Type: application/json" \
-d '{
  "email": "john@example.com",
  "password": "securePassword123"
}'
```

---

## Success Response

### 200 OK

```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com"
  }
}
```

---

## Error Responses

### 400 Validation Error

```json
{
  "errors": [
    {
      "msg": "invalid Email"
    }
  ]
}
```

### 401 Unauthorized

```json
{
  "message": "Invalid email or password"
}
```

---

## Security Notes

* Passwords are verified using bcrypt.
* JWT tokens expire after 24 hours.
* Invalid credentials return a generic error message.

---

# 👤 User Profile Endpoint

## Description

Returns information about the currently authenticated user.

---

## Endpoint Details

| Property       | Value            |
| -------------- | ---------------- |
| URL            | `/users/profile` |
| Method         | `GET`            |
| Authentication | Required         |

---

## Headers

```http
Authorization: Bearer <JWT_TOKEN>
```

---

## Example Request

```bash
curl -X GET http://localhost:3000/users/profile \
-H "Authorization: Bearer YOUR_TOKEN"
```

---

## Success Response

### 200 OK

```json
{
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com"
  }
}
```

---

## Error Response

### 401 Unauthorized

```json
{
  "message": "Unauthorized"
}
```

---

# 🚪 User Logout Endpoint

## Description

Logs out the currently authenticated user by clearing authentication cookies and invalidating the token.

---

## Endpoint Details

| Property       | Value           |
| -------------- | --------------- |
| URL            | `/users/logout` |
| Method         | `GET`           |
| Authentication | Required        |

---

## Headers

```http
Authorization: Bearer <JWT_TOKEN>
```

---

## Example Request

```bash
curl -X GET http://localhost:3000/users/logout \
-H "Authorization: Bearer YOUR_TOKEN"
```

---

## Success Response

### 200 OK

```json
{
  "message": "Logged out successfully"
}
```

---

## Error Response

### 401 Unauthorized

```json
{
  "message": "Unauthorized"
}
```

---

## Security Notes

* Requires a valid JWT token.
* Authentication cookie is cleared during logout.
* Logged-out tokens can no longer access protected routes.



# 🚖 Captain Registration Endpoint

## Description

This endpoint allows new captains (drivers) to register in the Uber Clone application. It validates the captain's information, hashes the password, creates a new captain account in the database, and returns an authentication token.

---

## Endpoint Details

| Property     | Value                |
| ------------ | -------------------- |
| URL          | `/captains/register` |
| Method       | `POST`               |
| Content-Type | `application/json`   |

---

## Request Body

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com",
  "password": "securePassword123",
  "vehicle": {
    "color": "White",
    "plate": "GJ01AB1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Field Specifications

| Field               | Type   | Required | Validation           |
| ------------------- | ------ | -------- | -------------------- |
| fullname.firstname  | String | Yes      | Minimum 3 characters |
| fullname.lastname   | String | Yes      | Minimum 3 characters |
| email               | String | Yes      | Valid email format   |
| password            | String | Yes      | Minimum 6 characters |
| vehicle.color       | String | Yes      | Minimum 3 characters |
| vehicle.plate       | String | Yes      | Minimum 3 characters |
| vehicle.capacity    | Number | Yes      | Minimum value 1      |
| vehicle.vehicleType | String | Yes      | car, bike, auto      |

---

## Example Request

```bash
curl -X POST http://localhost:3000/captains/register \
-H "Content-Type: application/json" \
-d '{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com",
  "password": "securePassword123",
  "vehicle": {
    "color": "White",
    "plate": "GJ01AB1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}'
```

---

## Success Response

### 201 Created

```json
{
  "token": "jwt_token_here",
  "captain": {
    "_id": "507f1f77bcf86cd799439011",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "status": "active",
    "vehicle": {
      "color": "White",
      "plate": "GJ01AB1234",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

---

## Error Responses

### 400 Bad Request

```json
{
  "errors": [
    {
      "msg": "firstname must be at least 3 characters long"
    }
  ]
}
```

### 400 Captain Already Exists

```json
{
  "message": "Captain with this email already exists"
}
```

---

## Security Notes

* Passwords are hashed using bcrypt with 10 salt rounds.
* JWT tokens are generated using `JWT_SECRET`.
* Email addresses must be unique.
* Password field is never returned in API responses.

---

## Database Collection

### Captains

```js
{
  fullname: {
    firstname: String,
    lastname: String
  },
  email: String,
  password: String,
  socketId: String,
  status: String,
  vehicle: {
    color: String,
    plate: String,
    capacity: Number,
    vehicleType: String
  },
  location: {
    lat: Number,
    lng: Number
  }
}
```
