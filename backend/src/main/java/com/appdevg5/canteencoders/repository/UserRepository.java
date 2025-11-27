package com.appdevg5.canteencoders.repository;

import com.appdevg5.canteencoders.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

/**
 * Repository interface for User entity.
 * Handles all database operations related to the User.
 */
@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {

    /**
     * Finds a user by their email address.
     * Used for login and checking if an email is already registered.
     *
     * @param email The email to search for.
     * @return An Optional containing the User if found, or empty if not.
     */
    Optional<UserEntity> findByEmail(String email);
}