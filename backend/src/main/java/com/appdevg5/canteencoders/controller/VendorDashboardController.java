package com.appdevg5.canteencoders.controller;

import com.appdevg5.canteencoders.entity.OrderEntity;
import com.appdevg5.canteencoders.entity.OrderItemEntity;
import com.appdevg5.canteencoders.entity.UserEntity;
import com.appdevg5.canteencoders.service.OrderService;
import com.appdevg5.canteencoders.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/vendor/dashboard")
public class VendorDashboardController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    /**
     * Get summary statistics for the logged-in vendor's shop.
     */
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getDashboardStats() {
        // 1. Identify the Vendor
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserEntity vendor = userService.findByEmail(auth.getName());

        if (vendor.getShop() == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "No shop assigned to this vendor."));
        }

        Integer shopId = vendor.getShop().getShopId();

        // 2. Fetch ALL orders for this specific shop
        // (You might need to add a getOrdersByShopId method to OrderService if it doesn't exist)
        List<OrderEntity> shopOrders = orderService.getOrdersByShop(shopId); 

        // 3. Calculate Stats

        // A. Total Orders (Maybe you want to count all attempts, or just valid ones? Let's keep all for now)
        int totalOrders = shopOrders.size();
        
        // B. Revenue (ONLY count money from Valid Orders)
        BigDecimal totalRevenue = shopOrders.stream()
                .filter(o -> o.getStatus() == OrderEntity.OrderStatus.COMPLETED 
                          || o.getStatus() == OrderEntity.OrderStatus.READY
                          || o.getStatus() == OrderEntity.OrderStatus.PREPARING) // Include active orders
                .map(OrderEntity::getTotalAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // C. Items Sold (ONLY count items from Valid Orders)
        int itemsSold = shopOrders.stream()
                .filter(o -> o.getStatus() == OrderEntity.OrderStatus.COMPLETED 
                          || o.getStatus() == OrderEntity.OrderStatus.READY
                          || o.getStatus() == OrderEntity.OrderStatus.PREPARING)
                .flatMap(o -> o.getOrderItems().stream())
                .mapToInt(item -> item.getQuantity())
                .sum();
        
        // 4. Prepare Response
        Map<String, Object> stats = new HashMap<>();
        stats.put("shopName", vendor.getShop().getShopName());
        stats.put("totalOrders", totalOrders);
        stats.put("revenue", totalRevenue);
        stats.put("itemsSold", itemsSold);

        return ResponseEntity.ok(stats);
    }

    /**
     * Get top-selling items for the vendor's shop.
     */
    @GetMapping("/top-sellers")
    public ResponseEntity<List<Map<String, Object>>> getTopSellers() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserEntity vendor = userService.findByEmail(auth.getName());

        if (vendor.getShop() == null) {
            return ResponseEntity.badRequest().build();
        }

        Integer shopId = vendor.getShop().getShopId();
        List<OrderEntity> shopOrders = orderService.getOrdersByShop(shopId);

        // Map to store item name -> [total quantity sold, total revenue]
        Map<String, int[]> itemStats = new HashMap<>();
        Map<String, BigDecimal> itemRevenue = new HashMap<>();

        shopOrders.stream()
                .filter(o -> o.getStatus() == OrderEntity.OrderStatus.COMPLETED 
                          || o.getStatus() == OrderEntity.OrderStatus.READY
                          || o.getStatus() == OrderEntity.OrderStatus.PREPARING)
                .flatMap(o -> o.getOrderItems().stream())
                .forEach(item -> {
                    String itemName = item.getFoodItem().getItemName();
                    itemStats.merge(itemName, new int[]{item.getQuantity()}, (old, val) -> {
                        old[0] += val[0];
                        return old;
                    });
                    itemRevenue.merge(itemName, item.getPriceAtOrder().multiply(new BigDecimal(item.getQuantity())), BigDecimal::add);
                });

        // Convert to list and sort by quantity sold
        List<Map<String, Object>> topSellers = itemStats.entrySet().stream()
                .map(entry -> {
                    Map<String, Object> item = new HashMap<>();
                    item.put("name", entry.getKey());
                    item.put("sold", entry.getValue()[0]);
                    item.put("revenue", itemRevenue.get(entry.getKey()));
                    return item;
                })
                .sorted((a, b) -> Integer.compare((Integer) b.get("sold"), (Integer) a.get("sold")))
                .limit(5)
                .collect(Collectors.toList());

        return ResponseEntity.ok(topSellers);
    }

    /**
     * Get recent transactions for the vendor's shop.
     */
    @GetMapping("/recent-transactions")
    public ResponseEntity<List<Map<String, Object>>> getRecentTransactions() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserEntity vendor = userService.findByEmail(auth.getName());

        if (vendor.getShop() == null) {
            return ResponseEntity.badRequest().build();
        }

        Integer shopId = vendor.getShop().getShopId();
        List<OrderEntity> shopOrders = orderService.getOrdersByShop(shopId);

        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("MMM dd, yyyy");
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("hh:mm a");

        List<Map<String, Object>> transactions = shopOrders.stream()
                .sorted((a, b) -> b.getOrderDate().compareTo(a.getOrderDate())) // Most recent first
                .limit(10)
                .map(order -> {
                    Map<String, Object> transaction = new HashMap<>();
                    transaction.put("id", "#" + String.format("%03d", order.getOrderId()));
                    transaction.put("date", order.getOrderDate().format(dateFormatter));
                    transaction.put("time", order.getOrderDate().format(timeFormatter));
                    transaction.put("total", order.getTotalAmount());
                    transaction.put("payment", order.getPayment() != null ? order.getPayment().getPaymentMethod() : "N/A");
                    transaction.put("status", order.getStatus().toString());
                    return transaction;
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(transactions);
    }

    /**
     * Get peak order times for the vendor's shop.
     */
    @GetMapping("/peak-times")
    public ResponseEntity<List<Map<String, Object>>> getPeakOrderTimes() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserEntity vendor = userService.findByEmail(auth.getName());

        if (vendor.getShop() == null) {
            return ResponseEntity.badRequest().build();
        }

        Integer shopId = vendor.getShop().getShopId();
        List<OrderEntity> shopOrders = orderService.getOrdersByShop(shopId);

        // Group orders by hour
        Map<Integer, Long> ordersByHour = shopOrders.stream()
                .filter(o -> o.getStatus() == OrderEntity.OrderStatus.COMPLETED 
                          || o.getStatus() == OrderEntity.OrderStatus.READY
                          || o.getStatus() == OrderEntity.OrderStatus.PREPARING)
                .collect(Collectors.groupingBy(
                    o -> o.getOrderDate().getHour(),
                    Collectors.counting()
                ));

        // Convert to list format with formatted time
        List<Map<String, Object>> peakTimes = ordersByHour.entrySet().stream()
                .sorted((a, b) -> Long.compare(b.getValue(), a.getValue())) // Highest first
                .limit(5)
                .map(entry -> {
                    Map<String, Object> timeSlot = new HashMap<>();
                    int hour = entry.getKey();
                    String period = hour >= 12 ? "PM" : "AM";
                    int displayHour = hour > 12 ? hour - 12 : (hour == 0 ? 12 : hour);
                    timeSlot.put("time", String.format("%d:00 %s", displayHour, period));
                    timeSlot.put("orders", entry.getValue());
                    return timeSlot;
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(peakTimes);
    }
}