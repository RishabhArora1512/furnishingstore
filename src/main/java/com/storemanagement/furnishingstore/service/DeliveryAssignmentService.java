package com.storemanagement.furnishingstore.service;

import com.storemanagement.furnishingstore.dto.*;
import com.storemanagement.furnishingstore.model.*;
import com.storemanagement.furnishingstore.repository.*;
import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DeliveryAssignmentService {

    private final DeliveryAssignmentRepository assignments;
    private final DeliveryStaffRepository deliveryStaffRepository;
    private final StaffRepository staffRepository;
    private final OrderRepository orderRepo;
    private final CustomerRepository customerRepo;

    public DeliveryAssignmentService(DeliveryAssignmentRepository assignments,
                                     DeliveryStaffRepository deliveryStaffRepository,
                                     OrderRepository orderRepo,
                                     CustomerRepository customerRepo,
                                     StaffRepository staffRepository) {
        this.assignments = assignments;
        this.deliveryStaffRepository = deliveryStaffRepository;
        this.orderRepo = orderRepo;
        this.customerRepo = customerRepo;
        this.staffRepository = staffRepository;
    }

    private Long requireStore() {
        return 1L;
    }

    private DeliveryAssignment loadForStore(Long id) {
        Long storeId = requireStore();
        DeliveryAssignment d = null;
        try {
            d = assignments.findById(id)
                    .orElseThrow(ChangeSetPersister.NotFoundException::new);
        } catch (ChangeSetPersister.NotFoundException e) {
            throw new RuntimeException(e);
        }
//        if (!storeId.equals(d.getStoreId())) {
//            throw new AccessDeniedException("Delivery does not belong to store " + storeId);
//        }
        return d;
    }

    private void validateOrderAndStaff(Long storeId, Long orderId, Long staffId) {
        Orders order = orderRepo.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found: " + orderId));

        if (!order.getStoreId().equals(storeId)) {
            throw new IllegalArgumentException("Order " + orderId + " does not belong to store " + storeId);
        }

        Staff staff = staffRepository.findById(staffId)
                .orElseThrow(() -> new IllegalArgumentException("Staff not found: " + staffId));

        if (!staff.getStoreId().equals(storeId)) {
            throw new IllegalArgumentException("Staff " + staffId + " does not belong to store " + storeId);
        }
    }


    @Transactional
    public DeliveryAssignmentResponse create(CreateDeliveryAssignmentRequest req) {
        Long storeId = requireStore();
        validateOrderAndStaff(storeId, req.orderId, req.staffId);

        Orders order = orderRepo.findById(req.orderId).orElseThrow();
        Long customerId = order.getCustomerId();

        DeliveryAssignment d = new DeliveryAssignment();
        d.setStoreId(storeId);
        d.setOrderId(req.orderId);
        d.setCustomerId(customerId);
        d.setStaffId(req.staffId);
        d.setDeliveryDate(req.deliveryDate);
        d.setTimeSlot(req.timeSlot);
        d.setNotes(req.notes);
        d.setStatus(DeliveryStatus.SCHEDULED);
        d.setCreatedAt(Instant.now());
        d.setUpdatedAt(Instant.now());

        DeliveryAssignment saved = assignments.save(d);

        // optional: also set order status to DELIVERY_SCHEDULED if you have it
        // order.setStatus(OrderStatus.DELIVERY_SCHEDULED);
        // orderRepo.save(order);

        return toResponse(saved);
    }

    @Transactional(readOnly = true)
    public List<DeliveryAssignmentResponse> list(String status, Long staffId, LocalDate date) {
        Long storeId = requireStore();
        List<DeliveryAssignment> base;

        if (date != null) {
            base = assignments.findByStoreIdAndDeliveryDate(storeId, date);
        } else if (status != null) {
            base = assignments.findByStoreIdAndStatus(storeId, DeliveryStatus.valueOf(status));
        } else if (staffId != null) {
            base = assignments.findByStoreIdAndStaffId(storeId, staffId);
        } else {
            base = assignments.findByStoreId(storeId);
        }

        return base.stream().map(this::toResponse).toList();
    }

    @Transactional(readOnly = true)
    public DeliveryAssignmentResponse get(Long id) {
        DeliveryAssignment d = loadForStore(id);
        return toResponse(d);
    }

    @Transactional
    public DeliveryAssignmentResponse update(Long id, UpdateDeliveryAssignmentRequest req) {
        Long storeId = requireStore();
        DeliveryAssignment d = loadForStore(id);

        if (req.staffId != null && !req.staffId.equals(d.getStaffId())) {
            validateOrderAndStaff(storeId, d.getOrderId(), req.staffId);
            d.setStaffId(req.staffId);
        }
        if (req.deliveryDate != null) d.setDeliveryDate(req.deliveryDate);
        if (req.timeSlot != null) d.setTimeSlot(req.timeSlot);
        if (req.notes != null) d.setNotes(req.notes);
        if (req.proofUrl != null) d.setProofUrl(req.proofUrl);

        d.setUpdatedAt(Instant.now());
        return toResponse(assignments.save(d));
    }

    @Transactional
    public void delete(Long id) {
        DeliveryAssignment d = loadForStore(id);
        assignments.delete(d);
    }

    @Transactional
    public DeliveryAssignmentResponse updateStatus(Long id, UpdateDeliveryStatusRequest req) {
        DeliveryAssignment d = loadForStore(id);
        DeliveryStatus newStatus = DeliveryStatus.valueOf(req.status);
        d.setStatus(newStatus);
        if (req.proofUrl != null) {
            d.setProofUrl(req.proofUrl);
        }
        d.setUpdatedAt(Instant.now());
        DeliveryAssignment saved = assignments.save(d);

        // optional: update order status when delivered/cancelled

        return toResponse(saved);
    }

    @Transactional(readOnly = true)
    public List<TodayDeliveryItemResponse> listToday(LocalDate date) {
        Long storeId = requireStore();
        LocalDate d = (date != null) ? date : LocalDate.now();
        List<DeliveryAssignment> list = assignments.findByStoreIdAndDeliveryDate(storeId, d);
        return list.stream().map(this::toTodayResponse).toList();
    }

    private DeliveryAssignmentResponse toResponse(DeliveryAssignment d) {
        DeliveryAssignmentResponse r = new DeliveryAssignmentResponse();
        r.id = d.getId();
        r.orderId = d.getOrderId();
        r.customerId = d.getCustomerId();
        r.deliveryDate = d.getDeliveryDate();
        r.timeSlot = d.getTimeSlot();
        r.notes = d.getNotes();
        r.status = d.getStatus().name();
        r.proofUrl = d.getProofUrl();

        orderRepo.findById(d.getOrderId()).ifPresent(o -> {
            r.orderCode = o.getOrderCode();
            r.deliveryAddress = o.getDeliveryAddress();
        });

        customerRepo.findById(d.getCustomerId()).ifPresent(c -> r.customerName = c.getName());

        deliveryStaffRepository.findById(d.getStaffId()).ifPresent(s -> {
            r.staffId = s.getId();
            r.staffName = s.getName();
        });

        return r;
    }

    private TodayDeliveryItemResponse toTodayResponse(DeliveryAssignment d) {
        TodayDeliveryItemResponse r = new TodayDeliveryItemResponse();
        r.id = d.getId();
        r.orderId = d.getOrderId();
        r.deliveryDate = d.getDeliveryDate();
        r.timeSlot = d.getTimeSlot();
        r.status = d.getStatus().name();

        orderRepo.findById(d.getOrderId()).ifPresent(o -> r.orderCode = o.getOrderCode());
        customerRepo.findById(d.getCustomerId()).ifPresent(c -> r.customerName = c.getName());
        deliveryStaffRepository.findById(d.getStaffId()).ifPresent(s -> {
            r.staffId = s.getId();
            r.staffName = s.getName();
        });

        return r;
    }
}