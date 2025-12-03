package com.appdevg5.canteencoders.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;

/**
 * Represents a shop (e.g., "Main Canteen," "Snack Express") in the multi-shop system.
 * Each shop has its own menu and inventory managed by vendors.
 */
@Entity
@Table(name = "tbl_shops")
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

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

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

    public ShopEntity() {
        // Default constructor required by JPA
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


    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
