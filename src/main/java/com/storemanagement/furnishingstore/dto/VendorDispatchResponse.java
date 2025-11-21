package com.storemanagement.furnishingstore.dto;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import lombok.Data;

@Data
public class VendorDispatchResponse {
    public Long id;
    public Long orderId;
    public String orderCode;  // optional if you enrich from Orders
    public Long vendorId;
    public String vendorName;

    public String transportMode;
    public String awbNumber;
    public LocalDate dispatchDate;
    public LocalDate expectedDelivery;
    public String invoiceUrl;

    public String status;
    public Instant lastStatusUpdate;

    public List<TrackingEventResponse> trackingEvents;
}
