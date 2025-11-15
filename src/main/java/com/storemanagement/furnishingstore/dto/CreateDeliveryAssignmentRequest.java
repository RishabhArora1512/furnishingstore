package com.storemanagement.furnishingstore.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class CreateDeliveryAssignmentRequest {
    public Long orderId;
    public Long staffId;
    public LocalDate deliveryDate;
    public String timeSlot;
    public String notes;
}
