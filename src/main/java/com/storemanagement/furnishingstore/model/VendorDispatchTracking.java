package com.storemanagement.furnishingstore.model;

import jakarta.persistence.*;
import java.time.Instant;
import lombok.Data;

@Entity
@Data
public class VendorDispatchTracking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long storeId;
    private Long dispatchId;

    @Column(length = 2000)
    private String message;

    @Enumerated(EnumType.STRING)
    private DispatchStatus statusSnapshot;

    private Instant eventTime = Instant.now();
}
