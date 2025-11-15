package com.canteen.express.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Represents a food item in a shop's menu.
 * Denormalized model: Each food item is tied to a specific shop_id.
 * This allows vendors to manage their own shop's items securely.
 */
@Entity
@Table(name = "tbl_food_items")
public class FoodItemEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "food_item_id")
    private Integer foodItemId;

    @NotNull
    @Size(max = 100)
    @Column(name = "item_name", length = 100, nullable = false)
    private String itemName;

    @Size(max = 255)
    @Column(name = "description", length = 255)
    private String description;

    @NotNull
    @DecimalMin(value = "0.0", inclusive = false)
    @Column(name = "price", precision = 10, scale = 2, nullable = false)
    private BigDecimal price;

    @Size(max = 50)
    @Column(name = "category", length = 50)
    private String category;

    /**
     * FOREIGN KEY to the 'shops' table.
     * Each food item belongs to a specific shop.
     */
    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shop_id", nullable = false)
    private ShopEntity shop;

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

    public FoodItemEntity() {
        // Default constructor required by JPA
    }

    public FoodItemEntity(String itemName, String description, BigDecimal price, String category, ShopEntity shop) {
        this.itemName = itemName;
        this.description = description;
        this.price = price;
        this.category = category;
        this.shop = shop;
    }

    // --- Getters and Setters ---

    public Integer getFoodItemId() { return foodItemId; }
    public void setFoodItemId(Integer foodItemId) { this.foodItemId = foodItemId; }

    public String getItemName() { return itemName; }
    public void setItemName(String itemName) { this.itemName = itemName; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public ShopEntity getShop() { return shop; }
    public void setShop(ShopEntity shop) { this.shop = shop; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
