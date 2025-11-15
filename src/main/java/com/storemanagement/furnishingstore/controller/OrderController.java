package com.storemanagement.furnishingstore.controller;

import com.storemanagement.furnishingstore.dto.AssignRequest;
import com.storemanagement.furnishingstore.dto.CreateOrderRequest;
import com.storemanagement.furnishingstore.dto.UpdateOrderRequest;
import com.storemanagement.furnishingstore.model.OrderStatus;
import com.storemanagement.furnishingstore.model.Orders;
import com.storemanagement.furnishingstore.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {
    private final OrderService service;

    public OrderController(OrderService service) { this.service = service; }

    @PostMapping
    public ResponseEntity<Orders> create(@RequestBody CreateOrderRequest req) {
        Orders created = service.create(req);
        return ResponseEntity.status(201).body(created);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Orders> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<Orders>> list(
            @RequestParam(required = false) OrderStatus status,
            @RequestParam(required = false) Long customerId) {
        return ResponseEntity.ok(service.list(status, customerId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Orders> update(@PathVariable Long id,
                                         @RequestBody UpdateOrderRequest req) {
        return ResponseEntity.ok(service.update(id, req));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/assign-mistri")
    public ResponseEntity<Orders> assignMistri(@PathVariable Long id,
                                               @RequestBody AssignRequest req) {
        Orders updated = service.assignMistri(id, req.getUserId());
        return ResponseEntity.ok(updated);
    }

    @PostMapping("/{id}/assign-tailor")
    public ResponseEntity<Orders> assignTailor(@PathVariable Long id,
                                               @RequestBody AssignRequest req) {
        Orders updated = service.assignTailor(id, req.getUserId());
        return ResponseEntity.ok(updated);
    }
}