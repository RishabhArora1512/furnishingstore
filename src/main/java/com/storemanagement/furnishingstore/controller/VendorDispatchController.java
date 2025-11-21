package com.storemanagement.furnishingstore.controller;

import com.storemanagement.furnishingstore.dto.*;
import com.storemanagement.furnishingstore.service.*;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/vendor-dispatches")
public class VendorDispatchController {

    private final VendorDispatchService service;

    public VendorDispatchController(VendorDispatchService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<VendorDispatchResponse> create(
            @RequestBody CreateVendorDispatchRequest req) {
        return ResponseEntity.status(201).body(service.create(req));
    }

    @GetMapping
    public ResponseEntity<List<VendorDispatchResponse>> list(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) Long vendorId,
            @RequestParam(required = false) Long orderId) {
        return ResponseEntity.ok(service.list(status, vendorId, orderId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<VendorDispatchResponse> get(@PathVariable Long id) {
        return ResponseEntity.ok(service.getWithTracking(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<VendorDispatchResponse> update(
            @PathVariable Long id,
            @RequestBody UpdateVendorDispatchRequest req) {
        return ResponseEntity.ok(service.update(id, req));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/status")
    public ResponseEntity<VendorDispatchResponse> updateStatus(
            @PathVariable Long id,
            @RequestBody UpdateDispatchStatusRequest req) {
        return ResponseEntity.ok(service.updateStatus(id, req));
    }

    @PostMapping("/{id}/tracking-events")
    public ResponseEntity<TrackingEventResponse> addTracking(
            @PathVariable Long id,
            @RequestBody CreateTrackingEventRequest req) {
        return ResponseEntity.status(201).body(service.addTrackingEvent(id, req));
    }

    @GetMapping("/{id}/tracking-events")
    public ResponseEntity<List<TrackingEventResponse>> listTracking(@PathVariable Long id) {
        return ResponseEntity.ok(service.listTrackingEvents(id));
    }
}
