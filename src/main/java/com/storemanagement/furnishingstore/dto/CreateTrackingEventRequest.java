package com.storemanagement.furnishingstore.dto;

import lombok.Data;

import java.time.Instant;

@Data
public class CreateTrackingEventRequest {
    public String message;
    public String status;      // optional: IN_TRANSIT / DELIVERED / DELAYED / CANCELLED
    public Instant eventTime;  // optional; default now
}
