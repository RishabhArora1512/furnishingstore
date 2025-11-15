package com.storemanagement.furnishingstore.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.Instant;

@Entity
@Data
public class Vendor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long storeId;

    private String name;
    private String contact;
    private String phone;
    private String email;

    @Column(length = 1000)
    private String address;

    private Instant createdAt = Instant.now();
}