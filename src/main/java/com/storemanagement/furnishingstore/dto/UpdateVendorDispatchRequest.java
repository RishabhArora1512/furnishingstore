package com.storemanagement.furnishingstore.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class UpdateVendorDispatchRequest {
    public Long orderId;
    public Long vendorId;
    public String transportMode;
    public String awbNumber;
    public LocalDate dispatchDate;
    public LocalDate expectedDelivery;
    public String invoiceUrl;
}
