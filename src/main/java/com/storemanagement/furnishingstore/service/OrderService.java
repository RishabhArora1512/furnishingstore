package com.storemanagement.furnishingstore.service;

import com.storemanagement.furnishingstore.dto.CreateMeasurementRequest;
import com.storemanagement.furnishingstore.dto.CreateOrderRequest;
import com.storemanagement.furnishingstore.dto.UpdateOrderRequest;
import com.storemanagement.furnishingstore.model.*;
import com.storemanagement.furnishingstore.repository.CustomerRepository;
import com.storemanagement.furnishingstore.repository.OrderRepository;
import com.storemanagement.furnishingstore.repository.StaffRepository;
import java.util.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OrderService {

    private static final Logger log = LoggerFactory.getLogger(OrderService.class);

    private final OrderRepository orders;
    private final CustomerRepository customers;
    private final PaymentService paymentService;
    private final StaffRepository staffRepo;

    public OrderService(OrderRepository orders,
                        CustomerRepository customers,
                        PaymentService paymentService, StaffRepository staffRepo) {
        this.orders = orders;
        this.customers = customers;
        this.paymentService = paymentService;
        this.staffRepo = staffRepo;
    }

    private Long requireStore() {
        return 1L;
    }

    private Orders loadForStore(Long id) {
        Long storeId = requireStore();
        try {
            return orders.findById(id)
                    .filter(order -> order.getStoreId().equals(storeId))
                    .orElseThrow(NotFoundException::new);
        } catch (NotFoundException e) {
            throw new RuntimeException(e);
        }
    }


    @Transactional
    public Orders create(CreateOrderRequest req) {
        Customer c = null;
        try {
            c = customers.findById(req.customerId)
                    .orElseThrow(NotFoundException::new);
        } catch (NotFoundException e) {
            throw new RuntimeException(e);
        }

        Orders o = new Orders();
        o.setCustomerId(c.getId());
        o.setStoreId(requireStore());
        o.setProductId(req.productId);
        o.setQuantity(req.quantity != null ? req.quantity : 1);
        o.setColorReference(req.colorReference);
        o.setFabricMaterial(req.fabricMaterial);
        o.setDeliveryAddress(req.deliveryAddress);
        o.setMeasurementStaffId(req.measurementStaffId);
        o.setExpectedDeliveryDate(req.expectedDeliveryDate);
        o.setStatus(OrderStatus.CREATED);

        log.info("Creating order for customer {} product {}", c.getId(), req.productId);

        Orders saved = orders.save(o);

        if (req.advancePayment != null) {
            var ap = req.advancePayment;
            paymentService.record(saved.getId(), ap.amount, "ADVANCE",
                    ap.idempotencyKey, ap.processedBy);
        }

        return saved;
    }


    @Transactional
    public Orders updateStatus(Long orderId, OrderStatus state) {
        Orders o = orders.findById(orderId).orElseThrow();
        o.setStatus(state);
        return orders.save(o);
    }

    @Transactional(readOnly = true)
    public Orders getById(Long id) {
        return loadForStore(id);
    }

    @Transactional(readOnly = true)
    public List<Orders> list(OrderStatus status, Long customerId) {
        Long storeId = requireStore();

        if (status != null && customerId != null) {
            return orders.findByStoreIdAndStatusAndCustomerId(storeId, status, customerId);
        } else if (status != null) {
            return orders.findByStoreIdAndStatus(storeId, status);
        } else if (customerId != null) {
            return orders.findByStoreIdAndCustomerId(storeId, customerId);
        } else {
            return orders.findByStoreId(storeId);
        }
    }

    @Transactional
    public Orders update(Long id, UpdateOrderRequest req) {
        Long storeId = requireStore();
        Orders o = loadForStore(id);

        if (req.customerId != null && !req.customerId.equals(o.getCustomerId())) {
            customers.findById(req.customerId)
                    .filter(c -> storeId.equals(c.getStoreId()));
//                    .orElseThrow(() -> new AccessDeniedException("Customer does not belong to store " + storeId));
            o.setCustomerId(req.customerId);
        }

        if (req.productId != null) {
            o.setProductId(req.productId);
        }
        if (req.quantity != null) {
            o.setQuantity(req.quantity);
        }
        if (req.colorReference != null) {
            o.setColorReference(req.colorReference);
        }
        if (req.fabricMaterial != null) {
            o.setFabricMaterial(req.fabricMaterial);
        }
        if (req.deliveryAddress != null) {
            o.setDeliveryAddress(req.deliveryAddress);
        }
        if (req.measurementStaffId != null) {
            o.setMeasurementStaffId(req.measurementStaffId);
        }
        if (req.assignedTailorId != null) {
            o.setAssignedTailorId(req.assignedTailorId);
        }
        if (req.assignedMistriId != null) {
            o.setAssignedMistriId(req.assignedMistriId);
        }
        if (req.expectedDeliveryDate != null) {
            o.setExpectedDeliveryDate(req.expectedDeliveryDate);
        }
        if (req.totalEstimate != null) {
            o.setTotalEstimate(req.totalEstimate);
        }

        return orders.save(o);
    }

    @Transactional
    public void delete(Long id) {
        Orders o = loadForStore(id);
        orders.delete(o);
    }

    @Transactional
    public Orders saveMeasurement(Long orderId, CreateMeasurementRequest req) {
        Orders o = loadForStore(orderId);
        o.setStatus(OrderStatus.MEASURED);
        log.info("Order {} marked MEASURED", orderId);
        return orders.save(o);
    }

    @Transactional
    public Orders assignTailor(Long orderId, Long tailorId) {
        Orders o = loadForStore(orderId);
        o.setAssignedTailorId(tailorId);
        o.setStatus(OrderStatus.TAILOR_ASSIGNED);
        log.info("Assigned tailor {} to order {}", tailorId, orderId);
        return orders.save(o);
    }

    @Transactional
    public Orders assignMistri(Long orderId, Long staffId) {
        Orders order = orders.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found: " + orderId));

        Staff staff = staffRepo.findById(staffId)
                .orElseThrow(() -> new RuntimeException("Staff not found: " + staffId));

        if (staff.getRole() != StaffRole.MISTRI) {
            throw new RuntimeException("Staff " + staffId + " is not a MISTRI");
        }

        order.setAssignedMistriId(staffId);
        staff.setTasks((staff.getTasks() == null ? 0 : staff.getTasks()) + 1);

        return orders.save(order);
    }

    @Transactional
    public Orders markReadyForFitting(Long orderId) {
        Orders o = loadForStore(orderId);
        o.setStatus(OrderStatus.READY_FOR_FITTING);
        log.info("Order {} marked READY_FOR_FITTING", orderId);
        return orders.save(o);
    }

    @Transactional
    public Orders markFittingCompleted(Long orderId) {
        Orders o = loadForStore(orderId);
        o.setStatus(OrderStatus.FITTED);
        log.info("Order {} marked FITTED", orderId);
        return orders.save(o);
    }
}
