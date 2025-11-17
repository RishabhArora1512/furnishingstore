package com.storemanagement.furnishingstore.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "tailor_staff")
@Getter
@Setter
public class TailorStaff {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Multi-store support
    @Column(name = "store_id", nullable = false)
    private Long storeId;

    @Column(name = "name", nullable = false)
    private String name;

    // e.g. TAILOR-001
    @Column(name = "code", nullable = false, unique = true)
    private String code;

    // Curtains & Drapes, Upholstery & Furniture, etc.
    @Column(name = "specialty")
    private String specialty;

    @Column(name = "experience_years")
    private Integer experienceYears;

    @Column(name = "phone")
    private String phone;

    @Column(name = "rating")
    private Double rating;

    // true = Available, false = Busy
    @Column(name = "available")
    private Boolean available = Boolean.TRUE;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
