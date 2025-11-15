package com.storemanagement.furnishingstore.dto;

import lombok.Data;

@Data
public class CreateCustomerRequest {
    private Long storeId;
    private String name;
    private String phone;
    private String email;
    private String address;
    private String meta;
}
