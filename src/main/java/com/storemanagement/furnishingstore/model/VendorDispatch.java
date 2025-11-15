package com.storemanagement.furnishingstore.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.Instant;
import java.time.LocalDate;

@Entity
@Data
public class VendorDispatch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long storeId;
    private Long orderId;
    private Long vendorId;

    @Enumerated(EnumType.STRING)
    private TransportMode transportMode;

    private String awbNumber;

    private LocalDate dispatchDate;
    private LocalDate expectedDelivery;

    private String invoiceUrl;

    @Enumerated(EnumType.STRING)
    private DispatchStatus status = DispatchStatus.CREATED;

    private Instant lastStatusUpdate = Instant.now();
    private Instant createdAt = Instant.now();
}
