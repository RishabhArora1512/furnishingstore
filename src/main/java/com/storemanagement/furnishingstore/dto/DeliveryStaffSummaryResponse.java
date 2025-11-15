package com.storemanagement.furnishingstore.dto;

import lombok.Data;

@Data
public class DeliveryStaffSummaryResponse {
    public Long id;
    public String name;
    public String area;
    public String vehicleInfo;
    public String phone;
    public Double rating;
    public Boolean active;

    public long activeDeliveries;    // Active
    public long completedDeliveries; // Completed
}
