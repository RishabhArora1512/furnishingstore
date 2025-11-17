package com.storemanagement.furnishingstore.dto;

import com.storemanagement.furnishingstore.model.TailorAssignmentStatus;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TailorAssignmentResponse {
    public Long id;
    public Long storeId;

    public Long orderId;
    public String orderCode;        // ORD-2024-001
    public String customerName;     // Sarah Johnson
    public String productSummary;   // Premium Silk Curtains

    public Long tailorId;
    public String tailorName;
    public String tailorCode;       // TAILOR-001

    public TailorAssignmentStatus status;

    public LocalDate assignedDate;          // when created
    public LocalDate expectedCompletionDate;
    public LocalDate completedDate;

    public String notes;          // long instructions
    public String progressNote;   // short tag: "Proof Uploaded"
}
