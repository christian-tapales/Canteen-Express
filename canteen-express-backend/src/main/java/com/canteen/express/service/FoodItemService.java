package com.canteen.express.service;

import com.canteen.express.entity.FoodItemEntity;
import com.canteen.express.entity.ShopEntity;
import com.canteen.express.repository.FoodItemRepository;
import com.canteen.express.repository.ShopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

/**
 * Service class for FoodItem-related business logic.
 */
@Service
public class FoodItemService {

    @Autowired
    private FoodItemRepository foodItemRepository;

    @Autowired
    private ShopRepository shopRepository;

    /**
     * Retrieves all food items for a specific shop.
     */
    public List<FoodItemEntity> getFoodItemsByShop(Integer shopId) {
        ShopEntity shop = shopRepository.findById(shopId)
            .orElseThrow(() -> new IllegalStateException("Shop not found"));
        return foodItemRepository.findByShop(shop);
    }



    /**
     * Retrieves a food item by ID.
     */
    public Optional<FoodItemEntity> getFoodItemById(Integer foodItemId) {
        return foodItemRepository.findById(foodItemId);
    }

    /**
     * Creates a new food item for a shop.
     */
    @Transactional
    public FoodItemEntity createFoodItem(Integer shopId, FoodItemEntity foodItem) {
        ShopEntity shop = shopRepository.findById(shopId)
            .orElseThrow(() -> new IllegalStateException("Shop not found"));
        foodItem.setShop(shop);
        return foodItemRepository.save(foodItem);
    }

    /**
     * Creates a new food item using Entity.
     */
    @Transactional
    public FoodItemEntity createFoodItem(FoodItemEntity foodItemEntity) {
        // Assume the entity has shop set
        return foodItemRepository.save(foodItemEntity);
    }

    /**
     * Updates an existing food item.
     */
    @Transactional
    public FoodItemEntity updateFoodItem(Integer foodItemId, FoodItemEntity foodItemDetails) {
        FoodItemEntity foodItem = foodItemRepository.findById(foodItemId)
            .orElseThrow(() -> new IllegalStateException("Food item not found"));
        foodItem.setItemName(foodItemDetails.getItemName());
        foodItem.setDescription(foodItemDetails.getDescription());
        foodItem.setPrice(foodItemDetails.getPrice());
        foodItem.setCategory(foodItemDetails.getCategory());
        return foodItemRepository.save(foodItem);
    }

    /**
     * Deletes a food item by ID.
     */
    @Transactional
    public void deleteFoodItem(Integer foodItemId) {
        if (!foodItemRepository.existsById(foodItemId)) {
            throw new IllegalStateException("Food item not found");
        }
        foodItemRepository.deleteById(foodItemId);
    }
}
