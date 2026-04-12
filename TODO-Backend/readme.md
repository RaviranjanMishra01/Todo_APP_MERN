# ⚙️ Todo App — Backend

Node.js + Express + MongoDB se bana hua REST API backend.

---

## 🛠 Tech Stack

- **Node.js** — Runtime
- **Express** — Web framework
- **MongoDB + Mongoose** — Database
- **JWT** — Authentication
- **bcryptjs** — Password hashing
- **dotenv** — Environment variables
- **cors** — Cross-origin requests

---

## 📁 Folder Structure

```
TODO-backend/
├── controllers/
│   ├── authController.js   # Register, Login, GetMe
│   └── todoController.js   # CRUD for todos
├── middlewares/
│   └── authlogin.js        # JWT verify middleware
├── model/
│   ├── Todo.js             # Todo schema
│   └── users.js            # User schema
├── routes/
│   ├── authRoutes.js       # /api/auth routes
│   └── routes.js           # /api/todos routes
├── .env
├── .gitignore
├── index.js                # Entry point
├── package.json
└── README.md
```

---

## ⚙️ Setup & Installation

### 1. Dependencies install karo

```bash
cd TODO-backend
npm install
```


### 3. Start Server

```bash
# Development (nodemon)
npm run dev

# Production
npm start
```

Server `http://localhost:5000` .

---

## 🔗 API Endpoints

### Auth Routes — `/api/auth`

| Method | Endpoint             | Description         | Auth Required |
|--------|----------------------|---------------------|---------------|
| POST   | `/api/auth/register` | new user register  | ❌            |
| POST   | `/api/auth/login`    | Login + token | ❌            |
| GET    | `/api/auth/me`       | Logged-in user info | ✅            |

### Todo Routes — `/api/todos`

| Method | Endpoint            | Description          | Auth Required |
|--------|---------------------|----------------------|---------------|
| GET    | `/api/todos`        | All todos fetch    | ✅            |
| POST   | `/api/todos`        | NEW todo create     | ✅            |
| PUT    | `/api/todos/:id`    | Todo update (toggle) | ✅            |
| DELETE | `/api/todos/:id`    | Todo delete          | ✅            |

---

## 📬 Request / Response Examples

### Register
```
POST /api/auth/register
Content-Type: application/json

{
  "username": ""ravi,
  "email": "ravi@example.com",
  "password": "123456"
}

Response 201:
{ "message": "User registered" }
```

### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "alex@example.com",
  "password": "123456"
}

Response 200:
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "64f1a...",
    "username": "ravi",
    "email": "ravi@example.com"
  }
}
```

### Todo Create
```
POST /api/todos
Authorization: Bearer <token>
Content-Type: application/json

{ "title": "Grocery khareedna" }

Response 201:
{
  "_id": "64f2b...",
  "title": "Grocery khareedna",
  "completed": false,
  "user": "64f1a...",
  "createdAt": "2024-01-01T10:00:00Z"
}
```

---

## 🔐 Auth Middleware

Har protected route pe `Authorization: Bearer <token>` header bhejni padti hai.

```
Header: Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

Token invalid ya missing hone pe:
```json
{ "message": "Invalid token" }   // 401
```

---

## 🗄 Database Models

### User
```js
{
  username: String (required),
  email:    String (required, unique),
  password: String (hashed, required)
}
```

### Todo
```js
{
  title:     String (required),
  completed: Boolean (default: false),
  user:      ObjectId (ref: User)
}
```

---

## 🛡 Security

- Passwords bcryptjs se hash hote hain (salt rounds: 10)
- JWT 7 din mein expire hota hai
- Har todo request mein user verify hoti hai
- `.env` mein secrets store hote hain, code mein hardcode nahi

---

## 📦 Scripts

```bash
npm start      # node index.js
npm run dev    # nodemon index.js (install: npm i -D nodemon)
```

`package.json` mein add karo:
```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}
```



# Author

> Raviranjan mishra