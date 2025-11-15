package com.storemanagement.furnishingstore.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class UpdateDeliveryAssignmentRequest {
    public Long staffId;
    public LocalDate deliveryDate;
    public String timeSlot;
    public String notes;
    public String proofUrl;
}
