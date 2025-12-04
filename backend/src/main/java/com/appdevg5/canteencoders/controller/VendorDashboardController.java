package com.appdevg5.canteencoders.controller;

import com.appdevg5.canteencoders.entity.OrderEntity;
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
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors; // <--- Missing this likely
import java.util.ArrayList;         // Good to have just in case

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
}