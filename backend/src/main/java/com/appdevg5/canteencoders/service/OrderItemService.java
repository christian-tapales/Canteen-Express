package com.appdevg5.canteencoders.service;

import com.appdevg5.canteencoders.entity.OrderItemEntity;
import com.appdevg5.canteencoders.entity.OrderEntity;
import com.appdevg5.canteencoders.repository.OrderItemRepository;
import com.appdevg5.canteencoders.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

/**
 * Service class for OrderItem-related business logic.
 */
@Service
public class OrderItemService {

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private OrderRepository orderRepository;

    /**
     * Retrieves all order items for a specific order.
     */
    public List<OrderItemEntity> getOrderItemsByOrderId(Integer orderId) {
        OrderEntity order = orderRepository.findById(orderId)
            .orElseThrow(() -> new IllegalStateException("Order not found"));
        return orderItemRepository.findByOrder(order);
    }
}
