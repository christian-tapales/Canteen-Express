package com.appdevg5.canteencoders.service;

import com.appdevg5.canteencoders.entity.OrderItemEntity;
import com.appdevg5.canteencoders.entity.OrderEntity;
import com.appdevg5.canteencoders.entity.FoodItemEntity;
import com.appdevg5.canteencoders.repository.OrderItemRepository;
import com.appdevg5.canteencoders.repository.OrderRepository;
import com.appdevg5.canteencoders.repository.FoodItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

/**
 * Service class for OrderItem-related business logic.
 */
@Service
public class OrderItemService {

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private FoodItemRepository foodItemRepository;

    /**
     * Retrieves all order items for a specific order.
     */
    public List<OrderItemEntity> getOrderItemsByOrderId(Integer orderId) {
        OrderEntity order = orderRepository.findById(orderId)
            .orElseThrow(() -> new IllegalStateException("Order not found"));
        return orderItemRepository.findByOrder(order);
    }

    /**
     * Retrieves an order item by ID.
     */
    public Optional<OrderItemEntity> getOrderItemById(Integer orderItemId) {
        return orderItemRepository.findById(orderItemId);
    }

    /**
     * Creates a new order item.
     */
    @Transactional
    public OrderItemEntity createOrderItem(OrderItemEntity orderItem) {
        // Validate order and food item exist
        OrderEntity order = orderRepository.findById(orderItem.getOrder().getOrderId())
            .orElseThrow(() -> new IllegalStateException("Order not found"));
        FoodItemEntity foodItem = foodItemRepository.findById(orderItem.getFoodItem().getFoodItemId())
            .orElseThrow(() -> new IllegalStateException("Food item not found"));
        orderItem.setOrder(order);
        orderItem.setFoodItem(foodItem);
        return orderItemRepository.save(orderItem);
    }

    /**
     * Updates an existing order item.
     */
    @Transactional
    public OrderItemEntity updateOrderItem(Integer orderItemId, OrderItemEntity orderItemDetails) {
        OrderItemEntity orderItem = orderItemRepository.findById(orderItemId)
            .orElseThrow(() -> new IllegalStateException("Order item not found"));
        orderItem.setQuantity(orderItemDetails.getQuantity());
        orderItem.setPriceAtOrder(orderItemDetails.getPriceAtOrder());
        return orderItemRepository.save(orderItem);
    }

    /**
     * Deletes an order item by ID.
     */
    @Transactional
    public void deleteOrderItem(Integer orderItemId) {
        if (!orderItemRepository.existsById(orderItemId)) {
            throw new IllegalStateException("Order item not found");
        }
        orderItemRepository.deleteById(orderItemId);
    }

    /**
     * Retrieves all order items.
     */
    public List<OrderItemEntity> getAllOrderItems() {
        return orderItemRepository.findAll();
    }
}
