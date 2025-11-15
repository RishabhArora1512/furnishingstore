package com.storemanagement.furnishingstore.dto;

import java.time.LocalDate;
import lombok.Data;

@Data
public class CreateOrderRequest {
    public Long customerId;
    public Long productId;
    public Integer quantity;

    public String colorReference;
    public String fabricMaterial;

    public String deliveryAddress;

    public Long measurementStaffId;
    public LocalDate expectedDeliveryDate;

    public AdvancePaymentRequest advancePayment;

    public static class AdvancePaymentRequest {
        public Double amount;
        public String idempotencyKey;
        public Long processedBy;
    }
}