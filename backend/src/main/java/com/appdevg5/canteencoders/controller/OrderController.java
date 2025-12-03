package com.appdevg5.canteencoders.controller;

import com.appdevg5.canteencoders.dto.OrderDTO;
import com.appdevg5.canteencoders.dto.OrderItemDTO;
import com.appdevg5.canteencoders.entity.FoodItemEntity;
import com.appdevg5.canteencoders.entity.OrderEntity;
import com.appdevg5.canteencoders.entity.OrderItemEntity;
import com.appdevg5.canteencoders.service.FoodItemService;
import com.appdevg5.canteencoders.service.OrderService;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

/**
 * REST Controller for Order-related endpoints.
 * Handles customer order creation.
 */
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private FoodItemService foodItemService;

    /**
     * Create a new order from DTO (single atomic order with items).
     */
    @PostMapping
    public ResponseEntity<OrderEntity> createOrder(@Valid @RequestBody OrderDTO dto) {
        try {
            // Map DTO order items to entities with just foodItem id and quantity
            List<OrderItemEntity> items = new ArrayList<>();
            for (OrderItemDTO oi : dto.getOrderItems()) {
                FoodItemEntity fi = new FoodItemEntity();
                fi.setFoodItemId(oi.getFoodItemId());
                OrderItemEntity entity = new OrderItemEntity();
                entity.setFoodItem(fi);
                entity.setQuantity(oi.getQuantity());
                items.add(entity);
            }

            OrderEntity created = orderService.createOrder(dto.getUserId(), dto.getShopId(), items);
            // Optionally set pickup time, instructions, payment on created order if you store them
            if (dto.getPickupTime() != null) created.setPickupTime(dto.getPickupTime());
            if (dto.getSpecialInstructions() != null) created.setSpecialInstructions(dto.getSpecialInstructions());
            // Status/payment can be updated elsewhere in flow

            return ResponseEntity.ok(created);
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}
