# Canteen Express - Presentation Guide

## 📊 Presentation Outline (Based on Rubrics)

### Section 1: Introduction (2-3 minutes)
**Talking Points:**
- Project name: Canteen Express
- Problem statement: Streamline campus canteen ordering
- Team members and contributions
- Technology stack overview

---

## 🎯 Section 2: Design of Entities (25 points - Exemplary Goal)

### Backend Entity Classes (Show & Explain)

**Core Entities to Present:**

1. **UserEntity** (`tbl_users`)
   - Multi-role system (Customer, Vendor, Admin)
   - JWT authentication integration
   - Relationship: ManyToOne with Shop

2. **ShopEntity** (`tbl_shops`)
   - Multi-shop support
   - OneToMany relationships with FoodItems

3. **FoodItemEntity** (`tbl_food_items`)
   - Product catalog
   - ManyToOne with Shop
   - Categories and pricing

4. **OrderEntity** (`tbl_orders`)
   - Order lifecycle management
   - Status enum (PENDING, CONFIRMED, PREPARING, READY, COMPLETED, CANCELLED)
   - ManyToOne with User and Shop

5. **OrderItemEntity** (`tbl_order_items`)
   - Junction table for Order-FoodItem
   - Quantity and price snapshot

6. **PaymentEntity** (`tbl_payments`)
   - Payment tracking
   - Method enum (CASH, CARD, DIGITAL_WALLET)
   - Status enum (PENDING, COMPLETED, FAILED, REFUNDED)

### Frontend Data Transfer Objects (DTOs)

**Show JSON Structure Examples:**

```javascript
// User Authentication
{
  "email": "student@example.com",
  "password": "***",
  "firstName": "John",
  "lastName": "Doe"
}

// Shop with Menu Items
{
  "shopId": 1,
  "shopName": "Campus Cafe",
  "description": "Fresh coffee and pastries",
  "menuItems": [
    {
      "itemId": 1,
      "itemName": "Cappuccino",
      "price": 4.50,
      "category": "Beverages",
      "imageUrl": "..."
    }
  ]
}

// Cart & Order
{
  "userId": 123,
  "shopId": 1,
  "items": [
    {
      "foodItemId": 1,
      "quantity": 2,
      "price": 4.50
    }
  ],
  "totalAmount": 9.00
}
```

**Key Points to Highlight:**
- ✅ Clear naming conventions (Entity suffix, DTO suffix)
- ✅ Proper JPA annotations (@Entity, @Table, @Column)
- ✅ Normalized database structure (no redundancy)
- ✅ Bidirectional relationships managed properly
- ✅ Validation constraints (@NotNull, @Email, @Size)
- ✅ Enums for type safety (Role, OrderStatus, PaymentMethod)
- ✅ Sample data provided in `sample_data.sql` (75 food items, 3 shops)

---

## ⚛️ Section 3: React Design (25 points - Exemplary Goal)

### Component Architecture

**Core Components to Present:**

1. **Layout Components**
   - `Navbar.jsx` - Persistent navigation with cart badge
   - `ProtectedRoute.jsx` - Authentication guard

2. **Page Components**
   - `ShopListPage.jsx` - Browse all shops
   - `ShopMenuPage.jsx` - View shop menu with category filter
   - `CartPage.jsx` - Review cart and checkout
   - `LoginPage.jsx` / `RegisterPage.jsx` - Authentication

3. **Reusable Components**
   - `FoodItemCard.jsx` - Product display card
   - `CategoryFilter.jsx` - Menu filtering
   - `AddToCartModal.jsx` - Quantity selection

### React Best Practices Demonstrated

**Show Code Examples:**

```jsx
// 1. Custom Hooks for State Management
const { user, login, logout } = useAuth(); // AuthContext
const { cart, addToCart, removeFromCart, updateQuantity } = useCart(); // CartContext

// 2. Context API Usage
<AuthContext.Provider value={{ user, login, logout }}>
  <CartContext.Provider value={{ cart, addToCart, ... }}>
    <App />
  </CartContext.Provider>
</AuthContext.Provider>

// 3. Component Composition
<ProtectedRoute>
  <CartPage />
</ProtectedRoute>

// 4. Minimal Prop Drilling
// Using context instead of passing props through multiple levels

// 5. Memoization (if applicable)
const filteredItems = useMemo(() => 
  items.filter(item => item.category === selectedCategory),
  [items, selectedCategory]
);
```

**Key Points to Highlight:**
- ✅ Clear component hierarchy
- ✅ Reusable components (DRY principle)
- ✅ Custom hooks (useAuth, useCart) for logic abstraction
- ✅ Context API for global state (no prop drilling)
- ✅ React Router for navigation
- ✅ Responsive design with Tailwind CSS
- ✅ Accessibility considerations (semantic HTML, keyboard navigation)
- ✅ Performance optimization (lazy loading, conditional rendering)

---

## 👥 Section 4: Teamwork & Distribution (20 points - Exemplary Goal)

### Git Repository Analysis

**Show on GitHub:**

```bash
# Generate contribution statistics
git log --format='%aN' | sort -u
git shortlog -sn --all
```

**Evidence to Present:**

1. **Commit History**
   - Show commit graph with multiple contributors
   - Highlight branch strategy (feature branches, main branch)
   - Example: `feature/shopping-cart`, `feature/authentication`, etc.

2. **Pull Requests & Code Reviews**
   - Show closed/merged PRs with discussions
   - Evidence of peer review comments
   - Issues linked to PRs

3. **Issue Tracking**
   - Show GitHub Issues with assignments
   - Labels for features, bugs, enhancements
   - Milestone tracking

4. **Module Ownership**
   ```
   Team Member 1: Backend API (Controllers, Services)
   Team Member 2: Frontend Pages (Shop, Cart)
   Team Member 3: Authentication & Security
   Team Member 4: Database Design & Testing
   ```

**Key Points to Highlight:**
- ✅ Balanced commit distribution across team members
- ✅ Clear and meaningful commit messages
- ✅ Active code reviews with constructive feedback
- ✅ Issues linked to pull requests
- ✅ Regular team synchronization (mention stand-ups/meetings)
- ✅ Multiple contributors involved in critical features

---

## 📅 Section 5: Timeliness & Cadence (15 points - Exemplary Goal)

### Project Timeline

**Show Milestone History:**

```
Week 1-2: Project Setup & Planning
  ✅ Database schema design
  ✅ Repository setup
  ✅ Technology stack decision

Week 3-4: Backend Development
  ✅ Entity models created
  ✅ Repository layer implemented
  ✅ REST API endpoints

Week 5-6: Frontend Development
  ✅ Component architecture
  ✅ Authentication flow
  ✅ Shop browsing feature

Week 7-8: Integration & Features
  ✅ Shopping cart functionality
  ✅ Order management
  ✅ Payment integration

Week 9-10: Testing & Polish
  ✅ Bug fixes
  ✅ UI/UX improvements
  ✅ Documentation
```

**Evidence to Show:**
- GitHub Insights → Pulse (weekly activity)
- Network graph showing parallel development
- Closed milestones with due dates
- Sprint planning notes or meeting minutes

**Key Points to Highlight:**
- ✅ All milestones met on schedule
- ✅ Regular cadence of commits (weekly activity)
- ✅ Early blockers identified and addressed
- ✅ Visible progress in each sprint
- ✅ Demo-ready at each milestone

---

## 📝 Section 6: Update Quality & Evidence (15 points - Exemplary Goal)

### Documentation & Demonstration

**Materials to Present:**

1. **README.md** (If not exists, create one)
   - Project description
   - Setup instructions
   - Architecture diagram
   - API documentation

2. **API Documentation** (`API_DOCUMENTATION.md`)
   ```
   Show existing file with all endpoints:
   - GET /api/shops
   - GET /api/shops/{id}/menu
   - POST /api/auth/register
   - POST /api/auth/login
   - POST /api/orders
   - etc.
   ```

3. **Component Guide** (`COMPONENT_GUIDE.md`)
   ```
   Show existing file documenting:
   - Component hierarchy
   - Props interface
   - Usage examples
   ```

4. **Live Demo Recording**
   - Record a 3-5 minute demo video showing:
     - User registration
     - Browse shops
     - Add items to cart
     - Place order
     - Different user roles

5. **Screenshots**
   - Shop list page
   - Menu page with categories
   - Cart page
   - Login/Register pages

6. **Code Samples**
   ```java
   // Show well-documented code
   /**
    * Registers a new user in the system.
    * All new users default to the 'CUSTOMER' role.
    * @param request Registration details
    * @throws IllegalStateException if email already exists
    */
   public void register(RegisterRequest request) {
       // Implementation
   }
   ```

**Key Technical Questions to Prepare:**

1. **How does JWT authentication work in your system?**
   - Show JwtService, JwtAuthenticationFilter
   - Explain token generation and validation

2. **How do you handle shopping cart state?**
   - Show CartContext implementation
   - Explain local storage persistence

3. **How do you ensure data consistency?**
   - Show transaction annotations
   - Explain database constraints

4. **How is the multi-shop system implemented?**
   - Show Shop-FoodItem relationship
   - Explain how orders are shop-specific

5. **What security measures are in place?**
   - CORS configuration
   - Password encryption (BCrypt)
   - JWT expiration
   - Protected routes

---

## 🎬 Presentation Flow (Total: 20-25 minutes)

### Slide Breakdown:

1. **Title Slide** (30 seconds)
   - Project name, team members, date

2. **Problem & Solution** (2 minutes)
   - What problem does this solve?
   - Who are the users?
   - Key features

3. **Technology Stack** (1 minute)
   - Frontend: React, Vite, Tailwind CSS
   - Backend: Spring Boot, JPA/Hibernate
   - Database: MySQL
   - Authentication: JWT

4. **Live Demo** (5 minutes)
   - **CRITICAL**: Have both servers running before presentation
   - Walk through main user flows
   - Show responsive design

5. **Architecture Overview** (2 minutes)
   - Show system architecture diagram
   - Explain frontend-backend communication
   - Database structure

6. **Entity Design Deep Dive** (4 minutes)
   - Show ERD or class diagram
   - Walk through key entities
   - Show sample JSON data
   - Explain relationships and constraints

7. **React Component Architecture** (4 minutes)
   - Show component tree
   - Explain context usage
   - Demonstrate reusable components
   - Show code snippets

8. **Teamwork & Collaboration** (2 minutes)
   - Show GitHub stats
   - Contribution graph
   - PR review examples

9. **Development Timeline** (2 minutes)
   - Milestone achievements
   - Sprint cadence
   - Issue tracking

10. **Q&A Preparation** (2-3 minutes)
    - Technical questions
    - Design decisions
    - Challenges faced

---

## 🛠️ Pre-Presentation Checklist

### 24 Hours Before:

- [ ] Ensure both servers start without errors
- [ ] Load sample data into database
- [ ] Test all major features work
- [ ] Prepare backup plan (video demo if live demo fails)
- [ ] Create slides with screenshots
- [ ] Practice demo flow multiple times
- [ ] Charge laptop, prepare adapters
- [ ] Clear browser cache/history
- [ ] Close unnecessary applications

### Materials to Prepare:

- [ ] Presentation slides (PDF backup)
- [ ] Demo video (backup)
- [ ] Code printouts (key sections)
- [ ] Architecture diagrams
- [ ] GitHub stats screenshots
- [ ] Sample data examples
- [ ] USB drive with all materials
- [ ] Presenter notes with talking points

### Test Your Demo:

```bash
# Before presentation, verify:
1. Backend starts successfully
   cd canteen-express-backend
   ./mvnw.cmd spring-boot:run

2. Frontend starts successfully
   cd canteen-express-frontend
   npm run dev

3. Database has sample data
   mysql -u root -p
   USE canteen_express_db;
   SELECT COUNT(*) FROM tbl_food_items; -- Should be 75
   SELECT COUNT(*) FROM tbl_shops; -- Should be 3

4. Key features work:
   - Registration ✓
   - Login ✓
   - Browse shops ✓
   - View menu ✓
   - Add to cart ✓
   - Checkout (if implemented) ✓
```

---

## 💡 Tips for Maximizing Score

### For "Exemplary" (A) Rating:

1. **Design of Entities (25 pts)**
   - Show clear ERD diagram
   - Explain normalization
   - Demonstrate with actual database queries
   - Show how DTOs map to entities

2. **React Design (25 pts)**
   - Show component tree diagram
   - Live code demonstration
   - Explain design patterns used
   - Show performance considerations

3. **Teamwork (20 pts)**
   - Prepare GitHub stats beforehand
   - Show real PR discussions
   - Explain conflict resolution
   - Demonstrate code review process

4. **Timeliness (15 pts)**
   - Show Gantt chart or timeline
   - Explain how you stayed on track
   - Mention daily standups/weekly syncs
   - Show closed milestones

5. **Update Quality (15 pts)**
   - Have demo ready immediately
   - Provide multiple forms of evidence
   - Answer questions confidently
   - Show deep understanding of codebase

---

## 🎤 Practice Talking Points

### Opening:
"Good [morning/afternoon], we're presenting Canteen Express, a full-stack web application designed to streamline food ordering in campus canteens. Our system supports multiple shops, real-time cart management, and role-based access control."

### Demo:
"Let me show you how a student would use this system. First, they browse the available shops..." [walk through flow]

### Technical:
"Our backend uses Spring Boot with JPA/Hibernate, providing RESTful APIs consumed by our React frontend. We implemented JWT authentication for security..."

### Teamwork:
"As you can see from our commit history, all team members contributed equally, with [X] commits from member 1, [Y] from member 2..."

### Closing:
"We're proud of what we've built - a scalable, maintainable solution that solves a real problem. We're happy to answer any questions about our design decisions, implementation, or future enhancements."

---

## 📞 Backup Plans

### If Live Demo Fails:
1. Switch to recorded video immediately
2. Have screenshots ready in slides
3. Explain what went wrong honestly
4. Continue with technical deep dive

### If Questions Stump You:
1. "That's a great question, let me think..."
2. Explain your thought process
3. Admit if unsure: "I'd need to verify that in the code, but my understanding is..."
4. Offer to follow up after presentation

### Time Management:
- If running short: Expand on technical details, show more code
- If running long: Skip some code examples, focus on high-level
- Keep demo under 5 minutes no matter what

---

## 🎯 Expected Questions & Answers

**Q: Why did you choose React over other frameworks?**
A: React's component-based architecture, large ecosystem, and our team's familiarity made it ideal. Context API simplified state management without adding complexity.

**Q: How do you handle concurrent cart operations?**
A: Currently client-side in CartContext. For production, we'd implement optimistic updates with server-side cart persistence and conflict resolution.

**Q: What about payment integration?**
A: We've designed the PaymentEntity with proper enums. Integration with payment gateways would be the next step using Stripe or PayPal API.

**Q: How do you scale this system?**
A: Horizontally scale backend with load balancer, implement caching (Redis), use CDN for static assets, and consider microservices for order processing.

**Q: Security concerns?**
A: JWT with secure secret, BCrypt password hashing, CORS configuration, input validation, prepared statements preventing SQL injection, and HTTPS in production.

---

**Good luck with your presentation! 🚀**
