-- ============================================
-- CREATE VENDOR ACCOUNTS FOR EACH SHOP
-- ============================================

USE canteen_express_db;

-- Insert vendor users with BCrypt encoded passwords (password: "password")
-- Note: In production, use Spring Security's BCryptPasswordEncoder to generate these
-- The password hash below is for "password" (easier to remember for testing)

INSERT INTO tbl_users (first_name, last_name, email, password_hash, phone_number, role, shop_id, created_at, updated_at) VALUES
(
    'John',
    'Smith',
    'vendor.campuscafe@canteen.com',
    '$2a$12$LZ3pSP5L7dRGmcwb1BnQMOhGYbgHjpNLsKLJpXg5v5/PVB42zaBvO', -- password
    '555-0101',
    'VENDOR',
    1, -- Campus Cafe
    NOW(),
    NOW()
),
(
    'Maria',
    'Garcia',
    'vendor.lunchcorner@canteen.com',
    '$2a$12$LZ3pSP5L7dRGmcwb1BnQMOhGYbgHjpNLsKLJpXg5v5/PVB42zaBvO', -- password
    '555-0102',
    'VENDOR',
    2, -- Lunch Corner
    NOW(),
    NOW()
),
(
    'David',
    'Chen',
    'vendor.snackshack@canteen.com',
    '$2a$12$LZ3pSP5L7dRGmcwb1BnQMOhGYbgHjpNLsKLJpXg5v5/PVB42zaBvO', -- password
    '555-0103',
    'VENDOR',
    3, -- Snack Shack
    NOW(),
    NOW()
);

-- Optionally create a sample admin user if not exists
INSERT INTO tbl_users (first_name, last_name, email, password_hash, phone_number, role, shop_id, created_at, updated_at) 
SELECT 'Admin', 'User', 'admin@canteen.com', '$2a$12$LZ3pSP5L7dRGmcwb1BnQMOhGYbgHjpNLsKLJpXg5v5/PVB42zaBvO', '555-0100', 'ADMIN', NULL, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM tbl_users WHERE email = 'admin@canteen.com');

-- Optionally create sample customer users for testing
INSERT INTO tbl_users (first_name, last_name, email, password_hash, phone_number, role, shop_id, created_at, updated_at) VALUES
(
    'Alice',
    'Johnson',
    'alice.customer@email.com',
    '$2a$12$LZ3pSP5L7dRGmcwb1BnQMOhGYbgHjpNLsKLJpXg5v5/PVB42zaBvO', -- password
    '555-0201',
    'CUSTOMER',
    NULL,
    NOW(),
    NOW()
),
(
    'Bob',
    'Williams',
    'bob.customer@email.com',
    '$2a$12$LZ3pSP5L7dRGmcwb1BnQMOhGYbgHjpNLsKLJpXg5v5/PVB42zaBvO', -- password
    '555-0202',
    'CUSTOMER',
    NULL,
    NOW(),
    NOW()
);

SELECT 'Vendor and test users created successfully!' AS Status;

-- Display created users
SELECT user_id, first_name, last_name, email, role, shop_id 
FROM tbl_users 
WHERE role IN ('VENDOR', 'ADMIN')
ORDER BY role, user_id;
