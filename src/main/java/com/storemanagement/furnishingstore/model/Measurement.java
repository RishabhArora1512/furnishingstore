package com.storemanagement.furnishingstore.model;

import jakarta.persistence.*;
import java.time.Instant;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "measurement")
public class Measurement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long storeId;
    private Long orderId;

    private String roomArea;         // e.g. Living Room, Bedroom
    private String measurementType;  // e.g. Curtain, Blind, Sofa

    private Double height;
    private Double width;
    private Double depth;

    private String unit;             // e.g. "cm"

    private String sketchUrl;        // uploaded image URL / key
    private String notes;

    private Instant createdAt = Instant.now();

    // getters & setters...
}