package com.appdevg5.canteencoders.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

/**
 * Represents a shop (e.g., "Main Canteen," "Snack Express").
 * Updated to include a link back to the Vendor/Users managing it.
 */
@Entity
@Table(name = "tbl_shops")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class ShopEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "shop_id")
    private Integer shopId;

    @NotNull
    @Size(max = 100)
    @Column(name = "shop_name", length = 100, nullable = false, unique = true)
    private String shopName;

    @Size(max = 255)
    @Column(name = "description", length = 255)
    private String description;

    @Size(max = 50)
    @Column(name = "payment_number", length = 50)
    private String paymentNumber;

    @Size(max = 255)
    @Column(name = "image_url", length = 255)
    private String imageUrl;

    @NotNull
    @Column(name = "is_open", nullable = false)
    private Boolean isOpen = true;

    /**
     * ✅ NEW: Bidirectional link to Users.
     * This lets the Shop object access the list of users (Vendors/Staff) assigned to it.
     * Mapped by the 'shop' field in UserEntity.
     */
    @JsonManagedReference
    @OneToMany(mappedBy = "shop", fetch = FetchType.LAZY)
    private List<UserEntity> users = new ArrayList<>();

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // --- Life Cycle Methods ---

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    /**
     * ✅ NEW HELPER: Get the Vendor.
     * Convenience method to find the specific VENDOR among the users assigned to this shop.
     * Returns null if no vendor is assigned yet.
     */
    public UserEntity getVendor() {
        if (users == null || users.isEmpty()) {
            return null;
        }
        return users.stream()
                .filter(u -> u.getRole() == UserEntity.Role.VENDOR)
                .findFirst()
                .orElse(null);
    }

    // --- Constructors ---

    public ShopEntity() {
    }

    public ShopEntity(String shopName, String description) {
        this.shopName = shopName;
        this.description = description;
    }

    // --- Getters and Setters ---

    public Integer getShopId() { return shopId; }
    public void setShopId(Integer shopId) { this.shopId = shopId; }

    public String getShopName() { return shopName; }
    public void setShopName(String shopName) { this.shopName = shopName; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getPaymentNumber() { return paymentNumber; }
    public void setPaymentNumber(String paymentNumber) { this.paymentNumber = paymentNumber; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public Boolean getIsOpen() { return isOpen; }
    public void setIsOpen(Boolean isOpen) { this.isOpen = isOpen; }

    public List<UserEntity> getUsers() { return users; }
    public void setUsers(List<UserEntity> users) { this.users = users; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}