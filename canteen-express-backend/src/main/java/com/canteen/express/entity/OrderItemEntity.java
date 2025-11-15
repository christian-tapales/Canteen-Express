package com.canteen.express.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.DecimalMin;
import java.math.BigDecimal;

/**
 * Represents an item within an order.
 * Links a food item to an order with quantity and price at the time of order.
 */
@Entity
@Table(name = "tbl_order_items")
public class OrderItemEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_item_id")
    private Integer orderItemId;

    /**
     * FOREIGN KEY to the 'orders' table.
     */
    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private OrderEntity order;

    /**
     * FOREIGN KEY to the 'food_items' table.
     */
    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "food_item_id", nullable = false)
    private FoodItemEntity foodItem;

    @NotNull
    @Min(1)
    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @NotNull
    @DecimalMin(value = "0.0", inclusive = false)
    @Column(name = "price_at_order", precision = 10, scale = 2, nullable = false)
    private BigDecimal priceAtOrder;

    // --- Constructors ---

    public OrderItemEntity() {
        // Default constructor required by JPA
    }

    public OrderItemEntity(OrderEntity order, FoodItemEntity foodItem, Integer quantity, BigDecimal priceAtOrder) {
        this.order = order;
        this.foodItem = foodItem;
        this.quantity = quantity;
        this.priceAtOrder = priceAtOrder;
    }

    // --- Getters and Setters ---

    public Integer getOrderItemId() { return orderItemId; }
    public void setOrderItemId(Integer orderItemId) { this.orderItemId = orderItemId; }

    public OrderEntity getOrder() { return order; }
    public void setOrder(OrderEntity order) { this.order = order; }

    public FoodItemEntity getFoodItem() { return foodItem; }
    public void setFoodItem(FoodItemEntity foodItem) { this.foodItem = foodItem; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public BigDecimal getPriceAtOrder() { return priceAtOrder; }
    public void setPriceAtOrder(BigDecimal priceAtOrder) { this.priceAtOrder = priceAtOrder; }
}
