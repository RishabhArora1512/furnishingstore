package com.storemanagement.furnishingstore.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class UpdateDispatchStatusRequest {
    public String status;
    public LocalDate expectedDelivery; // optional override
}
