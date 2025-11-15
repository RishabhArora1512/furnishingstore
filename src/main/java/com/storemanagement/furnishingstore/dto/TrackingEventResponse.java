package com.storemanagement.furnishingstore.dto;

import lombok.Data;

import java.time.Instant;

@Data
public class TrackingEventResponse {
    public Long id;
    public String message;
    public String status;
    public Instant eventTime;
}
