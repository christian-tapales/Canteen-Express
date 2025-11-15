package com.canteen.express.service;

import com.canteen.express.dto.ShopDTO;
import com.canteen.express.dto.FoodItemDTO;
import com.canteen.express.entity.ShopEntity;
import com.canteen.express.entity.FoodItemEntity;
import com.canteen.express.repository.ShopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service class for Shop-related business logic.
 */
@Service
public class ShopService {

    @Autowired
    private ShopRepository shopRepository;

    /**
     * Retrieves all shops as DTOs.
     */
    public List<ShopDTO> getAllShops() {
        return shopRepository.findAll().stream()
                .map(this::convertToShopDTO)
                .collect(Collectors.toList());
    }

    /**
     * Converts ShopEntity to ShopDTO.
     */
    public ShopDTO convertToShopDTO(ShopEntity shop) {
        ShopDTO dto = new ShopDTO();
        dto.setId(shop.getShopId());
        dto.setName(shop.getShopName());
        dto.setDescription(shop.getDescription());
        return dto;
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
        return dto;
    }



    /**
     * Retrieves a shop by ID.
     */
    public Optional<ShopEntity> getShopById(Integer shopId) {
        return shopRepository.findById(shopId);
    }

    /**
     * Creates a new shop.
     */
    @Transactional
    public ShopEntity createShop(ShopEntity shop) {
        if (shopRepository.findByShopName(shop.getShopName()).isPresent()) {
            throw new IllegalStateException("Shop name already exists");
        }
        return shopRepository.save(shop);
    }

    /**
     * Updates an existing shop.
     */
    @Transactional
    public ShopEntity updateShop(Integer shopId, ShopEntity shopDetails) {
        ShopEntity shop = shopRepository.findById(shopId)
            .orElseThrow(() -> new IllegalStateException("Shop not found"));
        shop.setShopName(shopDetails.getShopName());
        shop.setDescription(shopDetails.getDescription());
        return shopRepository.save(shop);
    }

    /**
     * Deletes a shop by ID.
     */
    @Transactional
    public void deleteShop(Integer shopId) {
        if (!shopRepository.existsById(shopId)) {
            throw new IllegalStateException("Shop not found");
        }
        shopRepository.deleteById(shopId);
    }
}
