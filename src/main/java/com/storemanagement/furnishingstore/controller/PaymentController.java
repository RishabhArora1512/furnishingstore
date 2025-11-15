package com.storemanagement.furnishingstore.controller;

import com.storemanagement.furnishingstore.dto.PaymentRequest;
import com.storemanagement.furnishingstore.model.Payment;
import com.storemanagement.furnishingstore.service.PaymentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/payments")
public class PaymentController {

    private final PaymentService service;

    public PaymentController(PaymentService service) { this.service = service; }

    @PostMapping("/{orderId}")
    public ResponseEntity<Payment> pay(@PathVariable Long orderId, @RequestBody PaymentRequest req) {
        return ResponseEntity.ok(service.record(orderId, req.getAmount(), req.getType(), req.getIdempotencyKey(), req.getProcessedBy()));
    }
}