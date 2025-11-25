package com.appdevg5.canteencoders.controller;

import com.appdevg5.canteencoders.entity.OrderEntity;
import com.appdevg5.canteencoders.service.OrderService;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * REST Controller for Order-related endpoints.
 * Handles customer order creation.
 */
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    /**
     * Create a new order.
     * @param orderRequest DTO containing order details.
     * @return Order response with order ID and status.
     */
    @PostMapping
    public ResponseEntity<OrderEntity> createOrder(@Valid @RequestBody OrderEntity orderRequest) {
        try {
            OrderEntity orderResponse = orderService.createOrder(orderRequest);
            return ResponseEntity.ok(orderResponse);
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}
