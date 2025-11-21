package com.storemanagement.furnishingstore.dto;

import java.time.Instant;
import lombok.Data;

@Data
public class TrackingEventResponse {
    public Long id;
    public String message;
    public String status;
    public Instant eventTime;
}
