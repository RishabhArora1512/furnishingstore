package com.storemanagement.furnishingstore.dto;

import lombok.Data;

@Data
public class VendorResponse {
    public Long id;
    public String name;
    public String contact;
    public String phone;
    public String email;
    public String address;
}
