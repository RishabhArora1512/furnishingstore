package com.storemanagement.furnishingstore.dto;

import java.time.LocalDate;
import lombok.Data;

@Data
public class UpdateDeliveryAssignmentRequest {
    public Long staffId;
    public LocalDate deliveryDate;
    public String timeSlot;
    public String notes;
    public String proofUrl;
}
