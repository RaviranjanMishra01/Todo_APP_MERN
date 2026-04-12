# 📝 Todo App — Frontend

React + Vite + Tailwind CSS se bana hua Todo application ka frontend.

---

## 🛠 Tech Stack

- **React** — UI library
- **Vite** — Build tool
- **Tailwind CSS** — Styling
- **LocalStorage** — Token & user data store

---

## 📁 Folder Structure

```
TODO-frontend/
├── public/
├── src/
│   ├── api/
│   │   └── api.js              # Base URL + auth headers + getStoredUser
│   ├── assets/
│   ├── components/
│   │   └── ProtectedRoute.jsx  # Auth guard component
│   ├── pages/
│   │   ├── Dashboard.jsx       # Main todo page (protected)
│   │   ├── Login.jsx           # Login page
│   │   └── Register.jsx        # Register page
│   ├── App.jsx                 # Routes setup
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## ⚙️ Setup & Installation

### 1. Dependencies install karo

```bash
cd TODO-frontend
npm install
```

### 2. Dev server chalao

```bash
npm run dev
```

App `http://localhost:5173` pe open hogi.

### 3. Production build

```bash
npm run build
```

---

## 🔗 API Configuration

`src/api/api.js` mein backend URL set karo:

```js
const API = "http://localhost:5000"; // Backend URL
```

Production mein deploy karne pe yahan apna live backend URL daalo.

---

## 📄 Pages

### `/register`
- Naya account banao (username, email, password)
- Success pe `/login` pe redirect

### `/login`
- Email + password se login karo
- Token aur user info `localStorage` mein save hoti hai
- Success pe `/` (Dashboard) pe redirect

### `/` — Dashboard *(Protected)*
- Todos fetch, create, update, delete
- User avatar dropdown (naam, email, task stats)
- Time-based greeting (Good morning / afternoon / evening)
- Dark / Light mode toggle
- Logout button

---

## 🔐 Auth Flow

```
Register → Login → Token localStorage mein save → Dashboard access
```

- Token nahi hai → automatically `/login` pe redirect
- Logout pe token + user dono localStorage se remove hote hain

---

## 🎨 Features

- ✅ Dark / Light mode
- ✅ Progress bar (completed tasks)
- ✅ User avatar with initials
- ✅ Time-based greeting
- ✅ User dropdown with stats
- ✅ Enter key se todo add
- ✅ Hover pe delete button
- ✅ Clear completed todos
- ✅ Loading & error states on forms


