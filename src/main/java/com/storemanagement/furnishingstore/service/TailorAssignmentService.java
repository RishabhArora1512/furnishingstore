package com.storemanagement.furnishingstore.service;

import com.storemanagement.furnishingstore.dto.*;
import com.storemanagement.furnishingstore.model.*;
import com.storemanagement.furnishingstore.repository.*;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TailorAssignmentService {

    private final TailorAssignmentRepository repo;
    private final TailorStaffRepository tailorRepo;
    private final OrderRepository orderRepo;

    public TailorAssignmentService(TailorAssignmentRepository repo,
                                   TailorStaffRepository tailorRepo,
                                   OrderRepository orderRepo) {
        this.repo = repo;
        this.tailorRepo = tailorRepo;
        this.orderRepo = orderRepo;
    }

    public TailorAssignmentResponse create(CreateTailorAssignmentRequest req) {

        // Validate tailor
        TailorStaff tailor = tailorRepo.findById(req.getTailorId())
                .orElseThrow(() -> new RuntimeException("Tailor not found"));

        // Validate order
        Orders order = orderRepo.findById(req.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found"));

        TailorAssignment a = new TailorAssignment();
        a.setStoreId(req.getStoreId());
        a.setOrderId(req.getOrderId());
        a.setTailorId(req.getTailorId());
        a.setAssignedDate(LocalDate.now());
        a.setExpectedCompletionDate(req.getExpectedCompletionDate());
        a.setStatus(TailorAssignmentStatus.ASSIGNED);
        a.setNotes(req.getNotes());
        a.setProgressNote(null);

        repo.save(a);

        return toResponse(a, order, tailor);
    }

    public TailorAssignmentResponse get(Long id) {
        TailorAssignment a = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Assignment not found"));

        Orders o = orderRepo.findById(a.getOrderId()).orElse(null);
        TailorStaff t = tailorRepo.findById(a.getTailorId()).orElse(null);

        return toResponse(a, o, t);
    }

    public List<TailorAssignmentResponse> list(
            TailorAssignmentStatus status,
            Long tailorId,
            Long orderId) {

        List<TailorAssignment> list = repo.filter(status, tailorId, orderId);

        return list.stream().map(a -> {
            Orders o = orderRepo.findById(a.getOrderId()).orElse(null);
            TailorStaff t = tailorRepo.findById(a.getTailorId()).orElse(null);
            return toResponse(a, o, t);
        }).collect(Collectors.toList());
    }

    public TailorAssignmentResponse update(Long id, UpdateTailorAssignmentRequest req) {
        TailorAssignment a = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Assignment not found"));

        a.setTailorId(req.getTailorId());
        a.setExpectedCompletionDate(req.getExpectedCompletionDate());
        a.setNotes(req.getNotes());

        repo.save(a);

        Orders o = orderRepo.findById(a.getOrderId()).orElse(null);
        TailorStaff t = tailorRepo.findById(a.getTailorId()).orElse(null);

        return toResponse(a, o, t);
    }

    public TailorAssignmentResponse updateStatus(Long id, UpdateTailorAssignmentStatusRequest req) {
        TailorAssignment a = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Assignment not found"));

        a.setStatus(req.getStatus());
        a.setProgressNote(req.getProgressNote());

        if (req.getStatus() == TailorAssignmentStatus.COMPLETED) {
            a.setCompletedDate(req.getCompletedDate() != null ?
                    req.getCompletedDate() : LocalDate.now());
        }

        repo.save(a);

        Orders o = orderRepo.findById(a.getOrderId()).orElse(null);
        TailorStaff t = tailorRepo.findById(a.getTailorId()).orElse(null);

        return toResponse(a, o, t);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

    public TailorAssignmentSummaryResponse summary() {
        TailorAssignmentSummaryResponse r = new TailorAssignmentSummaryResponse();

        r.setTotalAssignments(repo.count());
        r.setInProgress(repo.countByStatus(TailorAssignmentStatus.IN_PROGRESS));
        r.setCompleted(repo.countByStatus(TailorAssignmentStatus.COMPLETED));
        r.setDelayed(repo.countByStatus(TailorAssignmentStatus.DELAYED));

        return r;
    }

    private TailorAssignmentResponse toResponse(
            TailorAssignment a,
            Orders order,
            TailorStaff tailor) {

        TailorAssignmentResponse r = new TailorAssignmentResponse();

        r.setId(a.getId());
        r.setStoreId(a.getStoreId());
        r.setOrderId(a.getOrderId());
        r.setTailorId(a.getTailorId());

        if (order != null) {
            r.setOrderCode(order.getOrderCode());
            //TODO: fix this
            r.setCustomerName("Rish");
            r.setProductSummary(order.getOrderCode());
        }

        if (tailor != null) {
            r.setTailorName(tailor.getName());
            r.setTailorCode(tailor.getCode());
        }

        r.setStatus(a.getStatus());
        r.setAssignedDate(a.getAssignedDate());
        r.setExpectedCompletionDate(a.getExpectedCompletionDate());
        r.setCompletedDate(a.getCompletedDate());
        r.setNotes(a.getNotes());
        r.setProgressNote(a.getProgressNote());

        return r;
    }
}
