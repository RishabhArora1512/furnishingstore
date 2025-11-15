package com.storemanagement.furnishingstore.model;

import jakarta.persistence.*;
import java.time.Instant;
import lombok.Data;


@Data
@Entity
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private Long storeId;
    private String name;
    private String phone;
    private String email;
    private String address;


    @Column(columnDefinition = "jsonb")
    private String meta;


    private Instant createdAt = Instant.now();
}