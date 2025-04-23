# Flashback

Flashback is a digital flashcards application built for **IPT 101**, designed to help users efficiently review and memorize information. This project leverages **React** for the frontend, **Express.js** for the backend, and **MySQL (via XAMPP)** for data storage, ensuring a seamless and dynamic user experience.

## Features

- 📝 **Create & Manage Flashcards** – Users can create, edit, and organize flashcards into sets.
- 🔍 **Search & Filter** – Quickly find specific flashcards.
- 🎯 **Quiz Mode** – Test knowledge with interactive quizzes.
- 🌙 **Dark Mode Support** – Toggle between light and dark themes.
- 📊 **Progress Tracking** – Monitor study progress over time.

## Tech Stack

### **Frontend**:

- React.js
- React Router DOM
- Tailwind CSS
- Flowbite & Flowbite React (UI)
- Framer Motion (Animations)
- Lottie Files (Animated Illustrations)
- React Icons
- Axios (HTTP)

### **Backend**:

- Node.js
- Express.js
- Databases:
  - MySQL (XAMPP)
  - PostgreSQL
- Auth/Security:
  - JWT (Tokens)
  - Bcrypt (Hashing)
  - Express-Session & Cookies
- Nodemailer (Email)
- CORS

### **Dev Tools**:

- Concurrently (Run FE+BE)
- Nodemon (Auto-Reload)
- React Scripts (Build)
- PostCSS & Autoprefixer (CSS)## Tech Stack

## Installation & Setup

### **1️⃣ Clone the Repository**

```sh
git clone https://github.com/your-username/flashback.git
cd flashback
```

### **2️⃣ Install Dependencies**

#### **Frontend**

```sh
cd client  # Navigate to frontend directory
npm install
```

#### **Backend**

```sh
cd server  # Navigate to backend directory
npm install
```

### **3️⃣ Set Up Environment Variables**

Create a `.env` file in the backend directory and configure:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=flashback_db
JWT_SECRET=your_secret_key
SESSION_SECRET=your_session_secret
```

### **4️⃣ Start XAMPP & Configure MySQL**

1. Open **XAMPP Control Panel** and start **Apache** & **MySQL**.
2. Open **phpMyAdmin** and create a database named `flashback_db`.
3. Import any necessary SQL files or set up tables manually.

### **5️⃣ Run the Application**

#### **Start the Backend Server**

```sh
cd server
npm start
```

#### **Start the Frontend**

```sh
cd client
npm start
```

## Contributing

Feel free to submit issues, suggestions, or pull requests to improve Flashback! 🚀

## License

This project is for academic purposes and is not licensed for commercial use.
