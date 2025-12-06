package com.appdevg5.canteencoders.controller;

import com.appdevg5.canteencoders.entity.*;
import com.appdevg5.canteencoders.service.*;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * REST Controller for Admin-related endpoints.
 * Provides full CRUD operations on all entities for administrative purposes.
 * Note: Security annotations would be added here to restrict access to ADMIN role.
 */
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private ShopService shopService;

    @Autowired
    private FoodItemService foodItemService;

    @Autowired
    private InventoryService inventoryService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderItemService orderItemService;

    @Autowired
    private PaymentService paymentService;

    // --- User CRUD ---

    @GetMapping("/users")
    public ResponseEntity<List<UserEntity>> getAllUsers() {
        List<UserEntity> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<UserEntity> getUserById(@PathVariable Integer id) {
        Optional<UserEntity> user = userService.findById(id);
        return user.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<UserEntity> updateUser(@PathVariable Integer id, @RequestBody UserEntity userDetails) {
        UserEntity updatedUser = userService.updateUser(id, userDetails);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Integer id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    // --- Shop CRUD ---

    @GetMapping("/shops")
    public ResponseEntity<List<ShopEntity>> getAllShops() {
        List<ShopEntity> shops = shopService.getAllShops();
        return ResponseEntity.ok(shops);
    }

    @GetMapping("/shops/{id}")
    public ResponseEntity<ShopEntity> getShopById(@PathVariable Integer id) {
        Optional<ShopEntity> shop = shopService.getShopById(id);
        return shop.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/shops")
    public ResponseEntity<ShopEntity> createShop(@Valid @RequestBody ShopEntity shop) {
        ShopEntity createdShop = shopService.createShop(shop);
        return ResponseEntity.ok(createdShop);
    }

    @PutMapping("/shops/{id}")
    public ResponseEntity<ShopEntity> updateShop(@PathVariable Integer id, @RequestBody ShopEntity shopDetails) {
        ShopEntity updatedShop = shopService.updateShop(id, shopDetails);
        return ResponseEntity.ok(updatedShop);
    }

    @DeleteMapping("/shops/{id}")
    public ResponseEntity<Void> deleteShop(@PathVariable Integer id) {
        shopService.deleteShop(id);
        return ResponseEntity.noContent().build();
    }

    // --- FoodItem CRUD ---

    @GetMapping("/items")
    public ResponseEntity<List<FoodItemEntity>> getAllFoodItems() {
        List<FoodItemEntity> items = foodItemService.getAllFoodItems();
        return ResponseEntity.ok(items);
    }

    @GetMapping("/items/{id}")
    public ResponseEntity<FoodItemEntity> getFoodItemById(@PathVariable Integer id) {
        Optional<FoodItemEntity> item = foodItemService.getFoodItemById(id);
        return item.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/items")
    public ResponseEntity<FoodItemEntity> createFoodItem(@Valid @RequestBody FoodItemEntity item) {
        FoodItemEntity createdItem = foodItemService.createFoodItem(item);
        return ResponseEntity.ok(createdItem);
    }

    @PutMapping("/items/{id}")
    public ResponseEntity<FoodItemEntity> updateFoodItem(@PathVariable Integer id, @RequestBody FoodItemEntity itemDetails) {
        FoodItemEntity updatedItem = foodItemService.updateFoodItem(id, itemDetails);
        return ResponseEntity.ok(updatedItem);
    }

    @DeleteMapping("/items/{id}")
    public ResponseEntity<Void> deleteFoodItem(@PathVariable Integer id) {
        foodItemService.deleteFoodItem(id);
        return ResponseEntity.noContent().build();
    }

    // --- Inventory CRUD ---

    @GetMapping("/inventory")
    public ResponseEntity<List<InventoryEntity>> getAllInventory() {
        List<InventoryEntity> inventory = inventoryService.getAllInventory();
        return ResponseEntity.ok(inventory);
    }

    @GetMapping("/inventory/{id}")
    public ResponseEntity<InventoryEntity> getInventoryById(@PathVariable Integer id) {
        Optional<InventoryEntity> inventory = inventoryService.getInventoryById(id);
        return inventory.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/inventory")
    public ResponseEntity<InventoryEntity> createInventory(@Valid @RequestBody InventoryEntity inventory) {
        InventoryEntity createdInventory = inventoryService.createInventory(inventory);
        return ResponseEntity.ok(createdInventory);
    }

    @PutMapping("/inventory/{id}")
    public ResponseEntity<InventoryEntity> updateInventory(@PathVariable Integer id, @RequestBody InventoryEntity inventoryDetails) {
        InventoryEntity updatedInventory = inventoryService.updateInventory(id, inventoryDetails);
        return ResponseEntity.ok(updatedInventory);
    }

    @DeleteMapping("/inventory/{id}")
    public ResponseEntity<Void> deleteInventory(@PathVariable Integer id) {
        inventoryService.deleteInventory(id);
        return ResponseEntity.noContent().build();
    }

    // --- Order CRUD ---

    @GetMapping("/orders")
    public ResponseEntity<List<OrderEntity>> getAllOrders() {
        List<OrderEntity> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/orders/{id}")
    public ResponseEntity<OrderEntity> getOrderById(@PathVariable Integer id) {
        Optional<OrderEntity> order = orderService.getOrderById(id);
        return order.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/orders")
    public ResponseEntity<OrderEntity> createOrder(@Valid @RequestBody OrderEntity order) {
        OrderEntity createdOrder = orderService.createOrder(order);
        return ResponseEntity.ok(createdOrder);
    }

    @PutMapping("/orders/{id}")
    public ResponseEntity<OrderEntity> updateOrder(@PathVariable Integer id, @RequestBody OrderEntity orderDetails) {
        OrderEntity updatedOrder = orderService.updateOrder(id, orderDetails);
        return ResponseEntity.ok(updatedOrder);
    }

    @DeleteMapping("/orders/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Integer id) {
        orderService.cancelOrder(id);
        return ResponseEntity.noContent().build();
    }

    // --- OrderItem CRUD ---

    @GetMapping("/order-items")
    public ResponseEntity<List<OrderItemEntity>> getAllOrderItems() {
        List<OrderItemEntity> orderItems = orderItemService.getAllOrderItems();
        return ResponseEntity.ok(orderItems);
    }

    @GetMapping("/order-items/{id}")
    public ResponseEntity<OrderItemEntity> getOrderItemById(@PathVariable Integer id) {
        Optional<OrderItemEntity> orderItem = orderItemService.getOrderItemById(id);
        return orderItem.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/order-items")
    public ResponseEntity<OrderItemEntity> createOrderItem(@Valid @RequestBody OrderItemEntity orderItem) {
        OrderItemEntity createdOrderItem = orderItemService.createOrderItem(orderItem);
        return ResponseEntity.ok(createdOrderItem);
    }

    @PutMapping("/order-items/{id}")
    public ResponseEntity<OrderItemEntity> updateOrderItem(@PathVariable Integer id, @RequestBody OrderItemEntity orderItemDetails) {
        OrderItemEntity updatedOrderItem = orderItemService.updateOrderItem(id, orderItemDetails);
        return ResponseEntity.ok(updatedOrderItem);
    }

    @DeleteMapping("/order-items/{id}")
    public ResponseEntity<Void> deleteOrderItem(@PathVariable Integer id) {
        orderItemService.deleteOrderItem(id);
        return ResponseEntity.noContent().build();
    }

    // --- Payment CRUD ---

    @GetMapping("/payments")
    public ResponseEntity<List<PaymentEntity>> getAllPayments() {
        List<PaymentEntity> payments = paymentService.getAllPayments();
        return ResponseEntity.ok(payments);
    }

    @GetMapping("/payments/{id}")
    public ResponseEntity<PaymentEntity> getPaymentById(@PathVariable Integer id) {
        Optional<PaymentEntity> payment = paymentService.getPaymentById(id);
        return payment.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/payments")
    public ResponseEntity<PaymentEntity> createPayment(@Valid @RequestBody PaymentEntity payment) {
        PaymentEntity createdPayment = paymentService.createPayment(payment);
        return ResponseEntity.ok(createdPayment);
    }

    @PutMapping("/payments/{id}")
    public ResponseEntity<PaymentEntity> updatePayment(@PathVariable Integer id, @RequestBody PaymentEntity paymentDetails) {
        PaymentEntity updatedPayment = paymentService.updatePayment(id, paymentDetails);
        return ResponseEntity.ok(updatedPayment);
    }

    @DeleteMapping("/payments/{id}")
    public ResponseEntity<Void> deletePayment(@PathVariable Integer id) {
        paymentService.deletePayment(id);
        return ResponseEntity.noContent().build();
    }

    // --- Dashboard Statistics ---

    /**
     * Get dashboard statistics for admin panel.
     * @return Statistics DTO with aggregated data.
     */
    @GetMapping("/statistics")
    public ResponseEntity<com.appdevg5.canteencoders.dto.AdminStatisticsDTO> getStatistics() {
        com.appdevg5.canteencoders.dto.AdminStatisticsDTO stats = new com.appdevg5.canteencoders.dto.AdminStatisticsDTO();
        
        // Get total counts
        List<OrderEntity> allOrders = orderService.getAllOrders();
        stats.setTotalOrders((long) allOrders.size());
        stats.setTotalUsers((long) userService.getAllUsers().size());
        stats.setTotalShops((long) shopService.getAllShops().size());
        stats.setTotalFoodItems((long) foodItemService.getAllFoodItems().size());
        
        // Calculate revenue and order counts by status
        java.math.BigDecimal totalRevenue = java.math.BigDecimal.ZERO;
        java.math.BigDecimal completedRevenue = java.math.BigDecimal.ZERO;
        java.math.BigDecimal pendingRevenue = java.math.BigDecimal.ZERO;
        
        long pending = 0, preparing = 0, ready = 0, completed = 0, cancelled = 0, rejected = 0;
        
        for (OrderEntity order : allOrders) {
            totalRevenue = totalRevenue.add(order.getTotalAmount());
            
            switch (order.getStatus()) {
                case PENDING:
                    pending++;
                    pendingRevenue = pendingRevenue.add(order.getTotalAmount());
                    break;
                case PREPARING:
                    preparing++;
                    break;
                case READY:
                    ready++;
                    break;
                case COMPLETED:
                    completed++;
                    completedRevenue = completedRevenue.add(order.getTotalAmount());
                    break;
                case CANCELLED:
                    cancelled++;
                    break;
                case REJECTED:
                    rejected++;
                    break;
            }
        }
        
        stats.setTotalRevenue(totalRevenue);
        stats.setCompletedRevenue(completedRevenue);
        stats.setPendingRevenue(pendingRevenue);
        stats.setPendingOrders(pending);
        stats.setPreparingOrders(preparing);
        stats.setReadyOrders(ready);
        stats.setCompletedOrders(completed);
        stats.setCancelledOrders(cancelled);
        stats.setRejectedOrders(rejected);
        
        return ResponseEntity.ok(stats);
    }
}
