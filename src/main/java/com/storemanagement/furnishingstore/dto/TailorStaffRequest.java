package com.storemanagement.furnishingstore.dto;

import lombok.Data;

@Data
public class TailorStaffRequest {
    public Long storeId;
    public String name;
    public String code;              // TAILOR-001
    public String specialty;         // Curtains & Drapes
    public Integer experienceYears;  // 8
    public String phone;
    public Double rating;           // 4.8
    public Boolean available;       // true = Available, false = Busy
}
