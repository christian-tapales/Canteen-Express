package com.canteen.express.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.DecimalMin;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Represents a payment for an order.
 * Tracks payment details and status.
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
     */
    @NotNull
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false, unique = true)
    private OrderEntity order;

    @NotNull
    @DecimalMin(value = "0.0", inclusive = false)
    @Column(name = "amount", precision = 10, scale = 2, nullable = false)
    private BigDecimal amount;

    /**
     * Payment method (e.g., CASH, CARD, DIGITAL_WALLET).
     */
    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "payment_method", length = 20, nullable = false)
    private PaymentMethod paymentMethod;

    /**
     * Status of the payment (e.g., PENDING, COMPLETED, FAILED, REFUNDED).
     */
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

    // --- Life Cycle Methods (for timestamps) ---

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
        // Default constructor required by JPA
    }

    public PaymentEntity(OrderEntity order, BigDecimal amount, PaymentMethod paymentMethod) {
        this.order = order;
        this.amount = amount;
        this.paymentMethod = paymentMethod;
    }

    // --- Getters and Setters ---

    public Integer getPaymentId() { return paymentId; }
    public void setPaymentId(Integer paymentId) { this.paymentId = paymentId; }

    public OrderEntity getOrder() { return order; }
    public void setOrder(OrderEntity order) { this.order = order; }

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public PaymentMethod getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(PaymentMethod paymentMethod) { this.paymentMethod = paymentMethod; }

    public PaymentStatus getStatus() { return status; }
    public void setStatus(PaymentStatus status) { this.status = status; }

    public LocalDateTime getPaymentDate() { return paymentDate; }
    public void setPaymentDate(LocalDateTime paymentDate) { this.paymentDate = paymentDate; }
}
