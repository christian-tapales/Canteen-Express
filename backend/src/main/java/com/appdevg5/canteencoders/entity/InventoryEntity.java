package com.appdevg5.canteencoders.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

/**
 * Represents the inventory/stock for a food item.
 * Tracks available quantity for each food item in a shop.
 * Updated to include a direct link to the Shop for easier querying.
 */
@Entity
@Table(name = "tbl_inventory")
public class InventoryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "inventory_id")
    private Integer inventoryId;

    /**
     * FOREIGN KEY to the 'shops' table.
     * Direct link to the shop this inventory belongs to.
     * Essential for efficient queries like "Get all stock for Shop A".
     */
    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shop_id", nullable = false)
    private ShopEntity shop;

    /**
     * FOREIGN KEY to the 'food_items' table.
     * Each inventory entry is tied to a specific food item.
     * Since FoodItem is unique to a shop, this is a One-to-One relationship
     * (One Food Item has One Inventory Record).
     */
    @NotNull
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "food_item_id", nullable = false, unique = true)
    private FoodItemEntity foodItem;

    @NotNull
    @Min(0)
    @Column(name = "quantity_available", nullable = false)
    private Integer quantityAvailable;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // --- Life Cycle Methods ---

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        validateShopConsistency();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
        validateShopConsistency();
    }

    /**
     * Safety Check: Ensures the Food Item actually belongs to the Shop linked here.
     * Prevents data corruption where an inventory row links Shop A to a Burger from Shop B.
     */
    private void validateShopConsistency() {
        if (this.shop != null && this.foodItem != null) {
            if (!this.shop.getShopId().equals(this.foodItem.getShop().getShopId())) {
                throw new IllegalStateException("Data Integrity Error: Inventory Shop ID does not match Food Item's Shop ID.");
            }
        }
    }

    // --- Constructors ---

    public InventoryEntity() {
        // Default constructor required by JPA
    }

    /**
     * Constructor for creating new inventory.
     * Automatically sets the Shop based on the Food Item to ensure consistency.
     */
    public InventoryEntity(FoodItemEntity foodItem, Integer quantityAvailable) {
        this.foodItem = foodItem;
        this.shop = foodItem.getShop(); // Auto-link the shop from the food item
        this.quantityAvailable = quantityAvailable;
    }

    // --- Getters and Setters ---

    public Integer getInventoryId() { return inventoryId; }
    public void setInventoryId(Integer inventoryId) { this.inventoryId = inventoryId; }

    public ShopEntity getShop() { return shop; }
    public void setShop(ShopEntity shop) { this.shop = shop; }

    public FoodItemEntity getFoodItem() { return foodItem; }
    public void setFoodItem(FoodItemEntity foodItem) { this.foodItem = foodItem; }

    public Integer getQuantityAvailable() { return quantityAvailable; }
    public void setQuantityAvailable(Integer quantityAvailable) { this.quantityAvailable = quantityAvailable; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}