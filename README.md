# Smart Task Manager API

A RESTful API built with Node.js, Express, and MongoDB for managing user-specific tasks with secure JWT authentication, filtering, pagination, validation, and robust error handling.

## Features

- User registration and login with hashed passwords.
- JWT-based authentication for protected routes.
- Task CRUD operations:
  - Create task
  - List tasks
  - Get a task by ID
  - Update task
  - Delete task
- Task filtering by:
  - Status (`pending`, `in-progress`, `completed`)
  - Due date (specific date)
- Pagination for task listing (`page` and `limit` query parameters).
- Input validation for auth and task operations.
- Centralized not-found and error handling middleware.
- Environment-based configuration via `.env`.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JSON Web Tokens (JWT)
- **Password Hashing:** bcryptjs
- **Environment Variables:** dotenv

## Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd Smart-Task-Manager-API
```

2. Install dependencies:

```bash
npm install
```

3. Create environment file:

```bash
cp .env.example .env
```

4. Update `.env` values as needed.

## How to Run

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

The API runs on `http://localhost:5000` by default.

## API Endpoints

Base URL: `http://localhost:5000/api`

### Health Check

- **GET** `/health`

#### Response

```json
{
  "success": true,
  "message": "Smart Task Manager API is running"
}
```

---

### Auth Endpoints

#### Register User

- **POST** `/auth/register`

##### Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

##### Response

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "66d2e05bcf88d84ebf84f9a1",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "<jwt-token>"
  }
}
```

#### Login User

- **POST** `/auth/login`

##### Request Body

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

##### Response

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "66d2e05bcf88d84ebf84f9a1",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "<jwt-token>"
  }
}
```

---

### Task Endpoints (Protected)

Use header:

```http
Authorization: Bearer <jwt-token>
```

#### Create Task

- **POST** `/tasks`

##### Request Body

```json
{
  "title": "Prepare sprint report",
  "description": "Compile completed stories and blockers",
  "status": "pending",
  "dueDate": "2026-02-15"
}
```

#### List Tasks (with filtering & pagination)

- **GET** `/tasks?status=pending&dueDate=2026-02-15&page=1&limit=5`

##### Response

```json
{
  "success": true,
  "data": [
    {
      "_id": "66d2e5f6cf88d84ebf84f9ab",
      "title": "Prepare sprint report",
      "description": "Compile completed stories and blockers",
      "status": "pending",
      "dueDate": "2026-02-15T00:00:00.000Z",
      "user": "66d2e05bcf88d84ebf84f9a1",
      "createdAt": "2026-02-10T08:00:00.000Z",
      "updatedAt": "2026-02-10T08:00:00.000Z",
      "__v": 0
    }
  ],
  "pagination": {
    "total": 1,
    "page": 1,
    "limit": 5,
    "totalPages": 1
  }
}
```

#### Get Task By ID

- **GET** `/tasks/:id`

#### Update Task

- **PUT** `/tasks/:id`

##### Request Body (partial allowed)

```json
{
  "status": "completed"
}
```

#### Delete Task

- **DELETE** `/tasks/:id`

##### Response

```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

## Environment Variables

Create a `.env` file in the root:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/smart-task-manager
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=1d
```

## Folder Structure

```text
Smart-Task-Manager-API/
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── src/
    ├── app.js
    ├── server.js
    ├── config/
    │   └── db.js
    ├── controllers/
    │   ├── authController.js
    │   └── taskController.js
    ├── middleware/
    │   ├── authMiddleware.js
    │   ├── errorMiddleware.js
    │   └── validationMiddleware.js
    ├── models/
    │   ├── Task.js
    │   └── User.js
    ├── routes/
    │   ├── authRoutes.js
    │   └── taskRoutes.js
    └── utils/
        └── generateToken.js
```

## License

MIT License.
