package com.storemanagement.furnishingstore.dto;

import java.time.LocalDate;
import lombok.Data;

@Data
public class CreateDeliveryAssignmentRequest {
    public Long orderId;
    public Long staffId;
    public LocalDate deliveryDate;
    public String timeSlot;
    public String notes;
}
