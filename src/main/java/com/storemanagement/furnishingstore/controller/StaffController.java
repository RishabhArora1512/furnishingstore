package com.storemanagement.furnishingstore.controller;

import com.storemanagement.furnishingstore.dto.CreateStaffRequest;
import com.storemanagement.furnishingstore.dto.StaffResponse;
import com.storemanagement.furnishingstore.service.StaffService;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/staff")
public class StaffController {

    private final StaffService service;

    public StaffController(StaffService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<StaffResponse> create(@RequestBody CreateStaffRequest req) {
        return ResponseEntity.status(201).body(service.create(req));
    }

    @GetMapping
    public ResponseEntity<List<StaffResponse>> list() {
        return ResponseEntity.ok(service.list());
    }

    @GetMapping("/{id}")
    public ResponseEntity<StaffResponse> get(@PathVariable Long id) {
        return ResponseEntity.ok(service.get(id));
    }
}
