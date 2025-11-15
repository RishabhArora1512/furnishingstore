package com.storemanagement.furnishingstore.dto;

import lombok.Data;

@Data
public class UpdateDeliveryStatusRequest {
    public String status;   // SCHEDULED / OUT_FOR_DELIVERY / DELIVERED / FAILED / CANCELLED
    public String proofUrl; // optional when marking delivered
}
