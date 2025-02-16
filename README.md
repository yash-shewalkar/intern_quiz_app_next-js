# Quiz App in Next.js

# 📌 Developed with Next.js, Prisma, and PostgreSQL

## Getting Started

### Prerequisites

Make sure you have the following installed:
- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yash-shewalkar/intern_quiz_app_next-js.git
    cd intern_quiz_app_next-js
    ```

2. Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```
3. Setup PostgreSQL using Docker
    - Run the following command to start a PostgreSQL database using Docker:
    - Copy `docker run --name quizdb -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=quizdb -p 5432:5432 -d postgres`
    - To stop the database later, run:
    - `docker stop quizdb`
    - To start again
    - `docker start quizdb`

4.  Set Up Prisma & Migrate Database
    - `npx prisma init`
    - Generate Prisma client and apply migrations:
    - `npx prisma migrate dev --name init`
    - check the db
    - `npx prisma studio`

      
5. Set up environment variables:
    - Copy `.env.example` to `.env` and fill in the required environment variables.
    - example: `DATABASE_URL=postgresql://{uname}:{password}@localhost:5432/quizdb`
### Running the Project

1. Start the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    ```

2. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

To build the project for production, run:
```bash
npm run build
# or
yarn build
```


# 📖 API Documentation - Quiz Management System  

This API allows users (teachers) to create, manage, and schedule quizzes.  

## 📌 Base URL  
`http://localhost:3000/api`

---

## 🔑 Authentication  

All API requests require authentication. Ensure you set the **teacherId** cookie after login.  

---

## 📜 API Endpoints  

### **🟢 User Authentication**  

#### **1️⃣ Login**  
**Endpoint:**  
```http
POST /api/login
```
Request Body:
```http
{
  "username": "teacher1",
  "password": "securepassword"
}
```
Response: 
```http
{
  "message": "Login successful",
  "userId": "12e1e132e2312s13e1qqd31wedqewe"
}
```
### 📌 Note: The response sets a cookie (teacherId) to maintain session authentication.

##📚 Quizzes Management

### 2️⃣ Create a Quiz
Endpoint:
```http
POST /api/quizzes
```
Headers:
```http
Content-Type: application/json
```
Request Body:
```http
{
  "title": "Math Quiz",
  "description": "Basic Algebra Quiz",
  "scheduledAt": "2025-02-20T10:00:00Z",
  "questions": 10,
  "maxScore": 100
}
```
Response:
```http
{
  "message": "Quiz created successfully",
  "quizId": "quiz_123"
}
```
### 3️⃣ Fetch All Quizzes
Endpoint:
```http
GET /api/quizzes
```
Response:
```http
[
  {
    "id": "quiz_123",
    "title": "Math Quiz",
    "description": "Basic Algebra Quiz",
    "scheduledAt": "2025-02-20T10:00:00Z",
    "questions": 10,
    "maxScore": 100
  }
]
```
### 4️⃣ Fetch a Single Quiz
Endpoint:
```http
GET /api/quizzes/{quizId}
```
Response:
```http
{
  "id": "quiz_123",
  "title": "Math Quiz",
  "description": "Basic Algebra Quiz",
  "scheduledAt": "2025-02-20T10:00:00Z",
  "questions": 10,
  "maxScore": 100
}
```

### 5️⃣ Update a Quiz
Endpoint:
```http
PUT /api/quizzes/{quizId}
```
Headers:
```http
Content-Type: application/json
```
Request Body:
```http
{
  "title": "Updated Math Quiz",
  "description": "Advanced Algebra Quiz",
  "scheduledAt": "2025-02-22T12:00:00Z",
  "questions": 15,
  "maxScore": 150
}
```
Response:
```http
{
  "message": "Quiz updated successfully"
}
```

### 6️⃣ Delete a Quiz
Endpoint:
```http
DELETE /api/quizzes/{quizId}
```
Response:
```http
{
  "message": "Quiz deleted successfully"
}
```
### 🚪 User Logout
Endpoint:
```http
POST /api/logout
```
Response:
```http
{
  "message": "Logout successful"
}
```


## 🛠 Testing in Postman

Login with `POST` `/api/login` and copy the teacherId cookie.
Include the cookie in all requests.
Use `GET`,`POST`, `PUT`, and `DELETE` requests for managing quizzes.
Logout using `POST` `/api/logout`.


