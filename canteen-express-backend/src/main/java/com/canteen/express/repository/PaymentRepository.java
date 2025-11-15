package com.canteen.express.repository;

import com.canteen.express.entity.PaymentEntity;
import com.canteen.express.entity.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

/**
 * Repository interface for Payment entity.
 * Handles all database operations related to the Payment.
 */
@Repository
public interface PaymentRepository extends JpaRepository<PaymentEntity, Integer> {

    /**
     * Finds payment by order.
     * Used to get payment details for a specific order.
     *
     * @param order The order entity.
     * @return An Optional containing the Payment if found, or empty if not.
     */
    Optional<PaymentEntity> findByOrder(OrderEntity order);
}
