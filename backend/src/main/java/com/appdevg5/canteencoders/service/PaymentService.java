package com.appdevg5.canteencoders.service;

import com.appdevg5.canteencoders.entity.PaymentEntity;
import com.appdevg5.canteencoders.entity.OrderEntity;
import com.appdevg5.canteencoders.repository.PaymentRepository;
import com.appdevg5.canteencoders.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Optional;

/**
 * Service class for Payment-related business logic.
 */
@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private OrderRepository orderRepository;

    /**
     * Retrieves payment for a specific order.
     */
    public Optional<PaymentEntity> getPaymentByOrderId(Integer orderId) {
        OrderEntity order = orderRepository.findById(orderId)
            .orElseThrow(() -> new IllegalStateException("Order not found"));
        return paymentRepository.findByOrder(order);
    }

    /**
     * Processes payment for an order.
     */
    @Transactional
    public PaymentEntity processPayment(Integer orderId, PaymentEntity.PaymentMethod paymentMethod) {
        OrderEntity order = orderRepository.findById(orderId)
            .orElseThrow(() -> new IllegalStateException("Order not found"));
        if (paymentRepository.findByOrder(order).isPresent()) {
            throw new IllegalStateException("Payment already exists for this order");
        }

        PaymentEntity payment = new PaymentEntity(order, order.getTotalAmount(), paymentMethod);
        payment.setStatus(PaymentEntity.PaymentStatus.COMPLETED); // Assuming immediate completion for simplicity
        return paymentRepository.save(payment);
    }

    /**
     * Updates payment status.
     */
    @Transactional
    public PaymentEntity updatePaymentStatus(Integer paymentId, PaymentEntity.PaymentStatus status) {
        PaymentEntity payment = paymentRepository.findById(paymentId)
            .orElseThrow(() -> new IllegalStateException("Payment not found"));
        payment.setStatus(status);
        return paymentRepository.save(payment);
    }
}
