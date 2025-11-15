package com.storemanagement.furnishingstore.controller;

import com.storemanagement.furnishingstore.dto.CreateMeasurementRequest;
import com.storemanagement.furnishingstore.model.Measurement;
import com.storemanagement.furnishingstore.service.MeasurementService;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/measurements")
public class MeasurementController {

    private final MeasurementService service;

    public MeasurementController(MeasurementService service) {
        this.service = service;
    }

    // CREATE - called by "Save Measurement" on Add Measurement tab
    @PostMapping
    public ResponseEntity<Measurement> create(@RequestBody CreateMeasurementRequest req) {
        Measurement saved = service.create(req);
        return ResponseEntity.status(201).body(saved);
    }

    // GET - list; if orderId is given, filter, else return all for store
    @GetMapping
    public ResponseEntity<List<Measurement>> list(
            @RequestParam(required = false) Long orderId) {

        List<Measurement> list = (orderId != null)
                ? service.listByOrder(orderId)
                : service.listAllForStore();

        return ResponseEntity.ok(list);
    }

    // UPDATE - edit an existing measurement
    @PutMapping("/{id}")
    public ResponseEntity<Measurement> update(@PathVariable Long id,
                                              @RequestBody CreateMeasurementRequest req) {
        Measurement updated = service.update(id, req);
        return ResponseEntity.ok(updated);
    }

    // DELETE - remove a measurement
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
