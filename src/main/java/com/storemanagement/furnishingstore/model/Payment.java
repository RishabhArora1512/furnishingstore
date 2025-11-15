package com.storemanagement.furnishingstore.model;

import jakarta.persistence.*;
import java.time.Instant;
import lombok.Data;

@Data
@Entity
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long orderId;
    private Double amount;
    private String type;
    private String status;
    private String gatewayTxn;
    private String idempotencyKey;
    private Long processedBy;


    private Instant createdAt = Instant.now();
}