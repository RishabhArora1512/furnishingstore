package com.storemanagement.furnishingstore.dto;

import java.time.LocalDate;
import lombok.Data;

@Data
public class UpdateTailorAssignmentRequest {
    public Long tailorId;
    public LocalDate expectedCompletionDate;
    public String notes;
}
