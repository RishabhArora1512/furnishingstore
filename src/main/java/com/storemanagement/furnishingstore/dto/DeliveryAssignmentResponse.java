package com.storemanagement.furnishingstore.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class DeliveryAssignmentResponse {
    public Long id;
    public Long orderId;
    public String orderCode;
    public Long customerId;
    public String customerName;
    public String deliveryAddress;

    public Long staffId;
    public String staffName;

    public LocalDate deliveryDate;
    public String timeSlot;
    public String notes;

    public String status;
    public String proofUrl;
}
