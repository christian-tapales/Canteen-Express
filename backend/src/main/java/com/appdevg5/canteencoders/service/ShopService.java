package com.appdevg5.canteencoders.service;

import com.appdevg5.canteencoders.repository.UserRepository; // Import this
import org.springframework.beans.factory.annotation.Autowired; // Import this
import com.appdevg5.canteencoders.dto.ShopDTO;
import com.appdevg5.canteencoders.entity.ShopEntity;
import com.appdevg5.canteencoders.entity.UserEntity;
import com.appdevg5.canteencoders.repository.ShopRepository;
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

    private final ShopRepository shopRepository;


    @Autowired 
    private UserRepository userRepository;

    // Use constructor injection for modern Spring practice
    public ShopService(ShopRepository shopRepository) {
        this.shopRepository = shopRepository;
    }

    /**
     * Retrieves all shops as entities (for admin use).
     */
    public List<ShopEntity> getAllShops() {
        return shopRepository.findAll();
    }

    /**
     * Retrieves all shops as DTOs (for public use).
     */
    public List<ShopDTO> getAllShopsAsDTO() {
        return shopRepository.findAll().stream()
                .map(this::convertToShopDTO)
                .collect(Collectors.toList());
    }

    /**
     * Converts ShopEntity to ShopDTO, mapping to snake_case DTO fields
     * and excluding sensitive paymentNumber.
     */
    public ShopDTO convertToShopDTO(ShopEntity shop) {
        ShopDTO dto = new ShopDTO();
        // Applying the snake_case DTO setters
        dto.setId(shop.getShopId());           // Was: dto.setShop_id(...)
        dto.setName(shop.getShopName());       // Was: dto.setShop_name(...)
        dto.setDescription(shop.getDescription());
        // Including the image_url field
        dto.setImageUrl(shop.getImageUrl());
        dto.setIsOpen(shop.getIsOpen());
        dto.setPaymentNumber(shop.getPaymentNumber());
        // **EXCLUDED:** shop.getPaymentNumber() is sensitive and not included in the public ShopDTO
        
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
        // NOTE: You may want to update the image_url and paymentNumber here if they are provided in shopDetails
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

    // ✅ NEW METHOD: Get the logged-in vendor's shop
    public ShopDTO getVendorShop(String vendorEmail) {
        UserEntity vendor = userRepository.findByEmail(vendorEmail)
             .orElseThrow(() -> new RuntimeException("Vendor not found"));
        
        if (vendor.getShop() == null) {
            throw new RuntimeException("No shop assigned to this vendor");
        }
        return convertToShopDTO(vendor.getShop());
    }

    // ✅ NEW METHOD: Toggle Open/Closed status
    @Transactional
    public ShopDTO toggleShopStatus(String vendorEmail) {
        UserEntity vendor = userRepository.findByEmail(vendorEmail)
            .orElseThrow(() -> new RuntimeException("Vendor not found"));
        
        ShopEntity shop = vendor.getShop();
        if (shop == null) throw new RuntimeException("No shop assigned");

        // Flip the status (Handle null by defaulting to true)
        boolean currentStatus = (shop.getIsOpen() == null) ? true : shop.getIsOpen();
        shop.setIsOpen(!currentStatus);
        
        ShopEntity savedShop = shopRepository.save(shop);
        return convertToShopDTO(savedShop);
    }


    // ✅ NEW METHOD: Update Vendor's Shop Details (Name & Description)
    @Transactional
    public ShopDTO updateVendorShopDetails(String vendorEmail, ShopDTO updates) {
        UserEntity vendor = userRepository.findByEmail(vendorEmail)
            .orElseThrow(() -> new RuntimeException("Vendor not found"));
        
        ShopEntity shop = vendor.getShop();
        if (shop == null) throw new RuntimeException("No shop assigned");

        // Update Name
        if (updates.getName() != null && !updates.getName().isBlank()) {
            shop.setShopName(updates.getName());
        }
        // Update Description
        if (updates.getDescription() != null) {
            shop.setDescription(updates.getDescription());
        }

        // ✅ ADD THIS: Update Image URL
        if (updates.getImageUrl() != null && !updates.getImageUrl().isBlank()) {
            shop.setImageUrl(updates.getImageUrl());
        }

        // ✅ ADD THIS: Update Payment Number
        if (updates.getPaymentNumber() != null) {
            shop.setPaymentNumber(updates.getPaymentNumber());
        }
        
        ShopEntity savedShop = shopRepository.save(shop);
        return convertToShopDTO(savedShop);
    }
}