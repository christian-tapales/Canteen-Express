package com.canteen.express.service;

import com.canteen.express.entity.OrderItemEntity;
import com.canteen.express.entity.OrderEntity;
import com.canteen.express.repository.OrderItemRepository;
import com.canteen.express.repository.OrderRepository;
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
