package com.storemanagement.furnishingstore.dto;


import lombok.Data;

@Data
public class TailorStaffResponse {
    public Long id;
    public Long storeId;
    public String name;
    public String code;
    public String specialty;
    public Integer experienceYears;
    public String phone;
    public Double rating;
    public Boolean available;
}