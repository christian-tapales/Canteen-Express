package com.appdevg5.canteencoders.service;

import com.appdevg5.canteencoders.entity.InventoryEntity;
import com.appdevg5.canteencoders.entity.FoodItemEntity;
import com.appdevg5.canteencoders.repository.InventoryRepository;
import com.appdevg5.canteencoders.repository.FoodItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Optional;

/**
 * Service class for Inventory-related business logic.
 */
@Service
public class InventoryService {

    @Autowired
    private InventoryRepository inventoryRepository;

    @Autowired
    private FoodItemRepository foodItemRepository;

    /**
     * Retrieves inventory for a specific food item.
     */
    public Optional<InventoryEntity> getInventoryByFoodItemId(Integer foodItemId) {
        FoodItemEntity foodItem = foodItemRepository.findById(foodItemId)
            .orElseThrow(() -> new IllegalStateException("Food item not found"));
        return inventoryRepository.findByFoodItem(foodItem);
    }

    /**
     * Updates the quantity available for a food item.
     */
    @Transactional
    public InventoryEntity updateInventory(Integer foodItemId, Integer newQuantity) {
        FoodItemEntity foodItem = foodItemRepository.findById(foodItemId)
            .orElseThrow(() -> new IllegalStateException("Food item not found"));
        InventoryEntity inventory = inventoryRepository.findByFoodItem(foodItem)
            .orElse(new InventoryEntity(foodItem, 0));
        inventory.setQuantityAvailable(newQuantity);
        return inventoryRepository.save(inventory);
    }

    /**
     * Updates inventory using Entity.
     */
    @Transactional
    public InventoryEntity updateInventory(FoodItemEntity foodItemEntity) {
        // Assume the entity has foodItem and quantity set
        InventoryEntity inventory = inventoryRepository.findByFoodItem(foodItemEntity)
            .orElse(new InventoryEntity(foodItemEntity, 0));
        // For simplicity, assume quantity is set in the entity, but since FoodItemEntity doesn't have quantity, this is a placeholder
        // In a real implementation, InventoryUpdateDTO or similar would be used
        return inventoryRepository.save(inventory);
    }

    /**
     * Creates initial inventory for a new food item.
     */
    @Transactional
    public InventoryEntity createInventory(FoodItemEntity foodItem, Integer quantity) {
        InventoryEntity inventory = new InventoryEntity(foodItem, quantity);
        return inventoryRepository.save(inventory);
    }
}
