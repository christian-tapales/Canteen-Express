package com.appdevg5.canteencoders.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

/**
 * DTO representing a single item in an order payload from the client.
 */
public class OrderItemDTO {

    @NotNull
    private Integer foodItemId;

    @NotNull
    @Min(1)
    private Integer quantity;

    public OrderItemDTO() {}

    public OrderItemDTO(Integer foodItemId, Integer quantity) {
        this.foodItemId = foodItemId;
        this.quantity = quantity;
    }

    public Integer getFoodItemId() {
        return foodItemId;
    }

    public void setFoodItemId(Integer foodItemId) {
        this.foodItemId = foodItemId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
