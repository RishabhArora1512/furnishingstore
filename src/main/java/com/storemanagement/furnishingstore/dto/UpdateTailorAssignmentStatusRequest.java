package com.storemanagement.furnishingstore.dto;

import com.storemanagement.furnishingstore.model.TailorAssignmentStatus;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UpdateTailorAssignmentStatusRequest {
    public TailorAssignmentStatus status;
    public String progressNote;
    public LocalDate completedDate;
}
