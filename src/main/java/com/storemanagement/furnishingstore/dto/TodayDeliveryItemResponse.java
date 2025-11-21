package com.storemanagement.furnishingstore.dto;

import java.time.LocalDate;
import lombok.Data;

@Data
public class TodayDeliveryItemResponse {
    public Long id;
    public Long orderId;
    public String orderCode;
    public String customerName;
    public Long staffId;
    public String staffName;

    public LocalDate deliveryDate;
    public String timeSlot;
    public String status;
}
