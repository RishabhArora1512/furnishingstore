package com.storemanagement.furnishingstore.controller;

import com.storemanagement.furnishingstore.dto.VendorRequest;
import com.storemanagement.furnishingstore.dto.VendorResponse;
import com.storemanagement.furnishingstore.service.VendorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/vendors")
public class VendorController {

    private final VendorService service;

    public VendorController(VendorService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<VendorResponse> create(@RequestBody VendorRequest req) {
        return ResponseEntity.status(201).body(service.create(req));
    }

    @GetMapping
    public ResponseEntity<List<VendorResponse>> list(
            @RequestParam(required = false, name = "q") String query) {
        return ResponseEntity.ok(service.list(query));
    }

    @GetMapping("/{id}")
    public ResponseEntity<VendorResponse> get(@PathVariable Long id) {
        return ResponseEntity.ok(service.get(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<VendorResponse> update(@PathVariable Long id,
                                                 @RequestBody VendorRequest req) {
        return ResponseEntity.ok(service.update(id, req));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
