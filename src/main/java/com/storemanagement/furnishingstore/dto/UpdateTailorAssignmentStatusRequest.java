package com.storemanagement.furnishingstore.dto;

import com.storemanagement.furnishingstore.model.TailorAssignmentStatus;
import java.time.LocalDate;
import lombok.Data;

@Data
public class UpdateTailorAssignmentStatusRequest {
    public TailorAssignmentStatus status;
    public String progressNote;
    public LocalDate completedDate;
}
