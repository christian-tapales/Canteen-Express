package com.canteen.express.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;
import java.time.LocalDateTime;

/**
 * Represents the inventory/stock for a food item.
 * Tracks available quantity for each food item in a shop.
 */
@Entity
@Table(name = "tbl_inventory")
public class InventoryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "inventory_id")
    private Integer inventoryId;

    /**
     * FOREIGN KEY to the 'food_items' table.
     * Each inventory entry is tied to a specific food item.
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

    public InventoryEntity() {
        // Default constructor required by JPA
    }

    public InventoryEntity(FoodItemEntity foodItem, Integer quantityAvailable) {
        this.foodItem = foodItem;
        this.quantityAvailable = quantityAvailable;
    }

    // --- Getters and Setters ---

    public Integer getInventoryId() { return inventoryId; }
    public void setInventoryId(Integer inventoryId) { this.inventoryId = inventoryId; }

    public FoodItemEntity getFoodItem() { return foodItem; }
    public void setFoodItem(FoodItemEntity foodItem) { this.foodItem = foodItem; }

    public Integer getQuantityAvailable() { return quantityAvailable; }
    public void setQuantityAvailable(Integer quantityAvailable) { this.quantityAvailable = quantityAvailable; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
