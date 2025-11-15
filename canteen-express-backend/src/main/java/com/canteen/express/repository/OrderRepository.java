package com.canteen.express.repository;

import com.canteen.express.entity.OrderEntity;
import com.canteen.express.entity.UserEntity;
import com.canteen.express.entity.ShopEntity;
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
