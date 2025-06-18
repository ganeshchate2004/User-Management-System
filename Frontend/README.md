# 👤 User Management System

The **User Management System** is a full-stack web application that enables secure and efficient handling of user data. It is built using **Angular 19** for the frontend, **Flask** for the backend, and **MongoDB** as the database. The system supports functionalities such as:

- ✅ User registration and login with JWT-based authentication  
- 👀 Viewing, updating, and deleting user profiles  
- 🔐 Role-based access protection using Angular route guards  
- 🔄 RESTful APIs for seamless frontend-backend communication  

This project is built to serve as a scalable boilerplate for any user-centric application with strong authentication and data handling capabilities.

---

## 📦 Tech Stack

### 🔧 Frontend

- Angular 19  
- Angular Material  
- RxJS  
- Angular Forms & Reactive Forms  
- JWT Interceptor for Authenticated Requests  
- Route Guards for Protected Routes  

### 🖥 Backend

- Flask  
- Flask-JWT-Extended  
- PyMongo (MongoDB Integration)  
- bcrypt for Password Hashing  
- Flask-CORS  
- REST API Architecture  

---

## 🔑 Features

### 👤 User Authentication

- Register new users  
- Secure login with JWT  
- Token stored in HTTP-only cookies  
- Auto-redirect on login/logout  
- Form validation and error handling  

### 📋 Profile Management

- Fetch all users (admin-level access)  
- View individual user details  
- Edit profile data (e.g., name, email, contact)  
- Delete users from the database  

### 🔐 Route Protection

- Frontend guards to restrict access to private routes  
- Backend routes protected via JWT  
- Invalid token handling  

---

## 🚀 Getting Started

### ⚙️ Prerequisites

- Node.js (v18+ recommended)  
- Angular CLI (`npm install -g @angular/cli`)  
- Python 3.9+  
- MongoDB (Local or Atlas instance)

---
### 🖥️ Run the Frontend ( Angular 19  )
cd frontend
npm install
ng serve

### 🖥️ Run the Backend (Flask)

```bash
cd backend
python -m venv venv           # Create virtual environment
source venv/bin/activate      # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
