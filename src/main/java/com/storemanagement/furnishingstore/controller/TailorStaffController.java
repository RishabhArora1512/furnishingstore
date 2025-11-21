package com.storemanagement.furnishingstore.controller;

import com.storemanagement.furnishingstore.dto.TailorStaffRequest;
import com.storemanagement.furnishingstore.dto.TailorStaffResponse;
import com.storemanagement.furnishingstore.dto.TailorStatsResponse;
import com.storemanagement.furnishingstore.service.TailorStaffService;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/tailors")
public class TailorStaffController {

    private final TailorStaffService service;

    public TailorStaffController(TailorStaffService service) {
        this.service = service;
    }

    // Create tailor (for Tailor List -> Add Tailor form later)
    @PostMapping
    public ResponseEntity<TailorStaffResponse> create(@RequestBody TailorStaffRequest req) {
        return ResponseEntity.status(201).body(service.create(req));
    }

    // All Tailors table (with optional search by name / code / specialty)
    @GetMapping
    public ResponseEntity<List<TailorStaffResponse>> list(
            @RequestParam(required = false, name = "q") String query) {
        return ResponseEntity.ok(service.list(query));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TailorStaffResponse> get(@PathVariable Long id) {
        return ResponseEntity.ok(service.get(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TailorStaffResponse> update(@PathVariable Long id,
                                                      @RequestBody TailorStaffRequest req) {
        return ResponseEntity.ok(service.update(id, req));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    // Cards at the top: experience, active orders, completed, rating, availability
    @GetMapping("/stats")
    public ResponseEntity<List<TailorStatsResponse>> stats() {
        return ResponseEntity.ok(service.stats());
    }
}
