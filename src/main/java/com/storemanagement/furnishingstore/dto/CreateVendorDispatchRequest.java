package com.storemanagement.furnishingstore.dto;

import java.time.LocalDate;
import lombok.Data;

@Data
public class CreateVendorDispatchRequest {
    public Long orderId;
    public Long vendorId;
    public String transportMode;    // AIR / TRAIN / ROAD / SEA / OTHER
    public String awbNumber;
    public LocalDate dispatchDate;
    public LocalDate expectedDelivery;
    public String invoiceUrl;
}
