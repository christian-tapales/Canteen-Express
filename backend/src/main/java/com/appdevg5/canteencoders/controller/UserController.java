package com.appdevg5.canteencoders.controller;

// Import the new DTOs
import com.appdevg5.canteencoders.dto.LoginRequest;
import com.appdevg5.canteencoders.dto.RegisterRequest;
import com.appdevg5.canteencoders.entity.UserEntity;
import com.appdevg5.canteencoders.service.UserService;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;
/**
 * REST Controller for User Authentication endpoints (Login/Register).
 */
@RestController
@RequestMapping("/api/auth") // Base path for authentication
public class UserController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;

    @Autowired
    public UserController(UserService userService, AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
    }

    /**
     * Endpoint for registering a new user.
     * @param registerRequest Map containing registration details.
     * @return A confirmation message.
     */
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest request) {
        try {
            // Pass the DTO directly to the service
            userService.register(request);
            return ResponseEntity.ok("User registered successfully!");
        } catch (IllegalStateException e) {
            // This catches the "Email already in use" error from your service
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /**
     * Endpoint for user login.
     * @param loginRequest Map containing login credentials.
     * @return A Map with JWT token, userId, and role.
     */
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginUser(@Valid @RequestBody LoginRequest request) {
        try {
            // 1. Authenticate the user (now using getters from the DTO)
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    request.getEmail(),    // <-- Use DTO getter
                    request.getPassword()  // <-- Use DTO getter
                )
            );

            // 2. Set authentication in security context
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // 3. Find the user to get their details
            UserEntity user = userService.findByEmail(request.getEmail());

            // 4. Generate the auth response
            Map<String, Object> authResponse = userService.generateAuthResponse(user);
            return ResponseEntity.ok(authResponse);

        } catch (Exception e) {
            // This will catch bad credentials
            return ResponseEntity.status(401).body(null); // 401 Unauthorized
        }
    }
}
