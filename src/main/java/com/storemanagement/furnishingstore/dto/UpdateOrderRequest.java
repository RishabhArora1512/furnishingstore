package com.storemanagement.furnishingstore.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class UpdateOrderRequest {
    public Long customerId;
    public Long productId;
    public Integer quantity;

    public String colorReference;
    public String fabricMaterial;
    public String deliveryAddress;

    public Long measurementStaffId;
    public Long assignedTailorId;
    public Long assignedMistriId;

    public LocalDate expectedDeliveryDate;

    public Double totalEstimate;
}

