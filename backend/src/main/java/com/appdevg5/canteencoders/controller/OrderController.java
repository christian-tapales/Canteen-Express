package com.appdevg5.canteencoders.controller;

import com.appdevg5.canteencoders.dto.OrderDTO;
import com.appdevg5.canteencoders.dto.OrderItemDTO;
import com.appdevg5.canteencoders.entity.FoodItemEntity;
import com.appdevg5.canteencoders.entity.OrderEntity;
import com.appdevg5.canteencoders.entity.OrderItemEntity;
import com.appdevg5.canteencoders.entity.UserEntity;
import com.appdevg5.canteencoders.service.OrderService;
import com.appdevg5.canteencoders.service.UserService;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
    private UserService userService;

    /**
     * Create a new order from DTO (single atomic order with items).
     */
    @PostMapping
    public ResponseEntity<OrderEntity> createOrder(@Valid @RequestBody OrderDTO dto) {
        try {
            // Map DTO order items to entities
            List<OrderItemEntity> items = new ArrayList<>();
            for (OrderItemDTO oi : dto.getOrderItems()) {
                FoodItemEntity fi = new FoodItemEntity();
                fi.setFoodItemId(oi.getFoodItemId());
                OrderItemEntity entity = new OrderItemEntity();
                entity.setFoodItem(fi);
                entity.setQuantity(oi.getQuantity());
                items.add(entity);
            }

            // ✅ PASS 'dto' TO THE SERVICE
            OrderEntity created = orderService.createOrder(dto.getUserId(), dto.getShopId(), items, dto);

            return ResponseEntity.ok(created);
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    /**
     * Get all orders for the authenticated user.
     */
    @GetMapping("/user")
    public ResponseEntity<List<OrderEntity>> getUserOrders() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String email = authentication.getName();
            UserEntity user = userService.findByEmail(email);
            List<OrderEntity> orders = orderService.getOrdersByUser(user.getUserId());
            return ResponseEntity.ok(orders);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

// 1. UPDATE ORDER
@PutMapping("/{orderId}")
    public ResponseEntity<?> updateOrder(@PathVariable Integer orderId, @RequestBody java.util.Map<String, String> updates) {
        try {
            // Get the note from the request map
            String newInstructions = updates.get("specialInstructions");

            // Call the new service method
            OrderDTO updatedOrder = orderService.updateSpecialInstructions(orderId, newInstructions);
            
            return ResponseEntity.ok(updatedOrder);

        } catch (IllegalStateException e) {
            // Handles the "Not PENDING" error
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (RuntimeException e) {
            // Handles "Order not found" or other errors
            return ResponseEntity.badRequest().body("Error updating order");
        }
    }
    // 2. DELETE ORDER
    // 2. CANCEL ORDER (Updated)
    // We keep @DeleteMapping so you don't have to change your Frontend code
    @DeleteMapping("/{orderId}")
    public ResponseEntity<Void> cancelOrder(@PathVariable Integer orderId) {
        OrderEntity order = orderService.getOrderById(orderId)
            .orElseThrow(() -> new RuntimeException("Order not found"));

        // Only allow cancelling if PENDING
        if (order.getStatus() != OrderEntity.OrderStatus.PENDING) {
             return ResponseEntity.badRequest().build(); 
        }

        // ✅ CALL THE NEW METHOD (Updates status instead of deleting row)
        orderService.cancelOrder(orderId);
        
        return ResponseEntity.noContent().build();
    }
}