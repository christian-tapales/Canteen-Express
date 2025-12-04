-- ============================================
-- CREATE DATABASE AND TABLES
-- ============================================

-- Drop database if it exists and create fresh
DROP DATABASE IF EXISTS canteen_express_db;
CREATE DATABASE canteen_express_db;
USE canteen_express_db;

-- Create shops table
CREATE TABLE tbl_shops (
    shop_id INT AUTO_INCREMENT PRIMARY KEY,
    shop_name VARCHAR(100) NOT NULL,
    description TEXT,
    is_open BOOLEAN DEFAULT 1,
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create food items table
CREATE TABLE tbl_food_items (
    food_item_id INT AUTO_INCREMENT PRIMARY KEY,
    item_name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(50),
    shop_id INT NOT NULL,
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (shop_id) REFERENCES tbl_shops(shop_id) ON DELETE CASCADE
);

-- Create inventory table
CREATE TABLE tbl_inventory (
    inventory_id INT AUTO_INCREMENT PRIMARY KEY,
    shop_id INT NOT NULL,
    food_item_id INT NOT NULL,
    quantity_available INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (shop_id) REFERENCES tbl_shops(shop_id) ON DELETE CASCADE,
    FOREIGN KEY (food_item_id) REFERENCES tbl_food_items(food_item_id) ON DELETE CASCADE
);

-- ============================================
-- ADD SAMPLE SHOPS (Updated with Image URLs)
-- ============================================
INSERT INTO tbl_shops (shop_name, description, is_open, image_url, created_at) VALUES
(
 'Campus Cafe', 
 'Fresh coffee, pastries, and breakfast items', 
 1, 
 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400', 
 NOW()
),
(
 'Lunch Corner', 
 'Daily meal specials, rice bowls, and main courses', 
 1, 
 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400', 
 NOW()
),
(
 'Snack Shack', 
 'Quick snacks, drinks, and desserts', 
 1, 
 'https://images.unsplash.com/photo-1599658880436-c61792e70672?w=400', 
 NOW()
);

-- ============================================
-- Campus Cafe (shop_id = 1)
-- ============================================

-- Beverages
INSERT INTO tbl_food_items (item_name, description, price, category, shop_id, image_url, created_at) VALUES
('Cappuccino', 'Rich espresso with steamed milk and foam', 4.50, 'Beverages', 1, 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400', NOW()),
('Iced Latte', 'Cold espresso with milk over ice', 5.00, 'Beverages', 1, 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400', NOW()),
('Hot Chocolate', 'Creamy chocolate drink with whipped cream', 4.00, 'Beverages', 1, 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=400', NOW()),
('Green Tea', 'Refreshing green tea with honey', 3.50, 'Beverages', 1, 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400', NOW()),
('Fruit Smoothie', 'Blended fresh fruits with yogurt', 5.50, 'Beverages', 1, 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400', NOW());
-- Seed inventory for shop 1 beverages
INSERT INTO tbl_inventory (shop_id, food_item_id, quantity_available, created_at)
SELECT fi.shop_id, fi.food_item_id, 100, NOW()
FROM tbl_food_items fi
WHERE fi.shop_id = 1 AND fi.category = 'Beverages';

-- Pastries
INSERT INTO tbl_food_items (item_name, description, price, category, shop_id, image_url, created_at) VALUES
('Croissant', 'Buttery flaky French pastry', 3.00, 'Pastries', 1, 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400', NOW()),
('Blueberry Muffin', 'Fresh baked muffin with blueberries', 3.50, 'Pastries', 1, 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400', NOW()),
('Chocolate Donut', 'Glazed donut with chocolate frosting', 2.50, 'Pastries', 1, 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400', NOW()),
('Cinnamon Roll', 'Sweet roll with cinnamon and icing', 4.00, 'Pastries', 1, 'https://images.unsplash.com/photo-1519869325930-281384150729?w=400', NOW()),
('Danish Pastry', 'Fruit-filled Danish pastry', 3.75, 'Pastries', 1, 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=400', NOW());
-- Seed inventory for shop 1 pastries
INSERT INTO tbl_inventory (shop_id, food_item_id, quantity_available, created_at)
SELECT fi.shop_id, fi.food_item_id, 100, NOW()
FROM tbl_food_items fi
WHERE fi.shop_id = 1 AND fi.category = 'Pastries';

-- Breakfast
INSERT INTO tbl_food_items (item_name, description, price, category, shop_id, image_url, created_at) VALUES
('Bacon & Egg Sandwich', 'Crispy bacon and fried egg on toasted bread', 6.00, 'Breakfast', 1, 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400', NOW()),
('Pancake Stack', 'Three fluffy pancakes with maple syrup', 5.50, 'Breakfast', 1, 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=400', NOW()),
('French Toast', 'Classic French toast with powdered sugar', 5.00, 'Breakfast', 1, 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400', NOW()),
('Breakfast Burrito', 'Scrambled eggs, cheese, and sausage wrapped in tortilla', 6.50, 'Breakfast', 1, 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400', NOW()),
('Oatmeal Bowl', 'Warm oatmeal with fresh berries and nuts', 4.50, 'Breakfast', 1, 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=400', NOW());
-- Seed inventory for shop 1 breakfast
INSERT INTO tbl_inventory (shop_id, food_item_id, quantity_available, created_at)
SELECT fi.shop_id, fi.food_item_id, 100, NOW()
FROM tbl_food_items fi
WHERE fi.shop_id = 1 AND fi.category = 'Breakfast';

-- Sandwiches
INSERT INTO tbl_food_items (item_name, description, price, category, shop_id, image_url, created_at) VALUES
('Club Sandwich', 'Triple-decker with turkey, bacon, and veggies', 7.50, 'Sandwiches', 1, 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400', NOW()),
('Grilled Cheese', 'Melted cheddar on toasted sourdough', 5.00, 'Sandwiches', 1, 'https://images.unsplash.com/photo-1528736235302-52922df5c122?w=400', NOW()),
('Ham & Swiss', 'Honey ham with Swiss cheese and mustard', 6.00, 'Sandwiches', 1, 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=400', NOW()),
('Tuna Melt', 'Tuna salad with melted cheese', 6.50, 'Sandwiches', 1, 'https://images.unsplash.com/photo-1619096252214-ef06c45683e3?w=400', NOW()),
('Veggie Delight', 'Fresh vegetables with hummus spread', 5.50, 'Sandwiches', 1, 'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=400', NOW());
-- Seed inventory for shop 1 sandwiches
INSERT INTO tbl_inventory (shop_id, food_item_id, quantity_available, created_at)
SELECT fi.shop_id, fi.food_item_id, 100, NOW()
FROM tbl_food_items fi
WHERE fi.shop_id = 1 AND fi.category = 'Sandwiches';

-- Salads
INSERT INTO tbl_food_items (item_name, description, price, category, shop_id, image_url, created_at) VALUES
('Caesar Salad', 'Romaine lettuce with Caesar dressing and croutons', 6.00, 'Salads', 1, 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400', NOW()),
('Greek Salad', 'Mixed greens with feta, olives, and cucumbers', 6.50, 'Salads', 1, 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400', NOW()),
('Garden Salad', 'Fresh mixed vegetables with house dressing', 5.50, 'Salads', 1, 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400', NOW()),
('Chicken Caesar', 'Caesar salad topped with grilled chicken', 8.00, 'Salads', 1, 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=400', NOW()),
('Cobb Salad', 'Mixed greens with bacon, egg, avocado, and cheese', 8.50, 'Salads', 1, 'https://images.unsplash.com/photo-1607532941433-304659e8198a?w=400', NOW());
-- Seed inventory for shop 1 salads
INSERT INTO tbl_inventory (shop_id, food_item_id, quantity_available, created_at)
SELECT fi.shop_id, fi.food_item_id, 100, NOW()
FROM tbl_food_items fi
WHERE fi.shop_id = 1 AND fi.category = 'Salads';

-- ============================================
-- Lunch Corner (shop_id = 2)
-- ============================================

-- Main Course
INSERT INTO tbl_food_items (item_name, description, price, category, shop_id, image_url, created_at) VALUES
('Chicken Rice', 'Grilled chicken breast with garlic rice', 7.50, 'Main Course', 2, 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400', NOW()),
('Beef Bowl', 'Teriyaki beef with steamed vegetables and rice', 8.00, 'Main Course', 2, 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=400', NOW()),
('Pork Chop Meal', 'Breaded pork chop with mashed potatoes', 8.50, 'Main Course', 2, 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=400', NOW()),
('Fish Fillet', 'Pan-fried fish with lemon butter sauce', 9.00, 'Main Course', 2, 'https://images.unsplash.com/photo-1580959296753-c5b571a3a6fd?w=400', NOW()),
('BBQ Ribs', 'Tender ribs with barbecue sauce and coleslaw', 10.50, 'Main Course', 2, 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400', NOW());
-- Seed inventory for shop 2 main course
INSERT INTO tbl_inventory (shop_id, food_item_id, quantity_available, created_at)
SELECT fi.shop_id, fi.food_item_id, 100, NOW()
FROM tbl_food_items fi
WHERE fi.shop_id = 2 AND fi.category = 'Main Course';

-- Rice Bowls
INSERT INTO tbl_food_items (item_name, description, price, category, shop_id, image_url, created_at) VALUES
('Korean Beef Bowl', 'Bulgogi beef over steamed rice', 8.50, 'Rice Bowls', 2, 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=400', NOW()),
('Chicken Katsu Bowl', 'Crispy chicken cutlet with curry sauce', 8.00, 'Rice Bowls', 2, 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400', NOW()),
('Tofu Veggie Bowl', 'Marinated tofu with stir-fried vegetables', 7.00, 'Rice Bowls', 2, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400', NOW()),
('Spicy Pork Bowl', 'Spicy marinated pork with kimchi', 8.00, 'Rice Bowls', 2, 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400', NOW()),
('Salmon Teriyaki Bowl', 'Glazed salmon with teriyaki sauce', 9.50, 'Rice Bowls', 2, 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400', NOW());
-- Seed inventory for shop 2 rice bowls
INSERT INTO tbl_inventory (shop_id, food_item_id, quantity_available, created_at)
SELECT fi.shop_id, fi.food_item_id, 100, NOW()
FROM tbl_food_items fi
WHERE fi.shop_id = 2 AND fi.category = 'Rice Bowls';

-- Noodles
INSERT INTO tbl_food_items (item_name, description, price, category, shop_id, image_url, created_at) VALUES
('Chicken Noodle Soup', 'Egg noodles in savory chicken broth', 6.50, 'Noodles', 2, 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400', NOW()),
('Pad Thai', 'Thai-style stir-fried rice noodles', 7.50, 'Noodles', 2, 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400', NOW()),
('Beef Ramen', 'Japanese ramen with beef slices', 8.50, 'Noodles', 2, 'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=400', NOW()),
('Vegetable Lo Mein', 'Stir-fried noodles with mixed vegetables', 7.00, 'Noodles', 2, 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400', NOW()),
('Spicy Seafood Noodles', 'Noodles with shrimp and squid in spicy sauce', 9.00, 'Noodles', 2, 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400', NOW());
-- Seed inventory for shop 2 noodles
INSERT INTO tbl_inventory (shop_id, food_item_id, quantity_available, created_at)
SELECT fi.shop_id, fi.food_item_id, 100, NOW()
FROM tbl_food_items fi
WHERE fi.shop_id = 2 AND fi.category = 'Noodles';

-- Soups
INSERT INTO tbl_food_items (item_name, description, price, category, shop_id, image_url, created_at) VALUES
('Miso Soup', 'Traditional Japanese soup with tofu', 3.50, 'Soups', 2, 'https://images.unsplash.com/photo-1588566565463-180a5b2090d2?w=400', NOW()),
('Tom Yum', 'Spicy Thai soup with shrimp', 5.50, 'Soups', 2, 'https://images.unsplash.com/photo-1613844237701-8f3664fc2eff?w=400', NOW()),
('Wonton Soup', 'Pork wontons in clear broth', 5.00, 'Soups', 2, 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=400', NOW()),
('Chicken Corn Soup', 'Creamy soup with chicken and corn', 4.50, 'Soups', 2, 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400', NOW()),
('Beef Brisket Soup', 'Slow-cooked beef brisket in rich broth', 6.50, 'Soups', 2, 'https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?w=400', NOW());
-- Seed inventory for shop 2 soups
INSERT INTO tbl_inventory (shop_id, food_item_id, quantity_available, created_at)
SELECT fi.shop_id, fi.food_item_id, 100, NOW()
FROM tbl_food_items fi
WHERE fi.shop_id = 2 AND fi.category = 'Soups';

-- Side Dishes
INSERT INTO tbl_food_items (item_name, description, price, category, shop_id, image_url, created_at) VALUES
('Spring Rolls', 'Crispy vegetable spring rolls (3 pieces)', 4.00, 'Side Dishes', 2, 'https://images.unsplash.com/photo-1625395005224-0fce68d9a6ba?w=400', NOW()),
('Gyoza', 'Pan-fried Japanese dumplings (5 pieces)', 4.50, 'Side Dishes', 2, 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400', NOW()),
('Edamame', 'Steamed soybeans with sea salt', 3.50, 'Side Dishes', 2, 'https://images.unsplash.com/photo-1583797227388-6a0e7b245b34?w=400', NOW()),
('French Fries', 'Crispy golden fries', 3.00, 'Side Dishes', 2, 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=400', NOW()),
('Kimchi', 'Traditional Korean fermented vegetables', 3.00, 'Side Dishes', 2, 'https://images.unsplash.com/photo-1580797169967-c4b5ded8f710?w=400', NOW());
-- Seed inventory for shop 2 side dishes
INSERT INTO tbl_inventory (shop_id, food_item_id, quantity_available, created_at)
SELECT fi.shop_id, fi.food_item_id, 100, NOW()
FROM tbl_food_items fi
WHERE fi.shop_id = 2 AND fi.category = 'Side Dishes';

-- ============================================
-- Snack Shack (shop_id = 3)
-- ============================================

-- Snacks
INSERT INTO tbl_food_items (item_name, description, price, category, shop_id, image_url, created_at) VALUES
('Potato Chips', 'Crispy salted potato chips', 2.00, 'Snacks', 3, 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400', NOW()),
('Nachos & Cheese', 'Tortilla chips with melted cheese dip', 4.50, 'Snacks', 3, 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400', NOW()),
('Pretzels', 'Soft pretzels with mustard', 3.50, 'Snacks', 3, 'https://images.unsplash.com/photo-1558326567-98ae2405596b?w=400', NOW()),
('Popcorn', 'Buttered popcorn (large)', 3.00, 'Snacks', 3, 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=400', NOW()),
('Trail Mix', 'Healthy mix of nuts and dried fruits', 3.50, 'Snacks', 3, 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400', NOW());
-- Seed inventory for shop 3 snacks
INSERT INTO tbl_inventory (shop_id, food_item_id, quantity_available, created_at)
SELECT fi.shop_id, fi.food_item_id, 100, NOW()
FROM tbl_food_items fi
WHERE fi.shop_id = 3 AND fi.category = 'Snacks';

-- Beverages
INSERT INTO tbl_food_items (item_name, description, price, category, shop_id, image_url, created_at) VALUES
('Soda', 'Cold refreshing soda (various flavors)', 2.00, 'Beverages', 3, 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400', NOW()),
('Bottled Water', 'Pure spring water', 1.50, 'Beverages', 3, 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400', NOW()),
('Energy Drink', 'Energizing beverage', 3.50, 'Beverages', 3, 'https://images.unsplash.com/photo-1622543925917-763c34f1f7d2?w=400', NOW()),
('Iced Tea', 'Refreshing iced tea', 2.50, 'Beverages', 3, 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400', NOW()),
('Juice Box', 'Fruit juice (various flavors)', 2.00, 'Beverages', 3, 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400', NOW());
-- Seed inventory for shop 3 beverages
INSERT INTO tbl_inventory (shop_id, food_item_id, quantity_available, created_at)
SELECT fi.shop_id, fi.food_item_id, 100, NOW()
FROM tbl_food_items fi
WHERE fi.shop_id = 3 AND fi.category = 'Beverages';

-- Desserts
INSERT INTO tbl_food_items (item_name, description, price, category, shop_id, image_url, created_at) VALUES
('Ice Cream Cone', 'Vanilla or chocolate ice cream cone', 3.50, 'Desserts', 3, 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400', NOW()),
('Brownie', 'Fudgy chocolate brownie', 3.00, 'Desserts', 3, 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400', NOW()),
('Cookies', 'Chocolate chip cookies (3 pieces)', 2.50, 'Desserts', 3, 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400', NOW()),
('Cheesecake Slice', 'Creamy New York style cheesecake', 4.50, 'Desserts', 3, 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=400', NOW()),
('Apple Pie', 'Warm apple pie with cinnamon', 4.00, 'Desserts', 3, 'https://images.unsplash.com/photo-1535920527002-b35e96722eb9?w=400', NOW());
-- Seed inventory for shop 3 desserts
INSERT INTO tbl_inventory (shop_id, food_item_id, quantity_available, created_at)
SELECT fi.shop_id, fi.food_item_id, 100, NOW()
FROM tbl_food_items fi
WHERE fi.shop_id = 3 AND fi.category = 'Desserts';

-- Candy
INSERT INTO tbl_food_items (item_name, description, price, category, shop_id, image_url, created_at) VALUES
('Chocolate Bar', 'Milk chocolate candy bar', 1.50, 'Candy', 3, 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=400', NOW()),
('Gummy Bears', 'Assorted fruit gummy bears', 2.00, 'Candy', 3, 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=400', NOW()),
('Lollipop', 'Fruit-flavored lollipop', 1.00, 'Candy', 3, 'https://images.unsplash.com/photo-1625869016774-3a92be2ae2cd?w=400', NOW()),
('Sour Candy', 'Sour fruit-flavored candies', 2.00, 'Candy', 3, 'https://images.unsplash.com/photo-1499195333224-3ce974eecb47?w=400', NOW()),
('Mint Candy', 'Refreshing mint candies', 1.50, 'Candy', 3, 'https://images.unsplash.com/photo-1596140827248-ff87f2a7e4de?w=400', NOW());
-- Seed inventory for shop 3 candy
INSERT INTO tbl_inventory (shop_id, food_item_id, quantity_available, created_at)
SELECT fi.shop_id, fi.food_item_id, 100, NOW()
FROM tbl_food_items fi
WHERE fi.shop_id = 3 AND fi.category = 'Candy';

-- Quick Bites
INSERT INTO tbl_food_items (item_name, description, price, category, shop_id, image_url, created_at) VALUES
('Hot Dog', 'Grilled hot dog with condiments', 4.00, 'Quick Bites', 3, 'https://images.unsplash.com/photo-1612392062798-2704f3f50dac?w=400', NOW()),
('Mini Pizza', 'Personal-sized pepperoni pizza', 5.50, 'Quick Bites', 3, 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400', NOW()),
('Chicken Nuggets', 'Crispy chicken nuggets (6 pieces)', 5.00, 'Quick Bites', 3, 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400', NOW()),
('Corn Dog', 'Deep-fried cornbread-coated hot dog', 4.50, 'Quick Bites', 3, 'https://images.unsplash.com/photo-1599427303058-f04cbcf4756f?w=400', NOW()),
('Pretzel Dog', 'Hot dog wrapped in pretzel dough', 5.00, 'Quick Bites', 3, 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400', NOW());
-- Seed inventory for shop 3 quick bites
INSERT INTO tbl_inventory (shop_id, food_item_id, quantity_available, created_at)
SELECT fi.shop_id, fi.food_item_id, 100, NOW()
FROM tbl_food_items fi
WHERE fi.shop_id = 3 AND fi.category = 'Quick Bites';

-- Generic backfill: ensure every food item has an inventory row (idempotent-safe insert for any missed category)
INSERT INTO tbl_inventory (shop_id, food_item_id, quantity_available, created_at)
SELECT fi.shop_id, fi.food_item_id, 100, NOW()
FROM tbl_food_items fi
LEFT JOIN tbl_inventory inv ON inv.food_item_id = fi.food_item_id
WHERE inv.food_item_id IS NULL;

SELECT 'Database and data created successfully!' AS Status;