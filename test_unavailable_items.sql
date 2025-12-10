-- Test script to mark some items as unavailable
-- Run this in MySQL Workbench to test the out-of-stock feature

USE canteen_express_db;

-- Mark a few items as unavailable for testing
-- You can change these back to 1 (available) later

-- Campus Cafe - Mark Pancakes as unavailable
UPDATE tbl_food_items 
SET is_available = 0 
WHERE item_name = 'Pancakes' AND shop_id = 1;

-- Lunch Corner - Mark Beef Caldereta as unavailable
UPDATE tbl_food_items 
SET is_available = 0 
WHERE item_name = 'Beef Caldereta' AND shop_id = 2;

-- Snack Shack - Mark Graham Bars as unavailable
UPDATE tbl_food_items 
SET is_available = 0 
WHERE item_name = 'Graham Bars' AND shop_id = 3;

-- Verify the changes
SELECT 
    food_item_id,
    item_name,
    shop_id,
    is_available,
    price
FROM tbl_food_items
WHERE is_available = 0;

-- To restore availability, run:
-- UPDATE tbl_food_items SET is_available = 1 WHERE is_available = 0;
