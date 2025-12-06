package com.appdevg5.canteencoders.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.DecimalMin;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Represents an order placed by a customer.
 * Updated to support Vendor Confirmation workflow.
 */
@Entity
@Table(name = "tbl_orders")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class OrderEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Integer orderId;

    /**
     * FOREIGN KEY to the 'users' table.
     * The customer who placed the order.
     */
    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    /**
     * FOREIGN KEY to the 'shops' table.
     * The shop from which the order is placed.
     */
    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shop_id", nullable = false)
    private ShopEntity shop;

    /**
     * One-to-Many link to Order Items.
     * Essential for accessing the specific food items when deducting inventory.
     */
    @JsonManagedReference("order-items")
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItemEntity> orderItems = new ArrayList<>();

    /**
     * One-to-One link to Payment.
     * Useful for checking payment details directly from the order.
     */
    @JsonManagedReference("order-payment")
    @OneToOne(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private PaymentEntity payment;

    @NotNull
    @DecimalMin(value = "0.0", inclusive = false)
    @Column(name = "total_amount", precision = 10, scale = 2, nullable = false)
    private BigDecimal totalAmount;

    /**
     * Status of the order.
     * Now includes PAID_PENDING_VENDOR for the confirmation workflow.
     */
    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "status", length = 30, nullable = false)
    private OrderStatus status = OrderStatus.PENDING;

    @Column(name = "special_instructions", columnDefinition = "TEXT")
    private String specialInstructions;

    @Column(name = "order_date", updatable = false)
    private LocalDateTime orderDate;

    // --- NEW FIELD: Tracks when the vendor clicked "Confirm" ---
    @Column(name = "confirmed_at")
    private LocalDateTime confirmedAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // --- Enum Definition for OrderStatus ---
    public enum OrderStatus {
        PENDING,            //Customer created order, Customer paid (or Gcash confirmed), waiting for Vendor to accept
        PREPARING,          // Vendor accepted, Inventory deducted and the Vendor is cooking/packing
        READY,              // Ready for pickup
        COMPLETED,          // Customer picked up
        CANCELLED,          // Order cancelled by the student and refunded
        REJECTED,           // Vendor rejected the order and refunded
    }

    // --- Life Cycle Methods (for timestamps) ---

    @PrePersist
    protected void onCreate() {
        this.orderDate = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    // --- Constructors ---

    public OrderEntity() {
        // Default constructor required by JPA
    }

    public OrderEntity(UserEntity user, ShopEntity shop, BigDecimal totalAmount) {
        this.user = user;
        this.shop = shop;
        this.totalAmount = totalAmount;
    }

    // --- Getters and Setters ---

    public Integer getOrderId() { return orderId; }
    public void setOrderId(Integer orderId) { this.orderId = orderId; }

    public UserEntity getUser() { return user; }
    public void setUser(UserEntity user) { this.user = user; }

    public ShopEntity getShop() { return shop; }
    public void setShop(ShopEntity shop) { this.shop = shop; }

    public List<OrderItemEntity> getOrderItems() { return orderItems; }
    public void setOrderItems(List<OrderItemEntity> orderItems) { this.orderItems = orderItems; }

    public PaymentEntity getPayment() { return payment; }
    public void setPayment(PaymentEntity payment) { this.payment = payment; }

    public BigDecimal getTotalAmount() { return totalAmount; }
    public void setTotalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; }

    public OrderStatus getStatus() { return status; }
    public void setStatus(OrderStatus status) { this.status = status; }

    public LocalDateTime getOrderDate() { return orderDate; }
    public void setOrderDate(LocalDateTime orderDate) { this.orderDate = orderDate; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public String getSpecialInstructions() { return specialInstructions; }
    public void setSpecialInstructions(String specialInstructions) { this.specialInstructions = specialInstructions; }

    public LocalDateTime getConfirmedAt() { return confirmedAt; }
    public void setConfirmedAt(LocalDateTime confirmedAt) { this.confirmedAt = confirmedAt; }
}