package com.canteen.express.repository;

import com.canteen.express.entity.FoodItemEntity;
import com.canteen.express.entity.ShopEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * Repository interface for FoodItem entity.
 * Handles all database operations related to the FoodItem.
 */
@Repository
public interface FoodItemRepository extends JpaRepository<FoodItemEntity, Integer> {

    /**
     * Finds all food items for a specific shop.
     * Used to get the menu for a shop.
     *
     * @param shop The shop entity.
     * @return A list of food items for the shop.
     */
    List<FoodItemEntity> findByShop(ShopEntity shop);

    /**
     * Finds food items by shop and category.
     *
     * @param shop The shop entity.
     * @param category The category of the food item.
     * @return A list of food items matching the criteria.
     */
    List<FoodItemEntity> findByShopAndCategory(ShopEntity shop, String category);
}
