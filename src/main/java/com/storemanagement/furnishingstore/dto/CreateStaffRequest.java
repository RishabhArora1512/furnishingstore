package com.storemanagement.furnishingstore.dto;

import com.storemanagement.furnishingstore.model.StaffRole;
import lombok.Data;

@Data
public class CreateStaffRequest {
    public Long storeId;
    public String name;
    public StaffRole role;
    public String phone;
}
