# 🎫 Support Ticket Management System – Backend API

This repository contains the **backend API** for a Support Ticket Management System built with **Node.js, Express, MySQL, Knex, and Sequelize**.  
It provides authentication, role-based access control, ticket management, comments, and ticket status tracking.

---

## 🚀 Features

- JWT Authentication & Authorization
- Role-Based Access Control (ADMIN / USER)
- Ticket creation, assignment & status updates
- Public & internal ticket comments
- Ticket status history tracking
- Secure password hashing with bcrypt

---

## 🧱 Tech Stack

- **Node.js**
- **Express.js**
- **MySQL**
- **Knex.js** – database migrations
- **Sequelize** – ORM
- **JWT** – authentication
- **bcrypt** – password hashing
- **dotenv** – environment variables
- **nodemon** – development server

---

## 📂 Project Structure

```text
backend/
├── src/
│   ├── config/
│   │   ├── db.js
│   │   └── knexfile.js
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   ├── role.middleware.js
│   │   └── error.middleware.js
│   ├── models/
│   │   ├── index.js
│   │   ├── user.model.js
│   │   ├── role.model.js
│   │   ├── ticket.model.js
│   │   ├── ticket_status.model.js
│   │   ├── ticket_priority.model.js
│   │   ├── ticket_category.model.js
│   │   ├── ticket_comment.model.js
│   │   ├── ticket_assignment.model.js
│   │   ├── ticket_status_history.model.js
│   │   └── ticket_internal_note.model.js
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.routes.js
│   │   │   ├── auth.controller.js
│   │   │   └── auth.service.js
│   │   └── tickets/
│   │       ├── tickets.routes.js
│   │       ├── tickets.controller.js
│   │       └── tickets.service.js
│   ├── routes.js
│   ├── app.js
│   └── server.js
├── migrations/
│   └── knex migration files
├── knexfile.js
├── package.json
└── .env
```

## ⚙️ Environment Variables

Create a `.env` file in the backend root directory:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=support_ticket_db
JWT_SECRET=JWT_Secret
JWT_EXPIRES_IN=1d
DB_DIALECT=mysql
```
🗄️ Database Setup
1️⃣ Create Database

```sql
CREATE DATABASE support_ticket_db;
```
2️⃣ Install Dependencies
```
npm install
```
3️⃣ Run Migrations (REQUIRED)

Knex manages database schema creation:
```
npx knex migrate:latest
```
## 🗄️ Database Tables

This creates the following tables:

| Table Name | Description |
|-----------|-------------|
| users | Application users |
| roles | User roles (ADMIN / USER) |
| tickets | Support tickets |
| ticket_statuses | Ticket statuses |
| ticket_priorities | Ticket priority levels |
| ticket_categories | Ticket categories |
| ticket_comments | Ticket comments |
| ticket_assignments | Ticket assignments |
| ticket_internal_notes | Internal admin notes |
| ticket_status_history | Ticket status audit trail |
| knex_migrations | Knex migration tracking |

---

## ▶️ Running the Server

### Development Mode

```bash
npm run dev
```
Server will run at:
```

http://localhost:3000
```

Health check endpoint:
```

GET /api/health
```
# 📌 API Endpoints

## 🔑 Authentication

| Method | Endpoint               | Description        |
|--------|-----------------------|------------------|
| POST   | `/api/auth/register`   | Register a new user |
| POST   | `/api/auth/login`      | Login user         |

## 🎫 Tickets

| Method | Endpoint                     | Access        | Description                        |
|--------|-----------------------------|---------------|------------------------------------|
| POST   | `/api/tickets`               | USER          | Create a ticket                     |
| GET    | `/api/tickets`               | ADMIN         | List all tickets                    |
| GET    | `/api/tickets?status=`       | ADMIN         | Filter tickets by status            |
| GET    | `/api/tickets/my`            | USER          | List own tickets                    |
| GET    | `/api/tickets/:id`           | USER / ADMIN  | Get ticket details                  |
| PATCH  | `/api/tickets/:id`           | ADMIN         | Update status / assign ticket       |
| POST   | `/api/tickets/:id/comments`  | USER / ADMIN  | Add comment to a ticket             |

# 📂 Postman Collection

You can import the API endpoints into Postman using the following link:

[Postman](https://red-moon-299208.postman.co/workspace/Test~73bb379c-fc72-4992-b864-2d3e06ed5112/collection/31352141-512ac6fc-5645-4365-92d5-34408fe2cec4?action=share&creator=31352141)

# 🛡 Role Rules Summary

## USER
- Register & login
- Create tickets
- View own tickets
- Comment on own tickets

## ADMIN
- View all tickets
- Filter tickets by status
- Assign tickets
- Change ticket status
- Add public & internal comments
- View internal notes

# ✅ Validation & Constraints
- All ticket fields are required
- Users can only access their own tickets
- Only admins can:
  - Change ticket status
  - Assign tickets
  - Create internal comments
- Internal comments are hidden from users
  







