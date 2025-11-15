package com.storemanagement.furnishingstore.dto;

import lombok.Data;


@Data
public class PaymentRequest {
    public double amount;
    public String type;
    public String idempotencyKey;
    public Long processedBy;
}
