# Canteen Express - Frontend Component Guide

## Project Structure

```
canteen-express-frontend/
├── src/
│   ├── components/           # Reusable components
│   │   ├── CategoryFilter.jsx
│   │   ├── FoodItemCard.jsx
│   │   ├── Navbar.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/              # React Context providers
│   │   └── AuthContext.jsx
│   ├── pages/                # Page components (routes)
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── ShopListPage.jsx
│   │   └── ShopMenuPage.jsx
│   ├── App.jsx               # Main app component
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
```

---

## Core Concepts

### 1. **Data Transfer Objects (DTOs)**
The frontend receives and sends data using DTOs that match the backend structure:

```javascript
// ShopDTO
{
  id: number,
  name: string,
  description: string
}

// FoodItemDTO
{
  id: number,
  name: string,
  description: string,
  price: number,
  category: string,
  imageUrl: string
}
```

### 2. **React Hooks Usage**
- `useState`: Component state management
- `useEffect`: Side effects (API calls, subscriptions)
- `useContext`: Access shared context (auth state)
- `useNavigate`: Programmatic navigation
- `useParams`: Access route parameters

---

## Reusable Components

### **FoodItemCard**

Displays a single food item with image, name, category, description, and price.

**Props:**
```javascript
{
  item: {
    id: number,           // Required
    name: string,         // Required
    description: string,  // Optional
    price: number,        // Required
    category: string,     // Optional
    imageUrl: string      // Optional
  }
}
```

**Usage Example:**
```jsx
import FoodItemCard from '../components/FoodItemCard';

const menu = [
  {
    id: 1,
    name: "Cappuccino",
    description: "Rich espresso with steamed milk",
    price: 4.50,
    category: "Beverages",
    imageUrl: "https://example.com/image.jpg"
  }
];

function MenuList() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {menu.map(item => (
        <FoodItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
```

---

### **CategoryFilter**

Displays category filter buttons with active state highlighting.

**Props:**
```javascript
{
  categories: string[],           // Array of category names
  selectedCategory: string,       // Currently selected category
  onCategoryChange: (category: string) => void  // Callback when category changes
}
```

**Usage Example:**
```jsx
import CategoryFilter from '../components/CategoryFilter';
import { useState } from 'react';

function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Beverages', 'Pastries', 'Main Course'];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    // Filter logic here
  };

  return (
    <CategoryFilter 
      categories={categories}
      selectedCategory={selectedCategory}
      onCategoryChange={handleCategoryChange}
    />
  );
}
```

---

### **Navbar**

Global navigation bar with authentication-aware display.

**Features:**
- Shows login/register links when user is not authenticated
- Shows logout button when user is authenticated
- Uses custom color scheme (maroon/gold theme)

**Usage:**
```jsx
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      {/* Rest of app */}
    </>
  );
}
```

---

### **ProtectedRoute**

Wrapper component for routes that require authentication.

**Props:**
```javascript
{
  children: ReactNode  // Component to render if authenticated
}
```

**Usage Example:**
```jsx
import ProtectedRoute from './components/ProtectedRoute';

<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  } 
/>
```

---

## Context & Custom Hooks

### **AuthContext & useAuth Hook**

Provides authentication state and methods throughout the app.

**Available Methods:**
```javascript
const { user, login, register, logout, loading } = useAuth();

// user: { token, userId, role } | null
// loading: boolean
// login(email, password): Promise<{ success: boolean, message?: string }>
// register(firstName, lastName, email, password, phoneNumber): Promise<{ success: boolean, message?: string }>
// logout(): void
```

**Usage Example:**
```jsx
import { useAuth } from '../context/AuthContext';

function LoginForm() {
  const { login } = useAuth();

  const handleSubmit = async (email, password) => {
    const result = await login(email, password);
    if (result.success) {
      // Navigate to dashboard
    } else {
      // Show error message
    }
  };

  return (/* form JSX */);
}
```

---

## Pages

### **ShopListPage**
- Fetches and displays all shops
- Uses `axios.get('http://localhost:8080/api/shops')`
- Each shop links to its menu page

### **ShopMenuPage**
- Displays menu items for a specific shop
- Uses `useParams()` to get shopId from URL
- Implements category filtering
- Uses `CategoryFilter` and `FoodItemCard` components

### **LoginPage**
- User authentication form
- Uses `useAuth().login()`
- Redirects to previous page or home after login

### **RegisterPage**
- User registration form
- Uses `useAuth().register()`
- Redirects to login page after successful registration

---

## Styling

### Color Scheme
```css
Primary (Maroon): #5B050B
Secondary (Gold): #DFAD13
Accent (Light Gold): #DEC67E
Dark Accent (Red-Brown): #8C343A
Light Background: #FAE7BF
```

### Tailwind + Inline Styles
- Uses Tailwind CSS for utility classes
- Custom colors applied via inline `style` prop
- Responsive grid layouts: `md:grid-cols-2 lg:grid-cols-3`

---

## API Integration

### Base URL Configuration
```javascript
const API_BASE_URL = 'http://localhost:8080';
```

### Example API Call Pattern
```javascript
import axios from 'axios';

// GET request
const fetchShops = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/shops`);
    setShops(response.data);
  } catch (error) {
    console.error('Error fetching shops:', error);
  }
};

// POST request
const createOrder = async (orderData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/orders`, 
      orderData
    );
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};
```

---

## Best Practices

### 1. **Component Reusability**
- Extract repeated JSX into reusable components
- Use PropTypes for prop validation
- Keep components focused on single responsibility

### 2. **State Management**
- Use Context for global state (auth, theme)
- Use local state for component-specific data
- Lift state up when multiple components need it

### 3. **Error Handling**
- Always use try-catch for async operations
- Provide user-friendly error messages
- Handle loading states

### 4. **Performance**
- Use `key` prop correctly in lists
- Memoize expensive calculations if needed
- Avoid unnecessary re-renders

---

## Running the Application

### Development Mode
```bash
cd canteen-express-frontend
npm install
npm run dev
```

Application will be available at: `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Linting
```bash
npm run lint
```

---

## Future Enhancements

### Suggested Improvements
1. **Custom Hooks**
   - `useApi()` - Abstract API call logic
   - `useFetch()` - Generic data fetching hook
   - `useLocalStorage()` - Persist state to localStorage

2. **Additional Components**
   - `LoadingSpinner` - Reusable loading indicator
   - `ErrorMessage` - Consistent error display
   - `ShopCard` - Reusable shop card component
   - `Button` - Standardized button component

3. **State Management**
   - Consider Redux Toolkit for complex state
   - Add cart context for order management

4. **Testing**
   - Add unit tests with Vitest
   - Add component tests with React Testing Library
   - Add E2E tests with Playwright

---

## Questions?

For API documentation, see `API_DOCUMENTATION.md`
For backend setup, see `canteen-express-backend/README.md`
