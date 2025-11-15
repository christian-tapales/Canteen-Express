package com.canteen.express.controller;

import com.canteen.express.entity.ShopEntity;
import com.canteen.express.entity.FoodItemEntity;
import com.canteen.express.service.ShopService;
import com.canteen.express.service.FoodItemService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
     * Get all available shops.
     * @return List of all shops.
     */
    @GetMapping
    public ResponseEntity<List<ShopEntity>> getAllShops() {
        List<ShopEntity> shops = shopService.getAllShops();
        return ResponseEntity.ok(shops);
    }

    /**
     * Get menu for a specific shop.
     * @param shopId The ID of the shop.
     * @return List of food items in the shop's menu.
     */
    @GetMapping("/{shopId}/menu")
    public ResponseEntity<List<FoodItemEntity>> getShopMenu(@PathVariable Integer shopId) {
        List<FoodItemEntity> menu = foodItemService.getFoodItemsByShop(shopId);
        return ResponseEntity.ok(menu);
    }
}
