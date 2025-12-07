package com.appdevg5.canteencoders.service;

import com.appdevg5.canteencoders.dto.FoodItemDTO;
import com.appdevg5.canteencoders.entity.FoodItemEntity;
import com.appdevg5.canteencoders.entity.ShopEntity;
import com.appdevg5.canteencoders.entity.UserEntity;
import com.appdevg5.canteencoders.repository.FoodItemRepository;
import com.appdevg5.canteencoders.repository.ShopRepository;
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

    @Autowired
    private com.appdevg5.canteencoders.repository.UserRepository userRepository;

    @Autowired
    private com.appdevg5.canteencoders.repository.InventoryRepository inventoryRepository;

    /**
     * Retrieves all food items for a specific shop as DTOs.
     */
    public List<com.appdevg5.canteencoders.dto.FoodItemDTO> getFoodItemsByShop(Integer shopId) {
        ShopEntity shop = shopRepository.findById(shopId)
            .orElseThrow(() -> new IllegalStateException("Shop not found"));
            
        // ✅ CHANGED: Use the new method to filter out archived items
        return foodItemRepository.findByShopAndIsDeletedFalse(shop).stream()
                .map(this::convertToFoodItemDTO) // Assumes convertToDTO method exists
                .collect(java.util.stream.Collectors.toList());
    }

    /**
     * Converts FoodItemEntity to FoodItemDTO.
     */
    private FoodItemDTO convertToFoodItemDTO(FoodItemEntity item) {
        FoodItemDTO dto = new FoodItemDTO();
        dto.setId(item.getFoodItemId());
        dto.setName(item.getItemName());
        dto.setDescription(item.getDescription());
        dto.setPrice(item.getPrice());
        dto.setCategory(item.getCategory());
        dto.setImageUrl(item.getImageUrl());
        return dto;
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
    public FoodItemEntity createFoodItem(FoodItemEntity foodItem) {
        // 1. Get the logged-in vendor
        org.springframework.security.core.Authentication auth = 
            org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        
        UserEntity vendor = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Vendor not found"));
            
        // 2. Get the vendor's shop
        ShopEntity shop = vendor.getShop();
        if (shop == null) {
            throw new RuntimeException("No shop assigned to this vendor");
        }

        // 3. Link the item to the shop
        foodItem.setShop(shop);
        
        // 4. Set defaults if missing
        if (foodItem.getIsAvailable() == null) foodItem.setIsAvailable(true);

        // 1. Save the Food Item first
        FoodItemEntity savedItem = foodItemRepository.save(foodItem);

        // 2. ✅ AUTOMATICALLY CREATE INVENTORY
        com.appdevg5.canteencoders.entity.InventoryEntity inventory = new com.appdevg5.canteencoders.entity.InventoryEntity();
        inventory.setFoodItem(savedItem);
        inventory.setQuantityAvailable(50); // Default stock (e.g., 50)
        
        inventory.setShop(shop);
        inventoryRepository.save(inventory);

        return savedItem;
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
        foodItem.setImageUrl(foodItemDetails.getImageUrl());
        
        return foodItemRepository.save(foodItem);
    }

    /**
     * Deletes a food item by ID.
     */
    @Transactional
    public void deleteFoodItem(Integer foodItemId) {
        FoodItemEntity item = foodItemRepository.findById(foodItemId)
            .orElseThrow(() -> new IllegalStateException("Food item not found"));
            
        // ✅ SOFT DELETE: Set the flag to TRUE
        item.setIsDeleted(true); 
        
        // Also mark it as unavailable so no one orders it while the database updates
        item.setIsAvailable(false); 
        
        foodItemRepository.save(item);
    }

    /**
     * Retrieves all food items.
     */
    public List<FoodItemEntity> getAllFoodItems() {
        return foodItemRepository.findAll();
    }
}
