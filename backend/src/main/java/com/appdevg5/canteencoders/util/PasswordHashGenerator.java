package com.appdevg5.canteencoders.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * Utility class to generate BCrypt password hashes.
 * Run this class to generate password hashes for your users.
 * 
 * Usage: Update the password in main method and run to get the hash.
 */
public class PasswordHashGenerator {
    
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        
        // Password to encode
        String password = "vendor123";
        
        // Generate hash
        String hashedPassword = encoder.encode(password);
        
        System.out.println("==========================================");
        System.out.println("Password: " + password);
        System.out.println("BCrypt Hash: " + hashedPassword);
        System.out.println("==========================================");
        
        // Verify the hash works
        boolean matches = encoder.matches(password, hashedPassword);
        System.out.println("Hash verification: " + (matches ? "SUCCESS ✓" : "FAILED ✗"));
        
        // Generate hashes for common passwords
        System.out.println("\nCommon passwords:");
        generateHash(encoder, "vendor123");
        generateHash(encoder, "admin123");
        generateHash(encoder, "customer123");
    }
    
    private static void generateHash(BCryptPasswordEncoder encoder, String password) {
        String hash = encoder.encode(password);
        System.out.println("\nPassword: " + password);
        System.out.println("Hash: " + hash);
    }
}
