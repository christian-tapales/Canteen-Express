package com.appdevg5.canteencoders.service;

import com.appdevg5.canteencoders.entity.OrderEntity;
import com.appdevg5.canteencoders.entity.OrderItemEntity;
import com.appdevg5.canteencoders.entity.PaymentEntity;
import com.appdevg5.canteencoders.entity.UserEntity;
import com.appdevg5.canteencoders.entity.ShopEntity;
import com.appdevg5.canteencoders.entity.FoodItemEntity;
import com.appdevg5.canteencoders.entity.InventoryEntity;
import com.appdevg5.canteencoders.repository.OrderRepository;
import com.appdevg5.canteencoders.repository.PaymentRepository;
import com.appdevg5.canteencoders.repository.OrderItemRepository;
import com.appdevg5.canteencoders.repository.UserRepository;
import com.appdevg5.canteencoders.repository.ShopRepository;
import com.appdevg5.canteencoders.repository.FoodItemRepository;
import com.appdevg5.canteencoders.repository.InventoryRepository;
import com.appdevg5.canteencoders.dto.OrderDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

/**
 * Service class for Order-related business logic.
 */
@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired 
    private PaymentRepository paymentRepository;


    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ShopRepository shopRepository;

    @Autowired
    private FoodItemRepository foodItemRepository;

    @Autowired
    private InventoryRepository inventoryRepository;

    /**
     * Retrieves all orders for a user.
     */
    public List<OrderEntity> getOrdersByUser(Integer userId) {
        UserEntity user = userRepository.findById(userId)
            .orElseThrow(() -> new IllegalStateException("User not found"));
        return orderRepository.findByUser(user);
    }

    /**
     * Retrieves all orders for a shop (for vendors).
     */
    public List<OrderEntity> getOrdersByShop(Integer shopId) {
        ShopEntity shop = shopRepository.findById(shopId)
            .orElseThrow(() -> new IllegalStateException("Shop not found"));
        return orderRepository.findByShop(shop);
    }

    /**
     * Retrieves all orders for the vendor's shop (for vendors).
     * Gets the authenticated vendor and returns orders for their shop.
     */
    @Transactional
    public List<OrderEntity> getOrdersByVendorShop() {
        // Get the authenticated user from Spring Security context
        org.springframework.security.core.Authentication authentication = 
            org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication();
        
        System.out.println("DEBUG: Authentication object: " + authentication);
        
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new IllegalStateException("User not authenticated");
        }
        
        String email = authentication.getName();
        System.out.println("DEBUG: Authenticated user email: " + email);
        
        UserEntity vendor = userRepository.findByEmail(email)
            .orElseThrow(() -> new IllegalStateException("Vendor not found with email: " + email));
        
        System.out.println("DEBUG: Found vendor - ID: " + vendor.getUserId() + ", Role: " + vendor.getRole());
        
        // Check if user is actually a vendor
        if (vendor.getRole() != UserEntity.Role.VENDOR) {
            throw new IllegalStateException("User is not a vendor. Role: " + vendor.getRole());
        }
        
        // Get the vendor's shop
        ShopEntity shop = vendor.getShop();
        System.out.println("DEBUG: Vendor's shop: " + (shop != null ? "Shop ID: " + shop.getShopId() : "NULL"));
        
        if (shop == null) {
            throw new IllegalStateException("Vendor has no assigned shop. Please ensure the vendor account has a shop_id in the database.");
        }
        
        // Return all orders for this shop
        List<OrderEntity> orders = orderRepository.findByShop(shop);
        System.out.println("DEBUG: Found " + orders.size() + " orders for shop ID: " + shop.getShopId());
        return orders;
    }

    /**
     * Retrieves an order by ID.
     */
    public Optional<OrderEntity> getOrderById(Integer orderId) {
        return orderRepository.findById(orderId);
    }

    /**
     * Creates a new order with order items from entity.
     * This is a complex operation involving inventory checks and updates.
     */
    @Transactional
    public OrderEntity createOrder(OrderEntity orderRequest) {
        Integer userId = orderRequest.getUser().getUserId();
        // For now, assume orderRequest contains orderItems as a list, but since OrderEntity doesn't have getOrderItems(),
        // we need to create orderItems from the request. This is a simplified version.
        // In a real implementation, the OrderEntity would have a OneToMany relationship with OrderItemEntity.

        UserEntity user = userRepository.findById(userId)
            .orElseThrow(() -> new IllegalStateException("User not found"));

        // For simplicity, assume the orderRequest has a shop set
        ShopEntity shop = orderRequest.getShop();

        BigDecimal totalAmount = orderRequest.getTotalAmount();

        // Create order
        OrderEntity order = new OrderEntity(user, shop, totalAmount);
        order = orderRepository.save(order);

        // Note: In a full implementation, orderItems would be saved here
        // For now, this is a basic implementation

        return order;
    }

    /**
     * Creates a new order with order items.
     * This is a complex operation involving inventory checks and updates.
     */
    @Transactional
    public OrderEntity createOrder(Integer userId, Integer shopId, List<OrderItemEntity> orderItems, OrderDTO dto) {
        UserEntity user = userRepository.findById(userId)
            .orElseThrow(() -> new IllegalStateException("User not found"));
        ShopEntity shop = shopRepository.findById(shopId)
            .orElseThrow(() -> new IllegalStateException("Shop not found"));

        BigDecimal totalAmount = BigDecimal.ZERO;

        // 1. Validate Inventory & Calculate Total
        for (OrderItemEntity item : orderItems) {
            FoodItemEntity foodItem = foodItemRepository.findById(item.getFoodItem().getFoodItemId())
                .orElseThrow(() -> new IllegalStateException("Food item not found"));
            
            // Check Inventory
            InventoryEntity inventory = inventoryRepository.findByFoodItem(foodItem)
                .orElseThrow(() -> new IllegalStateException("Inventory not found"));
            
            if (inventory.getQuantityAvailable() < item.getQuantity()) {
                throw new IllegalStateException("Insufficient stock for " + foodItem.getItemName());
            }

            // Deduct Inventory
            inventory.setQuantityAvailable(inventory.getQuantityAvailable() - item.getQuantity());
            inventoryRepository.save(inventory);

            // Set Price
            item.setPriceAtOrder(foodItem.getPrice());
            totalAmount = totalAmount.add(foodItem.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())));
        }

        // 2. Save the Order (WITHOUT Pickup Time)
        OrderEntity order = new OrderEntity(user, shop, totalAmount);
        
        // Map Special Instructions
        if (dto.getSpecialInstructions() != null) {
            order.setSpecialInstructions(dto.getSpecialInstructions());
        }
        
        OrderEntity savedOrder = orderRepository.save(order);

        // 3. Save Order Items
        for (OrderItemEntity item : orderItems) {
            item.setOrder(savedOrder);
            orderItemRepository.save(item);
        }

        // 4. ✅ CREATE & SAVE PAYMENT RECORD IMMEDIATELY
        PaymentEntity payment = new PaymentEntity();
        payment.setOrder(savedOrder);
        payment.setAmount(totalAmount);
        
        payment.setPaymentMethod(dto.getPaymentMethod());

        payment.setStatus(PaymentEntity.PaymentStatus.PENDING);
        payment.setTransactionReference(dto.getTransactionCode()); // <--- SAVE THE CODE HERE
        
        paymentRepository.save(payment);

        return savedOrder;
    }

    /**
     * ✅ UPDATED: Syncs Order Status with Payment Status
     * Used by Vendor to Accept, Reject, or Complete orders.
     */
    @Transactional
    public OrderEntity updateOrderStatus(Integer orderId, OrderEntity.OrderStatus newStatus) {
        OrderEntity order = orderRepository.findById(orderId)
            .orElseThrow(() -> new IllegalStateException("Order not found"));
        
        // 1. Update the Order Status
        order.setStatus(newStatus);
        
        // 2. Sync the Payment Status automatically
        com.appdevg5.canteencoders.entity.PaymentEntity payment = order.getPayment();
        
        if (payment != null) {
            if (newStatus == OrderEntity.OrderStatus.COMPLETED) {
                // If Order is Completed -> Money is officially taken
                payment.setStatus(com.appdevg5.canteencoders.entity.PaymentEntity.PaymentStatus.COMPLETED);
            } 
            else if (newStatus == OrderEntity.OrderStatus.REJECTED) {
                // If Vendor Rejects -> Money must be refunded
                payment.setStatus(com.appdevg5.canteencoders.entity.PaymentEntity.PaymentStatus.REFUNDED);
            }
        }
        
        return orderRepository.save(order);
    }

    /**
     * ✅ UPDATED: Cancels order instead of deleting it.
     * Used by Customer to cancel their own order.
     */
    @Transactional
    public void cancelOrder(Integer orderId) { // Renamed from deleteOrder
        OrderEntity order = orderRepository.findById(orderId)
            .orElseThrow(() -> new IllegalStateException("Order not found"));

        // 1. Instead of deleting, we set status to CANCELLED
        order.setStatus(OrderEntity.OrderStatus.CANCELLED);
        
        // 2. Sync Payment Status to REFUNDED
        if (order.getPayment() != null) {
            order.getPayment().setStatus(com.appdevg5.canteencoders.entity.PaymentEntity.PaymentStatus.REFUNDED);
        }
        
        orderRepository.save(order);
    }

    /**
     * Retrieves all orders.
     */
    public List<OrderEntity> getAllOrders() {
        return orderRepository.findAll();
    }

    /**
     * Updates an order.
     */
    @Transactional
    public OrderEntity updateOrder(Integer orderId, OrderEntity orderDetails) {
        OrderEntity order = orderRepository.findById(orderId)
            .orElseThrow(() -> new IllegalStateException("Order not found"));
        order.setStatus(orderDetails.getStatus());
        order.setTotalAmount(orderDetails.getTotalAmount());
        return orderRepository.save(order);
    }

    /**
     * Saves an order entity directly to the database.
     */
    public OrderEntity save(OrderEntity order) {
        return orderRepository.save(order);
    }

    /**
     * Converts an OrderEntity (Database format) to OrderDTO (API format).
     */
    // ✅ UPDATED: convertToDTO (Removed pickupTime)
    public OrderDTO convertToDTO(OrderEntity entity) {
        OrderDTO dto = new OrderDTO();
        
        if (entity.getUser() != null) dto.setUserId(entity.getUser().getUserId());
        if (entity.getShop() != null) dto.setShopId(entity.getShop().getShopId());

        dto.setTotalAmount(entity.getTotalAmount());
        dto.setSpecialInstructions(entity.getSpecialInstructions());
        
        if (entity.getStatus() != null) dto.setStatus(entity.getStatus().name());
        
        // Include Transaction Code if available (via Payment link)
        if (entity.getPayment() != null) {
            dto.setTransactionCode(entity.getPayment().getTransactionReference());
            dto.setPaymentMethod(entity.getPayment().getPaymentMethod());
        }
        
        return dto;
    }


    @Transactional 
    public OrderDTO updateSpecialInstructions(Integer orderId, String newInstructions) {
        // 1. Fetch the order
        OrderEntity order = orderRepository.findById(orderId)
            .orElseThrow(() -> new RuntimeException("Order not found"));

        // 2. Validate Status
        if (order.getStatus() != OrderEntity.OrderStatus.PENDING) {
            throw new IllegalStateException("Only PENDING orders can be updated.");
        }

        // 3. Update the data
        if (newInstructions != null) {
            order.setSpecialInstructions(newInstructions);
        }

        // 4. Save and Convert (Transaction is still open here!)
        OrderEntity savedOrder = orderRepository.save(order);
        return convertToDTO(savedOrder);
    }
}
