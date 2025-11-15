package com.storemanagement.furnishingstore.controller;

import com.storemanagement.furnishingstore.dto.DeliveryStaffRequest;
import com.storemanagement.furnishingstore.dto.DeliveryStaffResponse;
import com.storemanagement.furnishingstore.dto.DeliveryStaffSummaryResponse;
import com.storemanagement.furnishingstore.service.DeliveryStaffService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/delivery-staff")
public class DeliveryStaffController {

    private final DeliveryStaffService service;

    public DeliveryStaffController(DeliveryStaffService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<DeliveryStaffResponse> create(@RequestBody DeliveryStaffRequest req) {
        return ResponseEntity.status(201).body(service.create(req));
    }

    @GetMapping
    public ResponseEntity<List<DeliveryStaffResponse>> list() {
        return ResponseEntity.ok(service.list());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DeliveryStaffResponse> get(@PathVariable Long id) {
        return ResponseEntity.ok(service.get(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DeliveryStaffResponse> update(@PathVariable Long id,
                                                        @RequestBody DeliveryStaffRequest req) {
        return ResponseEntity.ok(service.update(id, req));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    // cards at top of "Delivery Status" tab
    @GetMapping("/summary")
    public ResponseEntity<List<DeliveryStaffSummaryResponse>> summary() {
        return ResponseEntity.ok(service.getSummaries());
    }
}
