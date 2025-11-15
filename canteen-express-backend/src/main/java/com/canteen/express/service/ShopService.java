package com.canteen.express.service;

import com.canteen.express.entity.ShopEntity;
import com.canteen.express.repository.ShopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

/**
 * Service class for Shop-related business logic.
 */
@Service
public class ShopService {

    @Autowired
    private ShopRepository shopRepository;

    /**
     * Retrieves all shops.
     */
    public List<ShopEntity> getAllShops() {
        return shopRepository.findAll();
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
