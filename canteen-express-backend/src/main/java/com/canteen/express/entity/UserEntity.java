package com.canteen.express.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;

/**
 * Represents a user (Customer, Vendor, or Admin) in the system.
 * The 'role' determines privileges, and 'shop' is nullable for staff assignment.
 * This is the final version based on the admin-controlled role elevation strategy.
 */
@Entity
@Table(name = "tbl_users")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Integer userId;

    /**
     * FOREIGN KEY to the 'shop' table. Nullable because only Vendor and Admin accounts
     * are manually assigned to a shop by the system administrator via SQL.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shop_id", nullable = true)
    private ShopEntity shop; // CORRECTED: Was 'Shop'

    @NotNull
    @Size(max = 100)
    @Column(name = "first_name", length = 100, nullable = false)
    private String firstName;

    @NotNull
    @Size(max = 100)
    @Column(name = "last_name", length = 100, nullable = false)
    private String lastName;

    @Email
    @NotNull
    @Size(max = 100)
    @Column(name = "email", length = 100, unique = true, nullable = false)
    private String email;

    @Size(max = 20)
    @Column(name = "phone_number", length = 20)
    private String phoneNumber;

    @NotNull
    @Column(name = "password_hash", length = 255, nullable = false)
    private String passwordHash;

    /**
     * Defines the user's role (Customer, Vendor, Admin).
     * Defaults to CUSTOMER and is manually elevated by the administrator via SQL.
     */
    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "role", length = 20, nullable = false)
    private Role role = Role.CUSTOMER;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // --- Enum Definition for Role ---

    public enum Role {
        CUSTOMER, // Default role (Student)
        VENDOR,   // Canteen Staff role
        ADMIN     // System Administrator role
    }

    // --- Life Cycle Methods (for timestamps) ---

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    // --- Constructors ---

    public UserEntity() { // CORRECTED: Was 'User()'
        // Default constructor required by JPA
    }

    /**
     * Constructor used for the initial registration process.
     */
    public UserEntity(String firstName, String lastName, String email, String passwordHash, String phoneNumber) { // CORRECTED: Was 'User()'
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.passwordHash = passwordHash;
        this.phoneNumber = phoneNumber;
        this.role = Role.CUSTOMER; // Always defaults to customer upon registration
    }

    // --- Getters and Setters ---

    public Integer getUserId() { return userId; }
    public void setUserId(Integer userId) { this.userId = userId; }

    public ShopEntity getShop() { return shop; } // CORRECTED: Was 'Shop'
    public void setShop(ShopEntity shop) { this.shop = shop; } // CORRECTED: Was 'Shop'

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getPasswordHash() { return passwordHash; }
    public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}