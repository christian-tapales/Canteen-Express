USE canteen_express_db;

-- Clear existing data (in correct order due to foreign key constraints)
DELETE FROM tbl_food_items;
DELETE FROM tbl_shops;

-- Reset auto-increment
ALTER TABLE tbl_shops AUTO_INCREMENT = 1;
ALTER TABLE tbl_food_items AUTO_INCREMENT = 1;

-- Add sample shops
INSERT INTO tbl_shops (shop_name, description, created_at) VALUES
('Campus Cafe', 'Fresh coffee, pastries, and breakfast items', NOW()),
('Lunch Corner', 'Daily meal specials, rice bowls, and main courses', NOW()),
('Snack Shack', 'Quick snacks, drinks, and desserts', NOW());

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

-- Pastries
INSERT INTO tbl_food_items (item_name, description, price, category, shop_id, image_url, created_at) VALUES
('Croissant', 'Buttery flaky French pastry', 3.00, 'Pastries', 1, 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400', NOW()),
('Blueberry Muffin', 'Fresh baked muffin with blueberries', 3.50, 'Pastries', 1, 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400', NOW()),
('Chocolate Donut', 'Glazed donut with chocolate frosting', 2.50, 'Pastries', 1, 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400', NOW()),
('Cinnamon Roll', 'Sweet roll with cinnamon and icing', 4.00, 'Pastries', 1, 'https://images.unsplash.com/photo-1519869325930-281384150729?w=400', NOW()),
('Danish Pastry', 'Fruit-filled Danish pastry', 3.75, 'Pastries', 1, 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=400', NOW());

-- Breakfast
INSERT INTO tbl_food_items (item_name, description, price, category, shop_id, created_at) VALUES
('Bacon & Egg Sandwich', 'Crispy bacon and fried egg on toasted bread', 6.00, 'Breakfast', 1, NOW()),
('Pancake Stack', 'Three fluffy pancakes with maple syrup', 5.50, 'Breakfast', 1, NOW()),
('French Toast', 'Classic French toast with powdered sugar', 5.00, 'Breakfast', 1, NOW()),
('Breakfast Burrito', 'Scrambled eggs, cheese, and sausage wrapped in tortilla', 6.50, 'Breakfast', 1, NOW()),
('Oatmeal Bowl', 'Warm oatmeal with fresh berries and nuts', 4.50, 'Breakfast', 1, NOW());

-- Sandwiches
INSERT INTO tbl_food_items (item_name, description, price, category, shop_id, created_at) VALUES
('Club Sandwich', 'Triple-decker with turkey, bacon, and veggies', 7.50, 'Sandwiches', 1, NOW()),
('Grilled Cheese', 'Melted cheddar on toasted sourdough', 5.00, 'Sandwiches', 1, NOW()),
('Ham & Swiss', 'Honey ham with Swiss cheese and mustard', 6.00, 'Sandwiches', 1, NOW()),
('Tuna Melt', 'Tuna salad with melted cheese', 6.50, 'Sandwiches', 1, NOW()),
('Veggie Delight', 'Fresh vegetables with hummus spread', 5.50, 'Sandwiches', 1, NOW());

-- Salads
INSERT INTO tbl_food_items (item_name, description, price, category, shop_id, created_at) VALUES
('Caesar Salad', 'Romaine lettuce with Caesar dressing and croutons', 6.00, 'Salads', 1, NOW()),
('Greek Salad', 'Mixed greens with feta, olives, and cucumbers', 6.50, 'Salads', 1, NOW()),
('Garden Salad', 'Fresh mixed vegetables with house dressing', 5.50, 'Salads', 1, NOW()),
('Chicken Caesar', 'Caesar salad topped with grilled chicken', 8.00, 'Salads', 1, NOW()),
('Cobb Salad', 'Mixed greens with bacon, egg, avocado, and cheese', 8.50, 'Salads', 1, NOW());

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

-- Rice Bowls
INSERT INTO tbl_food_items (item_name, description, price, category, shop_id, created_at) VALUES
('Korean Beef Bowl', 'Bulgogi beef over steamed rice', 8.50, 'Rice Bowls', 2, NOW()),
('Chicken Katsu Bowl', 'Crispy chicken cutlet with curry sauce', 8.00, 'Rice Bowls', 2, NOW()),
('Tofu Veggie Bowl', 'Marinated tofu with stir-fried vegetables', 7.00, 'Rice Bowls', 2, NOW()),
('Spicy Pork Bowl', 'Spicy marinated pork with kimchi', 8.00, 'Rice Bowls', 2, NOW()),
('Salmon Teriyaki Bowl', 'Glazed salmon with teriyaki sauce', 9.50, 'Rice Bowls', 2, NOW());

-- Noodles
INSERT INTO tbl_food_items (item_name, description, price, category, shop_id, created_at) VALUES
('Chicken Noodle Soup', 'Egg noodles in savory chicken broth', 6.50, 'Noodles', 2, NOW()),
('Pad Thai', 'Thai-style stir-fried rice noodles', 7.50, 'Noodles', 2, NOW()),
('Beef Ramen', 'Japanese ramen with beef slices', 8.50, 'Noodles', 2, NOW()),
('Vegetable Lo Mein', 'Stir-fried noodles with mixed vegetables', 7.00, 'Noodles', 2, NOW()),
('Spicy Seafood Noodles', 'Noodles with shrimp and squid in spicy sauce', 9.00, 'Noodles', 2, NOW());

-- Soups
INSERT INTO tbl_food_items (item_name, description, price, category, shop_id, created_at) VALUES
('Miso Soup', 'Traditional Japanese soup with tofu', 3.50, 'Soups', 2, NOW()),
('Tom Yum', 'Spicy Thai soup with shrimp', 5.50, 'Soups', 2, NOW()),
('Wonton Soup', 'Pork wontons in clear broth', 5.00, 'Soups', 2, NOW()),
('Chicken Corn Soup', 'Creamy soup with chicken and corn', 4.50, 'Soups', 2, NOW()),
('Beef Brisket Soup', 'Slow-cooked beef brisket in rich broth', 6.50, 'Soups', 2, NOW());

-- Side Dishes
INSERT INTO tbl_food_items (item_name, description, price, category, shop_id, created_at) VALUES
('Spring Rolls', 'Crispy vegetable spring rolls (3 pieces)', 4.00, 'Side Dishes', 2, NOW()),
('Gyoza', 'Pan-fried Japanese dumplings (5 pieces)', 4.50, 'Side Dishes', 2, NOW()),
('Edamame', 'Steamed soybeans with sea salt', 3.50, 'Side Dishes', 2, NOW()),
('French Fries', 'Crispy golden fries', 3.00, 'Side Dishes', 2, NOW()),
('Kimchi', 'Traditional Korean fermented vegetables', 3.00, 'Side Dishes', 2, NOW());

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

-- Beverages
INSERT INTO tbl_food_items (item_name, description, price, category, shop_id, created_at) VALUES
('Soda', 'Cold refreshing soda (various flavors)', 2.00, 'Beverages', 3, NOW()),
('Bottled Water', 'Pure spring water', 1.50, 'Beverages', 3, NOW()),
('Energy Drink', 'Energizing beverage', 3.50, 'Beverages', 3, NOW()),
('Iced Tea', 'Refreshing iced tea', 2.50, 'Beverages', 3, NOW()),
('Juice Box', 'Fruit juice (various flavors)', 2.00, 'Beverages', 3, NOW());

-- Desserts
INSERT INTO tbl_food_items (item_name, description, price, category, shop_id, created_at) VALUES
('Ice Cream Cone', 'Vanilla or chocolate ice cream cone', 3.50, 'Desserts', 3, NOW()),
('Brownie', 'Fudgy chocolate brownie', 3.00, 'Desserts', 3, NOW()),
('Cookies', 'Chocolate chip cookies (3 pieces)', 2.50, 'Desserts', 3, NOW()),
('Cheesecake Slice', 'Creamy New York style cheesecake', 4.50, 'Desserts', 3, NOW()),
('Apple Pie', 'Warm apple pie with cinnamon', 4.00, 'Desserts', 3, NOW());

-- Candy
INSERT INTO tbl_food_items (item_name, description, price, category, shop_id, created_at) VALUES
('Chocolate Bar', 'Milk chocolate candy bar', 1.50, 'Candy', 3, NOW()),
('Gummy Bears', 'Assorted fruit gummy bears', 2.00, 'Candy', 3, NOW()),
('Lollipop', 'Fruit-flavored lollipop', 1.00, 'Candy', 3, NOW()),
('Sour Candy', 'Sour fruit-flavored candies', 2.00, 'Candy', 3, NOW()),
('Mint Candy', 'Refreshing mint candies', 1.50, 'Candy', 3, NOW());

-- Quick Bites
INSERT INTO tbl_food_items (item_name, description, price, category, shop_id, created_at) VALUES
('Hot Dog', 'Grilled hot dog with condiments', 4.00, 'Quick Bites', 3, NOW()),
('Mini Pizza', 'Personal-sized pepperoni pizza', 5.50, 'Quick Bites', 3, NOW()),
('Chicken Nuggets', 'Crispy chicken nuggets (6 pieces)', 5.00, 'Quick Bites', 3, NOW()),
('Corn Dog', 'Deep-fried cornbread-coated hot dog', 4.50, 'Quick Bites', 3, NOW()),
('Pretzel Dog', 'Hot dog wrapped in pretzel dough', 5.00, 'Quick Bites', 3, NOW());

SELECT 'Data inserted successfully!' AS Status;
