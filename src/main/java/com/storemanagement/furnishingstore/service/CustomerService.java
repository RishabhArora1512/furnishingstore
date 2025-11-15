package com.storemanagement.furnishingstore.service;

import com.storemanagement.furnishingstore.dto.CreateCustomerRequest;
import com.storemanagement.furnishingstore.model.Customer;
import com.storemanagement.furnishingstore.repository.CustomerRepository;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {
    private final CustomerRepository customerRepository;

    public CustomerService(CustomerRepository cutomerRepo) { this.customerRepository = cutomerRepo; }

    public Customer create(CreateCustomerRequest createCustomerRequest) {
        Customer c = new Customer();
        c.setName(createCustomerRequest.getName());
        c.setPhone(createCustomerRequest.getPhone());
        c.setEmail(createCustomerRequest.getEmail());
        c.setAddress(createCustomerRequest.getAddress());
        c.setStoreId(createCustomerRequest.getStoreId());
        c.setMeta(createCustomerRequest.getMeta());
        return customerRepository.save(c);
    }
}