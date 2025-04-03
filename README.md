# NODE-TUTORIAL

A simple Node.js project demonstrating RESTful API development with CRUD operations using MySQL.

## 📂 Project Structure

```
NODE-TUTORIAL/
│── api/
│   ├── api.js              # Main API routes
│   ├── user/
│   │   ├── GET_all_user.js  # Fetch all users
│   │   ├── GET_user.js      # Fetch a specific user
│   │   ├── POST_user.js     # Add a new user
│   │   ├── PUT_user.js      # Update a user
│── config/
│   ├── db-mysql.js         # MySQL database configuration
│── .env                    # Environment variables (ignored in Git)
│── .gitignore              # Ignore unnecessary files
│── package.json            # Project dependencies & scripts
│── server.js               # Entry point of the API
│── swagger.json            # API documentation
```

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/trjovellmiranda/nodejs-activity.git
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Set Up Environment Variables

Create a `.env` file and configure database settings:

```
DB_HOST=your-database-host
DB_USER=your-database-username
DB_PASSWORD=your-database-password
DB_NAME=test
PORT=3000
DB_PORT=your-database-port


```

### 4️⃣ Set Up MySQL Database

Run the following SQL script:

```sql
CREATE DATABASE IF NOT EXISTS test;
USE test;

CREATE TABLE IF NOT EXISTS user_tbl (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_fname VARCHAR(50) NOT NULL,
    user_lname VARCHAR(50) NOT NULL,
    user_isdel TINYINT(1) DEFAULT 0
);

INSERT INTO user_tbl (user_fname, user_lname, user_isdel) VALUES
('John', 'Doe', 0),
('Jane', 'Smith', 0),
('Alice', 'Brown', 0),
('Bob', 'Johnson', 0),
('Charlie', 'Williams', 0),
('Daniel', 'Jones', 0),
('Emily', 'Garcia', 0),
('Frank', 'Martinez', 0),
('Grace', 'Lopez', 0),
('Henry', 'Hernandez', 0),
('Isabella', 'Gonzalez', 0),
('Jack', 'Wilson', 0),
('Katie', 'Anderson', 0),
('Leo', 'Thomas', 0),
('Mia', 'Taylor', 0),
('Nathan', 'Moore', 0),
('Olivia', 'Jackson', 0),
('Paul', 'White', 0),
('Quinn', 'Harris', 0),
('Ryan', 'Clark', 0);
```

### 5️⃣ Start the Server

```sh
node server.js
```
OR (for development):

```sh
npm run dev
```

---

## 🔌 API Endpoints

| Method | Endpoint         | Description        |
|--------|----------------|--------------------|
| GET    | `/api/user`    | Get all users     |
| GET    | `/api/user/:id` | Get user by ID    |
| POST   | `/api/user`    | Create new user   |
| PUT    | `/api/user/:id` | Update user by ID |

---

## 📖 Swagger API Documentation

### 🔗 Access Swagger UI
Once the server is running, open the following URL in your browser:

```
http://localhost:8081/api-docs 

```