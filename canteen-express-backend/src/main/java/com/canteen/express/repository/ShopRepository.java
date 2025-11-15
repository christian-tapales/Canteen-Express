package com.canteen.express.repository;

import com.canteen.express.entity.ShopEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

/**
 * Repository interface for Shop entity.
 * Handles all database operations related to the Shop.
 */
@Repository
public interface ShopRepository extends JpaRepository<ShopEntity, Integer> {

    /**
     * Finds a shop by its name.
     * Used for checking if a shop name is already taken.
     *
     * @param shopName The name of the shop.
     * @return An Optional containing the Shop if found, or empty if not.
     */
    Optional<ShopEntity> findByShopName(String shopName);
}
