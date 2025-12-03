package com.appdevg5.canteencoders.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.DecimalMin;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Represents a payment for an order.
 * Updated to include Transaction Reference for tracking digital payments (GCash, etc.).
 */
@Entity
@Table(name = "tbl_payments")
public class PaymentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "payment_id")
    private Integer paymentId;

    /**
     * FOREIGN KEY to the 'orders' table.
     * Links this payment to a specific order.
     */
    @NotNull
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false, unique = true)
    @JsonBackReference("order-payment")
    private OrderEntity order;

    @NotNull
    @DecimalMin(value = "0.0", inclusive = false)
    @Column(name = "amount", precision = 10, scale = 2, nullable = false)
    private BigDecimal amount;

    /**
     * ✅ NEW: Stores the External Transaction ID (e.g., GCash Ref No).
     * Crucial for disputes ("I paid but app says pending!").
     * Nullable because Cash payments won't have one.
     */
    @Column(name = "transaction_reference", length = 100)
    private String transactionReference;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "payment_method", length = 20, nullable = false)
    private PaymentMethod paymentMethod;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "status", length = 20, nullable = false)
    private PaymentStatus status = PaymentStatus.PENDING;

    @Column(name = "payment_date")
    private LocalDateTime paymentDate;

    // --- Enum Definitions ---

    public enum PaymentMethod {
        CASH, CARD, DIGITAL_WALLET
    }

    public enum PaymentStatus {
        PENDING, COMPLETED, FAILED, REFUNDED
    }

    // --- Life Cycle Methods ---

    @PrePersist
    protected void onCreate() {
        if (this.status == PaymentStatus.COMPLETED) {
            this.paymentDate = LocalDateTime.now();
        }
    }

    @PreUpdate
    protected void onUpdate() {
        if (this.status == PaymentStatus.COMPLETED && this.paymentDate == null) {
            this.paymentDate = LocalDateTime.now();
        }
    }

    // --- Constructors ---

    public PaymentEntity() {
    }

    public PaymentEntity(OrderEntity order, BigDecimal amount, PaymentMethod paymentMethod) {
        this.order = order;
        this.amount = amount;
        this.paymentMethod = paymentMethod;
    }

    public PaymentEntity(OrderEntity order, BigDecimal amount, PaymentMethod paymentMethod, String transactionReference) {
        this.order = order;
        this.amount = amount;
        this.paymentMethod = paymentMethod;
        this.transactionReference = transactionReference;
    }

    // --- Getters and Setters ---

    public Integer getPaymentId() { return paymentId; }
    public void setPaymentId(Integer paymentId) { this.paymentId = paymentId; }

    public OrderEntity getOrder() { return order; }
    public void setOrder(OrderEntity order) { this.order = order; }

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public String getTransactionReference() { return transactionReference; }
    public void setTransactionReference(String transactionReference) { this.transactionReference = transactionReference; }

    public PaymentMethod getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(PaymentMethod paymentMethod) { this.paymentMethod = paymentMethod; }

    public PaymentStatus getStatus() { return status; }
    public void setStatus(PaymentStatus status) { this.status = status; }

    public LocalDateTime getPaymentDate() { return paymentDate; }
    public void setPaymentDate(LocalDateTime paymentDate) { this.paymentDate = paymentDate; }
}