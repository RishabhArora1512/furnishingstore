package com.storemanagement.furnishingstore.controller;

import com.storemanagement.furnishingstore.dto.*;
import com.storemanagement.furnishingstore.service.DeliveryAssignmentService;
import java.time.LocalDate;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/deliveries")
public class DeliveryAssignmentController {

    private final DeliveryAssignmentService service;

    public DeliveryAssignmentController(DeliveryAssignmentService service) {
        this.service = service;
    }

    // Assign Delivery Staff (modal)
    @PostMapping
    public ResponseEntity<DeliveryAssignmentResponse> create(
            @RequestBody CreateDeliveryAssignmentRequest req) {
        return ResponseEntity.status(201).body(service.create(req));
    }

    // List deliveries (for left table / filters)
    @GetMapping
    public ResponseEntity<List<DeliveryAssignmentResponse>> list(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) Long staffId,
            @RequestParam(required = false) String date // yyyy-MM-dd
    ) {
        LocalDate d = (date != null) ? LocalDate.parse(date) : null;
        return ResponseEntity.ok(service.list(status, staffId, d));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DeliveryAssignmentResponse> get(@PathVariable Long id) {
        return ResponseEntity.ok(service.get(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DeliveryAssignmentResponse> update(
            @PathVariable Long id,
            @RequestBody UpdateDeliveryAssignmentRequest req) {
        return ResponseEntity.ok(service.update(id, req));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    // Change status: Scheduled → OutForDelivery → Delivered / Failed
    @PostMapping("/{id}/status")
    public ResponseEntity<DeliveryAssignmentResponse> updateStatus(
            @PathVariable Long id,
            @RequestBody UpdateDeliveryStatusRequest req) {
        return ResponseEntity.ok(service.updateStatus(id, req));
    }

    // "Today's Scheduled Deliveries" section
    @GetMapping("/today")
    public ResponseEntity<List<TodayDeliveryItemResponse>> today(
            @RequestParam(required = false) String date // yyyy-MM-dd
    ) {
        LocalDate d = (date != null) ? LocalDate.parse(date) : null;
        return ResponseEntity.ok(service.listToday(d));
    }
}
