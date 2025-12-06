package com.appdevg5.canteencoders.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.DecimalMin;
import java.math.BigDecimal;
import java.util.List;

/**
 * DTO for creating a new order.
 */
public class OrderDTO {

    @NotNull
    private Integer userId;

    @NotNull
    private Integer shopId;

    private String status;
    private String transactionCode;

    @NotNull
    private List<OrderItemDTO> orderItems;

    @NotNull
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal totalAmount;

    private String specialInstructions;

    @NotNull
    private String paymentMethod;

    // Constructors
    public OrderDTO() {}

    public OrderDTO(Integer userId, Integer shopId, List<OrderItemDTO> orderItems, BigDecimal totalAmount, String specialInstructions, String paymentMethod) {
        this.userId = userId;
        this.shopId = shopId;
        this.orderItems = orderItems;
        this.totalAmount = totalAmount;
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

    public String getSpecialInstructions() { return specialInstructions; }
    public void setSpecialInstructions(String specialInstructions) { this.specialInstructions = specialInstructions; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }

    public String getTransactionCode() { return transactionCode; }
    public void setTransactionCode(String transactionCode) { this.transactionCode = transactionCode; }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
