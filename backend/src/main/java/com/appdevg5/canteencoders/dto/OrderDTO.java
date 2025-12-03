package com.appdevg5.canteencoders.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.DecimalMin;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

/**
 * DTO for creating a new order.
 */
public class OrderDTO {

    @NotNull
    private Integer userId;

    @NotNull
    private Integer shopId;

    @NotNull
    private List<OrderItemDTO> orderItems;

    @NotNull
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal totalAmount;

    private LocalDateTime pickupTime;

    private String specialInstructions;

    @NotNull
    private String paymentMethod;

    // Constructors
    public OrderDTO() {}

    public OrderDTO(Integer userId, Integer shopId, List<OrderItemDTO> orderItems, BigDecimal totalAmount,
                     LocalDateTime pickupTime, String specialInstructions, String paymentMethod) {
        this.userId = userId;
        this.shopId = shopId;
        this.orderItems = orderItems;
        this.totalAmount = totalAmount;
        this.pickupTime = pickupTime;
        this.specialInstructions = specialInstructions;
        this.paymentMethod = paymentMethod;
    }

    // Getters and Setters
    public Integer getUserId() { return userId; }
    public void setUserId(Integer userId) { this.userId = userId; }

    public Integer getShopId() { return shopId; }
    public void setShopId(Integer shopId) { this.shopId = shopId; }

    public List<OrderItemDTO> getOrderItems() { return orderItems; }
    public void setOrderItems(List<OrderItemDTO> orderItems) { this.orderItems = orderItems; }

    public BigDecimal getTotalAmount() { return totalAmount; }
    public void setTotalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; }

    public LocalDateTime getPickupTime() { return pickupTime; }
    public void setPickupTime(LocalDateTime pickupTime) { this.pickupTime = pickupTime; }

    public String getSpecialInstructions() { return specialInstructions; }
    public void setSpecialInstructions(String specialInstructions) { this.specialInstructions = specialInstructions; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }
}
