package com.storemanagement.furnishingstore.service;

import com.storemanagement.furnishingstore.model.OrderStatus;
import com.storemanagement.furnishingstore.model.Orders;
import com.storemanagement.furnishingstore.model.Payment;
import com.storemanagement.furnishingstore.repository.OrderRepository;
import com.storemanagement.furnishingstore.repository.PaymentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PaymentService {
    private final PaymentRepository payments;
    private final OrderRepository orders;


    public PaymentService(PaymentRepository payments, OrderRepository orders) {
        this.payments = payments;
        this.orders = orders;
    }


    @Transactional
    public Payment record(Long orderId, double amount, String type, String idemp, Long processedBy) {
        return payments.findByIdempotencyKey(idemp).orElseGet(() -> {
            Payment p = new Payment();
            p.setOrderId(orderId);
            p.setAmount(amount);
            p.setType(type);
            p.setStatus("SUCCESS");
            p.setIdempotencyKey(idemp);
            p.setProcessedBy(processedBy);
            Payment saved = payments.save(p);


            Orders o = orders.findById(orderId).orElseThrow();
            if ("ADVANCE".equalsIgnoreCase(type)) {
                o.setAdvanceAmount((o.getAdvanceAmount() == null ? 0.0 : o.getAdvanceAmount()) + amount);
                o.setStatus(OrderStatus.ADVANCE_PAID);
            } else {
                o.setFinalAmount(amount);
                o.setStatus(OrderStatus.COMPLETED);
            }
            orders.save(o);


            return saved;
        });
    }
}