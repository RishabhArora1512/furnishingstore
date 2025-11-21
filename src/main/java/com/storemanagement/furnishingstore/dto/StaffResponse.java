package com.storemanagement.furnishingstore.dto;

import com.storemanagement.furnishingstore.model.StaffRole;
import lombok.Data;

@Data
public class StaffResponse {
    public Long id;
    public Long storeId;
    public String name;
    public StaffRole role;
    public String phone;
}
