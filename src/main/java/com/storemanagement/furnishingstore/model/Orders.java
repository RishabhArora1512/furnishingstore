package com.storemanagement.furnishingstore.model;

import jakarta.persistence.*;
import java.time.Instant;
import java.time.LocalDate;
import lombok.Data;

@Data
@Entity
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long storeId;
    private Long customerId;
    private Long productId;
    private Integer quantity;
    private String colorReference;
    private String fabricMaterial;
    private String deliveryAddress;
    private Long assignedMistriId;
    private Long assignedTailorId;
    public Long measurementStaffId;
    private LocalDate expectedDeliveryDate;

    @Enumerated(EnumType.STRING)
    private OrderStatus status = OrderStatus.CREATED;

    private Double totalEstimate;
    private Double advanceAmount;
    private Double finalAmount;

    @Column(columnDefinition = "jsonb")
    private String metadata;

    private Instant createdAt = Instant.now();
    private Instant updatedAt = Instant.now();

    private String orderCode;

    @PreUpdate
    void touch() {
        updatedAt = Instant.now();
    }
}