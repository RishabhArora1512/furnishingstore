package com.storemanagement.furnishingstore.controller;

import com.storemanagement.furnishingstore.dto.CreateCustomerRequest;
import com.storemanagement.furnishingstore.model.Customer;
import com.storemanagement.furnishingstore.service.CustomerService;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/customers")
public class CustomerController {
    private final CustomerService service;

    public CustomerController(CustomerService service) { this.service = service; }

    @PostMapping
    public ResponseEntity<Customer> create(@RequestBody CreateCustomerRequest req) {
        return ResponseEntity.ok(service.create(req));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Customer> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<Customer>> list() {
        return ResponseEntity.ok(service.list());
    }

}