package com.appdevg5.canteencoders.repository;

import com.appdevg5.canteencoders.entity.InventoryEntity;
import com.appdevg5.canteencoders.entity.ShopEntity;
import com.appdevg5.canteencoders.entity.FoodItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;


/**
 * Repository interface for Inventory entity.
 * Handles all database operations related to the Inventory.
 */
@Repository
public interface InventoryRepository extends JpaRepository<InventoryEntity, Integer> {

    /**
     * Finds inventory by food item.
     * Used to get stock for a specific food item.
     *
     * @param foodItem The food item entity.
     * @return An Optional containing the Inventory if found, or empty if not.
     */
    Optional<InventoryEntity> findByFoodItem(FoodItemEntity foodItem);
    List<InventoryEntity> findByShop(ShopEntity shop);
}
