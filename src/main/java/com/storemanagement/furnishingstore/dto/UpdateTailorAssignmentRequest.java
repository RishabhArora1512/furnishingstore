package com.storemanagement.furnishingstore.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class UpdateTailorAssignmentRequest {
    public Long tailorId;
    public LocalDate expectedCompletionDate;
    public String notes;
}
