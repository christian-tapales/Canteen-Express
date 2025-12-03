package com.appdevg5.canteencoders.service;

import com.appdevg5.canteencoders.entity.UserEntity;
import com.appdevg5.canteencoders.repository.UserRepository;
import com.appdevg5.canteencoders.security.JwtService;
import com.appdevg5.canteencoders.dto.RegisterRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * Service class for User-related business logic,
 * focusing on authentication and registration.
 */
@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    /**
     * Registers a new user in the system.
     * All new users default to the 'CUSTOMER' role.
     */
    @Transactional
    public void register(RegisterRequest request) { // <-- 1. CHANGED: Use the DTO
        
        // 2. CHANGED: Use getters from the DTO
        String email = request.getEmail();

        // 1. Check if email already exists
        if (userRepository.findByEmail(email).isPresent()) {
            throw new IllegalStateException("Email already in use");
        }

        // 2. Create the new user object
        UserEntity user = new UserEntity(
            request.getFirstName(),    // <-- Use getter
            request.getLastName(),     // <-- Use getter
            email,
            passwordEncoder.encode(request.getPassword()), // <-- Use getter
            request.getPhoneNumber()   // <-- Use getter
        );
        // The User entity constructor correctly defaults the role to CUSTOMER

        // 3. Save the user to the database
        userRepository.save(user);
    }

    /**
     * Finds a user by email.
     */
    public UserEntity findByEmail(String email) {
        return userRepository.findByEmail(email)
            .orElseThrow(() -> new IllegalStateException("User not found"));
    }

    /**
     * Finds a user by ID.
     */
    public Optional<UserEntity> findById(Integer userId) {
        return userRepository.findById(userId);
    }

    /**
     * Retrieves all users.
     */
    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }

    /**
     * Generates authentication response for a user.
     */
    public Map<String, Object> generateAuthResponse(UserEntity user) {
        UserDetails userDetails = loadUserByUsername(user.getEmail());
        String jwtToken = jwtService.generateToken(userDetails);

        Map<String, Object> response = new HashMap<>();
        response.put("token", jwtToken);
        response.put("userId", user.getUserId());
        response.put("role", user.getRole().toString());
        return response;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity user = userRepository.findByEmail(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // This is correct. It builds a Spring Security UserDetails object.
        return org.springframework.security.core.userdetails.User.builder()
            .username(user.getEmail())
            .password(user.getPasswordHash())
            .roles(user.getRole().toString())
            .build();
    }

    /**
     * Updates an existing user.
     */
    @Transactional
    public UserEntity updateUser(Integer userId, UserEntity userDetails) {
        UserEntity user = userRepository.findById(userId)
            .orElseThrow(() -> new IllegalStateException("User not found"));
        user.setFirstName(userDetails.getFirstName());
        user.setLastName(userDetails.getLastName());
        user.setEmail(userDetails.getEmail());
        user.setPhoneNumber(userDetails.getPhoneNumber());
        user.setRole(userDetails.getRole());
        // Note: Password update would require separate handling for security
        return userRepository.save(user);
    }

    /**
     * Deletes a user by ID.
     */
    @Transactional
    public void deleteUser(Integer userId) {
        if (!userRepository.existsById(userId)) {
            throw new IllegalStateException("User not found");
        }
        userRepository.deleteById(userId);
    }
}
