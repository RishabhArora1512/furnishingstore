package com.storemanagement.furnishingstore.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.Instant;

@Entity
@Data
public class DeliveryStaff {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long storeId;

    private String name;
    private String area;         // e.g. North Mumbai
    private String vehicleInfo;  // e.g. Tempo (MH-01-AB-1234)
    private String phone;

    @Column(columnDefinition = "numeric(3,1)") // Example: allows values like 4.5, 5.0, etc.
    private Double rating;       // 4.7 etc.

    private Boolean active = Boolean.TRUE; // available/busy toggle if needed

    private Instant createdAt = Instant.now();
}
