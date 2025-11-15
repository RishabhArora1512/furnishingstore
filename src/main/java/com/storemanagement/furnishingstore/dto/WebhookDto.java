package com.storemanagement.furnishingstore.dto;

import lombok.Data;

@Data
public class WebhookDto {
    public String gatewayTxnId;
    public Long orderId;
    public double amount;
    public String status;
    public String payload;
    public String rawPayload() { return payload; }
}