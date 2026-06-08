# API Documentation

## User Registration Endpoint

### Description

This endpoint allows new users to register in the Uber Clone application. It validates the user input, hashes the password, creates a new user in the database, and returns an authentication token.

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

---

## User Login Endpoint

### Description

This endpoint allows registered users to log in to the Uber Clone application. It validates the user credentials, verifies the password, and returns an authentication token upon successful login.

---

### Endpoint Details

**URL:** `/users/login`

**Method:** `POST`

**Content-Type:** `application/json`

---

### Request Body

The endpoint expects a JSON object with the following structure:

```json
{
  "email": "string",
  "password": "string"
}
```

#### Field Specifications

| Field      | Type   | Required | Validation Rules             |
| ---------- | ------ | -------- | ---------------------------- |
| `email`    | string | Yes      | Must be a valid email format |
| `password` | string | Yes      | Minimum 6 characters         |

---

### Example Request

```bash
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securePassword123"
  }'
```

---

### Response Codes

#### 200 - OK (Success)

User logged in successfully. Returns authentication token and user data.

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
      "value": "invalidemail",
      "msg": "invalid Email",
      "path": "email",
      "location": "body"
    },
    {
      "type": "field",
      "value": "short",
      "msg": "password must be 6 characters long",
      "path": "password",
      "location": "body"
    }
  ]
}
```

#### 401 - Unauthorized (Invalid Credentials)

Email or password is incorrect.

**Response Body:**

```json
{
  "error": "Invalid email or password"
}
```

---

### Validation Error Messages

| Field      | Error Message                     |
| ---------- | --------------------------------- |
| `email`    | "invalid Email"                   |
| `password` | "password must be 6 characters long" |

---

### Security Notes

- Passwords are compared using bcrypt's `compareSync` method
- JWT tokens are generated using `process.env.JWT_SECRET`
- Returns generic error message "Invalid email or password" for both non-existent emails and incorrect passwords to prevent email enumeration attacks
