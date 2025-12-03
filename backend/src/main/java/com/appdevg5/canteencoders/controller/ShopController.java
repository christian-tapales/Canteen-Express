package com.appdevg5.canteencoders.controller;

import com.appdevg5.canteencoders.dto.ShopDTO;
import com.appdevg5.canteencoders.dto.FoodItemDTO;
import com.appdevg5.canteencoders.entity.ShopEntity;
import com.appdevg5.canteencoders.service.ShopService;
import com.appdevg5.canteencoders.service.FoodItemService;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

/**
 * REST Controller for Shop-related endpoints.
 * Handles customer-facing shop browsing and menu viewing.
 */
@RestController
@RequestMapping("/api/shops")
public class ShopController {

    @Autowired
    private ShopService shopService;

    @Autowired
    private FoodItemService foodItemService;

    /**
     * Create a new shop.
     * @param shopEntity Shop entity containing shop details.
     * @return Created shop as DTO.
     */
    @PostMapping
    public ResponseEntity<ShopDTO> createShop(@Valid @RequestBody ShopEntity shopEntity) {
        ShopEntity createdShop = shopService.createShop(shopEntity);
        ShopDTO shopDTO = shopService.convertToShopDTO(createdShop);
        return ResponseEntity.ok(shopDTO);
    }

    /**
     * Get all available shops.
     * @return List of all shops as DTOs.
     */
    @GetMapping
    public ResponseEntity<List<ShopDTO>> getAllShops() {
        List<ShopDTO> shops = shopService.getAllShopsAsDTO();
        return ResponseEntity.ok(shops);
    }

    /**
     * Get a shop by ID.
     * @param shopId The ID of the shop.
     * @return Shop as DTO.
     */
    @GetMapping("/{shopId}")
    public ResponseEntity<ShopDTO> getShopById(@PathVariable Integer shopId) {
        Optional<ShopEntity> shop = shopService.getShopById(shopId);
        if (shop.isPresent()) {
            ShopDTO shopDTO = shopService.convertToShopDTO(shop.get());
            return ResponseEntity.ok(shopDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Update a shop.
     * @param shopId The ID of the shop.
     * @param shopDetails Updated shop details.
     * @return Updated shop as DTO.
     */
    @PutMapping("/{shopId}")
    public ResponseEntity<ShopDTO> updateShop(@PathVariable Integer shopId, @Valid @RequestBody ShopEntity shopDetails) {
        ShopEntity updatedShop = shopService.updateShop(shopId, shopDetails);
        ShopDTO shopDTO = shopService.convertToShopDTO(updatedShop);
        return ResponseEntity.ok(shopDTO);
    }

    /**
     * Delete a shop.
     * @param shopId The ID of the shop.
     * @return No content.
     */
    @DeleteMapping("/{shopId}")
    public ResponseEntity<Void> deleteShop(@PathVariable Integer shopId) {
        shopService.deleteShop(shopId);
        return ResponseEntity.noContent().build();
    }

    /**
     * Get menu for a specific shop.
     * @param shopId The ID of the shop.
     * @return List of food items in the shop's menu as DTOs.
     */
    @GetMapping("/{shopId}/menu")
    public ResponseEntity<List<FoodItemDTO>> getShopMenu(@PathVariable Integer shopId) {
        List<FoodItemDTO> menu = foodItemService.getFoodItemsByShop(shopId);
        return ResponseEntity.ok(menu);
    }
}
