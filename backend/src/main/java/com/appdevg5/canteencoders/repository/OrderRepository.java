package com.appdevg5.canteencoders.repository;

import com.appdevg5.canteencoders.entity.OrderEntity;
import com.appdevg5.canteencoders.entity.UserEntity;
import com.appdevg5.canteencoders.entity.ShopEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * Repository interface for Order entity.
 * Handles all database operations related to the Order.
 */
@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, Integer> {

    /**
     * Finds all orders for a specific user.
     *
     * @param user The user entity.
     * @return A list of orders for the user.
     */
    List<OrderEntity> findByUser(UserEntity user);

    /**
     * Finds all orders for a specific shop.
     * Used by vendors to see orders for their shop.
     *
     * @param shop The shop entity.
     * @return A list of orders for the shop.
     */
    List<OrderEntity> findByShop(ShopEntity shop);

    /**
     * Finds orders by user and shop.
     *
     * @param user The user entity.
     * @param shop The shop entity.
     * @return A list of orders matching the criteria.
     */
    List<OrderEntity> findByUserAndShop(UserEntity user, ShopEntity shop);
}
