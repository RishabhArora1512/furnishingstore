package com.storemanagement.furnishingstore.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.Instant;
import java.time.LocalDate;

@Entity
@Data
public class DeliveryAssignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long storeId;

    private Long orderId;
    private Long customerId;  // denormalised for faster queries

    private Long staffId;

    private LocalDate deliveryDate;
    private String timeSlot;  // "10:00 AM - 12:00 PM"

    @Column(length = 2000)
    private String notes;

    private String proofUrl;  // photo / e-sign etc, for “Proof Available”

    @Enumerated(EnumType.STRING)
    private DeliveryStatus status = DeliveryStatus.SCHEDULED;

    private Instant createdAt = Instant.now();
    private Instant updatedAt = Instant.now();

}
