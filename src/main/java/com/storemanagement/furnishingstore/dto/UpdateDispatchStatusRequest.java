package com.storemanagement.furnishingstore.dto;

import java.time.LocalDate;
import lombok.Data;

@Data
public class UpdateDispatchStatusRequest {
    public String status;
    public LocalDate expectedDelivery; // optional override
}
