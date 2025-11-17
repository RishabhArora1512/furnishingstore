package com.storemanagement.furnishingstore.dto;

import lombok.Data;

@Data
public class TailorStatsResponse {
    public Long tailorId;
    public String name;
    public String code;
    public String specialty;
    public Integer experienceYears;
    public Double rating;
    public Boolean available;

    public long activeOrders;     // for card + "3 active"
    public long completedOrders;  // "145 completed"
}
