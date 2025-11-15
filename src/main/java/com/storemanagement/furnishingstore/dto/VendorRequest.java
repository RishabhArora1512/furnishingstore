package com.storemanagement.furnishingstore.dto;

import lombok.Data;

@Data
public class VendorRequest {
    public String name;
    public String contact;
    public String phone;
    public String email;
    public String address;
}