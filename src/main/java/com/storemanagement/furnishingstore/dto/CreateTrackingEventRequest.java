package com.storemanagement.furnishingstore.dto;

import java.time.Instant;
import lombok.Data;

@Data
public class CreateTrackingEventRequest {
    public String message;
    public String status;      // optional: IN_TRANSIT / DELIVERED / DELAYED / CANCELLED
    public Instant eventTime;  // optional; default now
}
