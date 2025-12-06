package com.appdevg5.canteencoders.service;

import com.appdevg5.canteencoders.entity.PaymentEntity;
import com.appdevg5.canteencoders.entity.OrderEntity;
import com.appdevg5.canteencoders.repository.PaymentRepository;
import com.appdevg5.canteencoders.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
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
     * Retrieves payment by ID.
     */
    public Optional<PaymentEntity> getPaymentById(Integer paymentId) {
        return paymentRepository.findById(paymentId);
    }

    /**
     * Processes payment for an order.
     */
    @Transactional
    public PaymentEntity processPayment(Integer orderId, String paymentMethod, String transactionCode) {
        OrderEntity order = orderRepository.findById(orderId)
            .orElseThrow(() -> new IllegalStateException("Order not found"));
        if (paymentRepository.findByOrder(order).isPresent()) {
            throw new IllegalStateException("Payment already exists for this order");
        }

        PaymentEntity payment = new PaymentEntity();
        payment.setOrder(order);
        payment.setAmount(order.getTotalAmount());
        payment.setPaymentMethod(paymentMethod); // Pass "CASH" as a String string
        // FIX 3: Save the transaction code
        payment.setTransactionReference(transactionCode);
        // FIX 4: Keep it PENDING. Do not set to COMPLETED yet.
        payment.setStatus(PaymentEntity.PaymentStatus.PENDING);
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

    /**
     * Retrieves all payments.
     */
    public List<PaymentEntity> getAllPayments() {
        return paymentRepository.findAll();
    }

    /**
     * Creates a new payment.
     */
    @Transactional
    public PaymentEntity createPayment(PaymentEntity payment) {
        return paymentRepository.save(payment);
    }

    /**
     * Updates an existing payment.
     */
    @Transactional
    public PaymentEntity updatePayment(Integer paymentId, PaymentEntity paymentDetails) {
        PaymentEntity payment = paymentRepository.findById(paymentId)
            .orElseThrow(() -> new IllegalStateException("Payment not found"));
        payment.setAmount(paymentDetails.getAmount());
        payment.setPaymentMethod(paymentDetails.getPaymentMethod());
        payment.setStatus(paymentDetails.getStatus());
        return paymentRepository.save(payment);
    }

    /**
     * Deletes a payment by ID.
     */
    @Transactional
    public void deletePayment(Integer paymentId) {
        if (!paymentRepository.existsById(paymentId)) {
            throw new IllegalStateException("Payment not found");
        }
        paymentRepository.deleteById(paymentId);
    }
}
