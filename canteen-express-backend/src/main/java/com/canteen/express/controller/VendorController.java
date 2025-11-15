package com.canteen.express.controller;

import com.canteen.express.entity.FoodItemEntity;
import com.canteen.express.entity.OrderEntity;
import com.canteen.express.service.FoodItemService;
import com.canteen.express.service.InventoryService;
import com.canteen.express.service.OrderService;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
    public ResponseEntity<List<OrderEntity>> getVendorOrders() {
        List<OrderEntity> orders = orderService.getOrdersByVendorShop();
        return ResponseEntity.ok(orders);
    }
}
