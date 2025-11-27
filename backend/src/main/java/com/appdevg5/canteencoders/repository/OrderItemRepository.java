package com.appdevg5.canteencoders.repository;

import com.appdevg5.canteencoders.entity.OrderItemEntity;
import com.appdevg5.canteencoders.entity.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * Repository interface for OrderItem entity.
 * Handles all database operations related to the OrderItem.
 */
@Repository
public interface OrderItemRepository extends JpaRepository<OrderItemEntity, Integer> {

    /**
     * Finds all order items for a specific order.
     *
     * @param order The order entity.
     * @return A list of order items for the order.
     */
    List<OrderItemEntity> findByOrder(OrderEntity order);
}
