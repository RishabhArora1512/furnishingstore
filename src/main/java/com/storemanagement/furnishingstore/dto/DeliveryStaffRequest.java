package com.storemanagement.furnishingstore.dto;

import lombok.Data;

@Data
public class DeliveryStaffRequest {
    public String name;
    public String area;
    public String vehicleInfo;
    public String phone;
    public Double rating;
    public Boolean active;
}
