-- ============================================
-- Canteen Express - Create Vendor Accounts
-- ============================================
-- This script creates vendor accounts for each shop
-- plus admin and customer test accounts
-- Password for all accounts: password
-- ============================================

USE canteen_express_db;

-- Hashed password for 'password' using BCrypt
SET @hashed_password = '$2a$10$Fz1XgTT3CFH3YR8v1fiJVOCI8hxjblZ3jGyxTe5Zr06AnjNteq/lS';

-- Delete existing test accounts (to avoid duplicates)
DELETE FROM tbl_users WHERE email IN (
    'vendor.campuscafe@canteen.com',
    'vendor.lunchcorner@canteen.com',
    'vendor.snackshack@canteen.com',
    'admin@canteen.com',
    'alice.customer@email.com',
    'bob.customer@email.com'
);

-- ============================================
-- Create Vendor Accounts
-- ============================================

-- Vendor 1: Campus Cafe (shop_id = 1)
INSERT INTO tbl_users (email, first_name, last_name, password_hash, phone_number, role, shop_id, created_at) 
VALUES (
    'vendor.campuscafe@canteen.com',
    'Maria',
    'Santos',
    @hashed_password,
    '09171234567',
    'VENDOR',
    1,
    NOW()
);

-- Vendor 2: Lunch Corner (shop_id = 2)
INSERT INTO tbl_users (email, first_name, last_name, password_hash, phone_number, role, shop_id, created_at) 
VALUES (
    'vendor.lunchcorner@canteen.com',
    'Juan',
    'Dela Cruz',
    @hashed_password,
    '09181234567',
    'VENDOR',
    2,
    NOW()
);

-- Vendor 3: Snack Shack (shop_id = 3)
INSERT INTO tbl_users (email, first_name, last_name, password_hash, phone_number, role, shop_id, created_at) 
VALUES (
    'vendor.snackshack@canteen.com',
    'Anna',
    'Reyes',
    @hashed_password,
    '09191234567',
    'VENDOR',
    3,
    NOW()
);

-- ============================================
-- Create Admin Account
-- ============================================

INSERT INTO tbl_users (email, first_name, last_name, password_hash, phone_number, role, shop_id, created_at) 
VALUES (
    'admin@canteen.com',
    'Admin',
    'User',
    @hashed_password,
    '09201234567',
    'ADMIN',
    NULL,
    NOW()
);

-- ============================================
-- Create Customer Test Accounts
-- ============================================

INSERT INTO tbl_users (email, first_name, last_name, password_hash, phone_number, role, shop_id, created_at) 
VALUES (
    'alice.customer@email.com',
    'Alice',
    'Johnson',
    @hashed_password,
    '09211234567',
    'CUSTOMER',
    NULL,
    NOW()
);

INSERT INTO tbl_users (email, first_name, last_name, password_hash, phone_number, role, shop_id, created_at) 
VALUES (
    'bob.customer@email.com',
    'Bob',
    'Smith',
    @hashed_password,
    '09221234567',
    'CUSTOMER',
    NULL,
    NOW()
);

-- ============================================
-- Verification Query
-- ============================================

SELECT 
    user_id,
    email,
    CONCAT(first_name, ' ', last_name) AS name,
    role,
    shop_id,
    created_at
FROM tbl_users
WHERE email IN (
    'vendor.campuscafe@canteen.com',
    'vendor.lunchcorner@canteen.com',
    'vendor.snackshack@canteen.com',
    'admin@canteen.com',
    'alice.customer@email.com',
    'bob.customer@email.com'
)
ORDER BY role DESC, user_id;

-- ============================================
-- Summary
-- ============================================
-- 
-- VENDOR ACCOUNTS:
--   vendor.campuscafe@canteen.com / password (Campus Cafe - Shop 1)
--   vendor.lunchcorner@canteen.com / password (Lunch Corner - Shop 2)
--   vendor.snackshack@canteen.com / password (Snack Shack - Shop 3)
--
-- ADMIN ACCOUNT:
--   admin@canteen.com / password
--
-- CUSTOMER ACCOUNTS:
--   alice.customer@email.com / password
--   bob.customer@email.com / password
--
-- ============================================
