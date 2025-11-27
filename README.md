# 🍽️ Canteen Express

**Your Ultimate Campus Food Ordering Solution**

Canteen Express is a full-stack web application designed to streamline the food ordering process within campus canteens. It bridges the gap between students (customers) and canteen vendors, offering a seamless platform for browsing menus, managing orders, and tracking sales.

---

## 🎓 About The Project

This repository serves as the final project submission for the following subjects:

* **App Development (Backend)**
* **Industry Elective (Frontend)**

The goal of this project was to architect and develop a robust, multi-role system using modern industry-standard technologies, demonstrating proficiency in both server-side logic and client-side interface design.

### 👨‍💻 The Team (Creators)

* **Miguel Rivero**
* **Christian Kyle Tapales**
* **Vinci Villanueva**

---

## 🚀 Key Features

### 👤 Customer
* **Multi-Shop Browsing:** View different canteen stalls (e.g., Campus Cafe, Lunch Corner) and their specific menus.
* **Smart Cart System:** Real-time addition of items, quantity adjustments, and total calculation.
* **Category Filtering:** Easily find beverages, main courses, or desserts.
* **Secure Checkout:** Simulated payment processing and order placement.

### 🏪 Vendor
* **Vendor Dashboard:** Real-time analytics on daily revenue, total orders, and best-selling items.
* **Inventory Management:** Add, update, or remove food items and manage stock levels.
* **Order Management:** Track incoming orders and update statuses (Preparing, Ready, Completed).

### 🛡️ Security & System
* **Role-Based Access Control (RBAC):** Distinct interfaces and permissions for Customers, Vendors, and Admins.
* **JWT Authentication:** Secure login and session management using JSON Web Tokens.
* **Responsive Design:** Optimized for both desktop and tablet views.

---

## 🛠️ Technology Stack

### Frontend
* ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) **React.js (Vite)**
* ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) **Tailwind CSS**
* ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white) **Axios** (API Consumption)
* **React Router** (Navigation)

### Backend
* ![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white) **Java 17**
* ![Spring Boot](https://img.shields.io/badge/Spring_Boot-F2F4F9?style=for-the-badge&logo=spring-boot) **Spring Boot**
* **Spring Security** (JWT Implementation)
* **Spring Data JPA** (Hibernate)

### Database
* ![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white) **MySQL**

---

## 💻 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites
* Node.js & npm
* JDK 17 or higher
* MySQL Server

### 1. Database Setup
1.  Open your MySQL client (Workbench, CLI, etc.).
2.  Create a new database named `canteen_express_db`.
3.  (Optional) Run the `sample_data.sql` script located in the root to populate the database with dummy shops and food items.

### 2. Backend Setup
Navigate to the backend directory:
```bash
cd backend
Configure your database credentials in src/main/resources/application.properties:

Properties

spring.datasource.username=YOUR_MYSQL_USERNAME
spring.datasource.password=YOUR_MYSQL_PASSWORD
Run the Spring Boot application:

Bash

# Windows
./mvnw.cmd spring-boot:run

# Mac/Linux
./mvnw spring-boot:run
The backend server will start at http://localhost:8080.

3. Frontend Setup
Open a new terminal and navigate to the frontend directory:

Bash

cd frontend
Install dependencies:

Bash

npm install
Run the development server:

Bash

npm run dev
The application will be accessible at http://localhost:5173.

📂 Project Structure
Plaintext

Canteen-Express/
├── backend/               # Spring Boot Application
│   ├── src/main/java      # Controllers, Services, Entities, Repositories
│   └── src/main/resources # Configs and API settings
│
├── frontend/              # React Application
│   ├── src/components     # Reusable UI components (Navbar, Cards)
│   ├── src/pages          # Main views (ShopList, Cart, Dashboard)
│   └── src/context        # Global state (Auth, Cart)
│
└── sample_data.sql        # Database seeding script
📸 Screenshots
(Add screenshots of your Landing Page, Shop Menu, and Vendor Dashboard here)