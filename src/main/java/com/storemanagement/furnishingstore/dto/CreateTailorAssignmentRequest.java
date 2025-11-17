package com.storemanagement.furnishingstore.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class CreateTailorAssignmentRequest {
    public Long storeId;
    public Long orderId;
    public Long tailorId;

    public LocalDate expectedCompletionDate;  // from modal
    public String notes;                      // Notes & Instructions
}
