# Canteen Express API Documentation

## Base URL
```
http://localhost:8080
```

## Authentication Endpoints

### 1. Register User
**POST** `/api/auth/register`

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "phoneNumber": "09123456789"
}
```

**Response (Success - 200):**
```json
"User registered successfully!"
```

**Response (Error - 400):**
```json
"Email already in use"
```

---

### 2. Login User
**POST** `/api/auth/login`

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Response (Success - 200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "userId": 1,
  "role": "CUSTOMER"
}
```

**Response (Error - 401):**
```json
null
```

---

## Shop Endpoints

### 3. Get All Shops
**GET** `/api/shops`

**Response (Success - 200):**
```json
[
  {
    "id": 1,
    "name": "Campus Cafe",
    "description": "Fresh coffee, pastries, and breakfast items"
  },
  {
    "id": 2,
    "name": "Lunch Corner",
    "description": "Daily meal specials, rice bowls, and main courses"
  },
  {
    "id": 3,
    "name": "Snack Shack",
    "description": "Quick snacks, drinks, and desserts"
  }
]
```

---

### 4. Create Shop
**POST** `/api/shops`

**Request Body:**
```json
{
  "shopName": "New Coffee Shop",
  "description": "Premium coffee and tea"
}
```

**Response (Success - 200):**
```json
{
  "id": 4,
  "name": "New Coffee Shop",
  "description": "Premium coffee and tea"
}
```

---

## Food Item Endpoints

### 5. Get Shop Menu
**GET** `/api/shops/{shopId}/menu`

**Example:** `GET /api/shops/1/menu`

**Response (Success - 200):**
```json
[
  {
    "id": 1,
    "name": "Cappuccino",
    "description": "Rich espresso with steamed milk and foam",
    "price": 4.50,
    "category": "Beverages",
    "imageUrl": "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400"
  },
  {
    "id": 2,
    "name": "Croissant",
    "description": "Buttery flaky French pastry",
    "price": 3.00,
    "category": "Pastries",
    "imageUrl": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400"
  }
]
```

---

## Data Transfer Objects (DTOs)

### ShopDTO
```java
{
  "id": Integer,
  "name": String,
  "description": String
}
```

### FoodItemDTO
```java
{
  "id": Integer,
  "name": String,
  "description": String,
  "price": BigDecimal,
  "category": String,
  "imageUrl": String
}
```

### LoginRequest
```java
{
  "email": String (required, valid email),
  "password": String (required)
}
```

### RegisterRequest
```java
{
  "firstName": String (required),
  "lastName": String (required),
  "email": String (required, valid email),
  "password": String (required, min 6 characters),
  "phoneNumber": String (optional)
}
```

---

## Entity Relationships

### Database Schema

**tbl_users**
- user_id (PK)
- first_name
- last_name
- email (unique)
- password_hash
- phone_number
- role (ENUM: CUSTOMER, VENDOR, ADMIN)
- shop_id (FK, nullable)
- created_at
- updated_at

**tbl_shops**
- shop_id (PK)
- shop_name (unique)
- description
- created_at
- updated_at

**tbl_food_items**
- food_item_id (PK)
- item_name
- description
- price
- category
- image_url
- shop_id (FK)
- created_at
- updated_at

**tbl_orders**
- order_id (PK)
- user_id (FK)
- shop_id (FK)
- status (ENUM: PENDING, CONFIRMED, PREPARING, READY, COMPLETED, CANCELLED)
- total_amount
- order_date
- updated_at

**tbl_order_items**
- order_item_id (PK)
- order_id (FK)
- food_item_id (FK)
- quantity
- price_at_order

**tbl_payments**
- payment_id (PK)
- order_id (FK, unique)
- payment_method (ENUM: CASH, CARD, DIGITAL_WALLET)
- amount
- status (ENUM: PENDING, COMPLETED, FAILED, REFUNDED)
- payment_date

**tbl_inventory**
- inventory_id (PK)
- food_item_id (FK, unique)
- quantity_available
- created_at
- updated_at

---

## Error Handling

### Common HTTP Status Codes

- **200 OK**: Request successful
- **400 Bad Request**: Invalid input or validation error
- **401 Unauthorized**: Invalid credentials
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server error

---

## Authentication Flow

1. **Register**: User creates account via `/api/auth/register`
2. **Login**: User logs in via `/api/auth/login` and receives JWT token
3. **Store Token**: Frontend stores token in localStorage
4. **Authenticated Requests**: Include token in Authorization header (if required in future)

---

## Notes

- All timestamps are in ISO 8601 format
- Prices are in USD with 2 decimal precision
- Image URLs should be valid HTTP/HTTPS links
- JWT tokens expire after 24 hours (86400000 ms)
- CORS is enabled for `http://localhost:5173`
