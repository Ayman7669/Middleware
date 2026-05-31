# Backend Middleware Learning Project 🚀

This repository contains my backend learning projects built with **Node.js** and **Express.js**. The main focus of these projects is understanding **middleware**, **authentication**, **request handling**, and **basic API development**.

---

# 📅 Day 1 - Express Middleware & Calculator API

## Overview

In this project, I learned how Express middleware works by implementing:

* Custom Rate Limiter Middleware
* Request Logger Middleware
* Authentication Middleware
* Basic Calculator APIs

---

## Features

### 1. Rate Limiter Middleware

Limits incoming requests to 5 requests.

```javascript
function rateLimiter(req, res, next)
```

* Tracks total requests.
* Allows only the first 5 requests.
* Returns:

```json
{
  "msg": "limit exceed"
}
```

after the limit is reached.

---

### 2. Logger Middleware

Logs request details:

* HTTP Method
* Route
* Request Time

Example Output:

```bash
Request Received
Method: GET
Route: /sum/5/10
Time: 2025-08-25T10:30:00.000Z
```

---

### 3. Authentication Middleware

Checks for authorization header.

Required Header:

```http
Authorization: ayman
```

Response if unauthorized:

```json
{
  "message": "not authorized to access"
}
```

---

## API Endpoints

### Sum

```http
GET /sum/:a/:b
```

Example:

```http
GET /sum/10/20
```

Response:

```json
{
  "result": 30,
  "name": "Ayman"
}
```

---

### Multiply

```http
GET /multiply/:a/:b
```

Response:

```json
{
  "result": 200
}
```

---

### Divide

```http
GET /divide/:a/:b
```

Response:

```json
{
  "result": 5
}
```

---

### Subtract

```http
GET /subtract/:a/:b
```

Response:

```json
{
  "result": -10
}
```

---

# 📅 Day 2 - User Authentication API

## Overview

In this project, I learned:

* User Signup
* User Signin
* Token Generation
* Protected Routes
* Authentication Middleware

---

## Features

### Logging Middleware

Logs:

* Request Method
* Request Body

Example:

```bash
POST
{
  "username": "rohit",
  "password": "merohit"
}
```

---

### Authentication Middleware

Checks user token from request headers.

Required Header:

```http
token: <user_token>
```

If token is valid:

* User is authenticated.
* User information is attached to `req.user`.

If invalid:

```json
{
  "msg": "invalid user/token"
}
```

---

## API Endpoints

### Signup

Create a new user.

```http
POST /signup
```

Request Body:

```json
{
  "username": "john",
  "password": "12345"
}
```

Response:

```json
{
  "msg": "sign-up successfully"
}
```

---

### Signin

Authenticate an existing user.

```http
POST /signin
```

Request Body:

```json
{
  "username": "john",
  "password": "12345"
}
```

Response:

```json
{
  "msg": "valid user",
  "token": 52
}
```

---

### Get Current User

Protected Route

```http
GET /me
```

Headers:

```http
token: 52
```

Response:

```json
{
  "username": "john"
}
```

---

# Tech Stack

* Node.js
* Express.js
* JavaScript
* REST API

---

# What I Learned

### Day 1

* Middleware execution flow
* Request/Response lifecycle
* Custom rate limiting
* Logging requests
* Route protection

### Day 2

* User authentication basics
* Token-based authorization
* Protected routes
* Request validation
* User management concepts

---

# Run Locally

Install dependencies:

```bash
npm install
```

Start server:

```bash
node index.js
```

Server runs on:

```bash
http://localhost:8080
```

---

# Future Improvements

* JWT Authentication
* Password Hashing with bcrypt
* Database Integration (MongoDB/PostgreSQL)
* Proper Rate Limiting using express-rate-limit
* Input Validation
* Error Handling Middleware

---

## Author

**Ayman**

Backend Development Learning Journey 🚀
