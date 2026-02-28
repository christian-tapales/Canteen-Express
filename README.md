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
<img width="1884" height="984" alt="Admin (Master Ledger) Part 1" src="https://github.com/user-attachments/assets/45883557-ade2-47d6-93a3-5a3584574cf5" />

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
'''
```
## 📸 Screenshots

<details>
<summary><b>Click to expand project gallery</b></summary>

### 👤 User Experience
*Browse stalls and manage your orders.*

| **Shop View** | **User Dashboard** |
|---|---|
| <img src="https://github.com/user-attachments/assets/5d8bffd0-ac4c-4021-a296-fbde9d11360d" width="100%"> | <img src="https://github.com/user-attachments/assets/0ecb357e-fea6-437d-afcd-e26b57987b46" width="100%"> |

---

### 🏪 Vendor Dashboard
*Manage your stall, inventory, and track real-time sales.*

**Analytics & Management**
<img src="https://github.com/user-attachments/assets/0d902c8b-c79c-43fe-9770-455e7e00dac7" width="100%" alt="Seller Dashboard" />

**Order Processing & Shop Settings**
| **Order Management** | **Stall Configuration** |
|---|---|
| <img src="https://github.com/user-attachments/assets/d0edf603-7afc-4df0-bc83-05968c0b260b" width="100%"> | <img src="https://github.com/user-attachments/assets/fa4441a9-3888-4597-b35e-401819f3ea32" width="100%"> |

---

### 🛡️ Admin Panel (Master Control)
*System-wide oversight of accounts, stalls, and financial ledgers.*

**User & Stall Management**
| **Account Control** | **Stall Management** |
|---|---|
| <img src="https://github.com/user-attachments/assets/57ed7b93-e3ff-474e-ab89-bb70f4c6caa2" width="100%"> | <img src="https://github.com/user-attachments/assets/d5d2945e-c937-4d07-9087-723b28ddd996" width="100%"> |

**Master Ledgers**
<img src="https://github.com/user-attachments/assets/8ba25639-301e-4a05-90af-dbf60144dd69" width="100%" alt="Master Ledger Part 1" />
<img src="https://github.com/user-attachments/assets/6f4c7ffd-2ec7-4148-9d80-04e5eb4ebd37" width="100%" alt="Master Ledger Part 2" />

</details>
