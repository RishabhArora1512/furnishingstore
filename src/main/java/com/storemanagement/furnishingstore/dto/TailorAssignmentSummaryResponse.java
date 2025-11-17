package com.storemanagement.furnishingstore.dto;

import lombok.Data;

@Data
public class TailorAssignmentSummaryResponse {
    public long totalAssignments;
    public long inProgress;
    public long completed;
    public long delayed;
}
