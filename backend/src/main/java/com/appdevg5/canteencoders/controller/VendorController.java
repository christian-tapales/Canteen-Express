package com.appdevg5.canteencoders.controller;

import com.appdevg5.canteencoders.entity.FoodItemEntity;
import com.appdevg5.canteencoders.entity.OrderEntity;
import com.appdevg5.canteencoders.service.FoodItemService;
import com.appdevg5.canteencoders.service.InventoryService;
import com.appdevg5.canteencoders.service.OrderService;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

/**
 * REST Controller for Vendor-related endpoints.
 * Handles all vendor actions: managing items, inventory, and viewing orders.
 * Note: Security annotations would be added here to restrict access to VENDOR role.
 */
@RestController
@RequestMapping("/api/vendor")
public class VendorController {

    @Autowired
    private FoodItemService foodItemService;

    @Autowired
    private InventoryService inventoryService;

    @Autowired
    private OrderService orderService;

    /**
     * Get all food items for the vendor's shop.
     * @return List of food items.
     */
    @GetMapping("/items")
    public ResponseEntity<List<FoodItemEntity>> getFoodItems() {
        // This would need to be implemented based on authentication context
        return ResponseEntity.ok(null); // Placeholder
    }

    /**
     * Get a food item by ID.
     * @param id Food item ID.
     * @return Food item.
     */
    @GetMapping("/items/{id}")
    public ResponseEntity<FoodItemEntity> getFoodItemById(@PathVariable Integer id) {
        Optional<FoodItemEntity> item = foodItemService.getFoodItemById(id);
        return item.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    /**
     * Create a new food item for the vendor's shop.
     * @param foodItemDTO DTO containing food item details.
     * @return Created food item.
     */
    @PostMapping("/items")
    public ResponseEntity<FoodItemEntity> createFoodItem(@Valid @RequestBody FoodItemEntity foodItemDTO) {
        FoodItemEntity createdItem = foodItemService.createFoodItem(foodItemDTO);
        return ResponseEntity.ok(createdItem);
    }

    /**
     * Update a food item.
     * @param id Food item ID.
     * @param itemDetails Updated details.
     * @return Updated food item.
     */
    @PutMapping("/items/{id}")
    public ResponseEntity<FoodItemEntity> updateFoodItem(@PathVariable Integer id, @RequestBody FoodItemEntity itemDetails) {
        FoodItemEntity updatedItem = foodItemService.updateFoodItem(id, itemDetails);
        return ResponseEntity.ok(updatedItem);
    }

    /**
     * Delete a food item.
     * @param id Food item ID.
     * @return No content.
     */
    @DeleteMapping("/items/{id}")
    public ResponseEntity<Void> deleteFoodItem(@PathVariable Integer id) {
        foodItemService.deleteFoodItem(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Update inventory for a food item.
     * @param inventoryUpdate DTO containing inventory update details.
     * @return Success message.
     */
    @PutMapping("/inventory")
    public ResponseEntity<String> updateInventory(@Valid @RequestBody FoodItemEntity inventoryUpdate) {
        inventoryService.updateInventory(inventoryUpdate);
        return ResponseEntity.ok("Inventory updated successfully");
    }

    /**
     * Get all orders for the vendor's shop.
     * @return List of orders.
     */
    @GetMapping("/orders")
    public ResponseEntity<?> getVendorOrders() {
        try {
            List<OrderEntity> orders = orderService.getOrdersByVendorShop();
            System.out.println("DEBUG: Found " + orders.size() + " orders for vendor");
            return ResponseEntity.ok(orders);
        } catch (IllegalStateException e) {
            System.err.println("ERROR in getVendorOrders: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        } catch (Exception e) {
            System.err.println("UNEXPECTED ERROR in getVendorOrders: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body("Unexpected error: " + e.getMessage());
        }
    }

    /**
     * Accept a pending order (change status from PENDING to PREPARING).
     * @param orderId Order ID to accept.
     * @return Updated order.
     */
    @PutMapping("/orders/{orderId}/accept")
    public ResponseEntity<OrderEntity> acceptOrder(@PathVariable Integer orderId) {
        try {
            OrderEntity order = orderService.updateOrderStatus(orderId, OrderEntity.OrderStatus.PREPARING);
            return ResponseEntity.ok(order);
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Reject a pending order (change status to REJECTED).
     * @param orderId Order ID to reject.
     * @return Updated order.
     */
    @PutMapping("/orders/{orderId}/reject")
    public ResponseEntity<OrderEntity> rejectOrder(@PathVariable Integer orderId) {
        try {
            OrderEntity order = orderService.updateOrderStatus(orderId, OrderEntity.OrderStatus.REJECTED);
            return ResponseEntity.ok(order);
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Mark an order as ready for pickup (change status to READY).
     * @param orderId Order ID.
     * @return Updated order.
     */
    @PutMapping("/orders/{orderId}/ready")
    public ResponseEntity<OrderEntity> markOrderReady(@PathVariable Integer orderId) {
        try {
            OrderEntity order = orderService.updateOrderStatus(orderId, OrderEntity.OrderStatus.READY);
            return ResponseEntity.ok(order);
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Complete an order (change status to COMPLETED).
     * @param orderId Order ID.
     * @return Updated order.
     */
    @PutMapping("/orders/{orderId}/complete")
    public ResponseEntity<OrderEntity> completeOrder(@PathVariable Integer orderId) {
        try {
            OrderEntity order = orderService.updateOrderStatus(orderId, OrderEntity.OrderStatus.COMPLETED);
            return ResponseEntity.ok(order);
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
