package com.storemanagement.furnishingstore.service;

import com.storemanagement.furnishingstore.dto.*;
import com.storemanagement.furnishingstore.model.*;
import com.storemanagement.furnishingstore.repository.*;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

@Service
public class DeliveryStaffService {

    private final DeliveryStaffRepository staffRepo;
    private final DeliveryAssignmentRepository assignmentRepo;

    public DeliveryStaffService(DeliveryStaffRepository staffRepo,
                                DeliveryAssignmentRepository assignmentRepo) {
        this.staffRepo = staffRepo;
        this.assignmentRepo = assignmentRepo;
    }

    private Long requireStore() {
        return 1L;
    }

    private DeliveryStaff loadForStore(Long id) throws ChangeSetPersister.NotFoundException {
        Long storeId = requireStore();
        DeliveryStaff s = staffRepo.findById(id)
                .orElseThrow(ChangeSetPersister.NotFoundException::new);
        if (!storeId.equals(s.getStoreId())) {
            throw new AccessDeniedException("Staff does not belong to store " + storeId);
        }
        return s;
    }

    @Transactional
    public DeliveryStaffResponse create(DeliveryStaffRequest req) {
        Long storeId = requireStore();
        DeliveryStaff s = new DeliveryStaff();
        s.setStoreId(storeId);
        s.setName(req.name);
        s.setArea(req.area);
        s.setVehicleInfo(req.vehicleInfo);
        s.setPhone(req.phone);
        s.setRating(req.rating);
        if (req.active != null) {
            s.setActive(req.active);
        }
        return toResponse(staffRepo.save(s));
    }

    @Transactional(readOnly = true)
    public List<DeliveryStaffResponse> list() {
        Long storeId = requireStore();
        return staffRepo.findByStoreId(storeId).stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public DeliveryStaffResponse get(Long id) {
        try {
            return toResponse(loadForStore(id));
        } catch (ChangeSetPersister.NotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    @Transactional
    public DeliveryStaffResponse update(Long id, DeliveryStaffRequest req) {
        DeliveryStaff s = null;
        try {
            s = loadForStore(id);
        } catch (ChangeSetPersister.NotFoundException e) {
            throw new RuntimeException(e);
        }
        if (req.name != null) s.setName(req.name);
        if (req.area != null) s.setArea(req.area);
        if (req.vehicleInfo != null) s.setVehicleInfo(req.vehicleInfo);
        if (req.phone != null) s.setPhone(req.phone);
        if (req.rating != null) s.setRating(req.rating);
        if (req.active != null) s.setActive(req.active);
        return toResponse(staffRepo.save(s));
    }

    @Transactional
    public void delete(Long id) {
        DeliveryStaff s = null;
        try {
            s = loadForStore(id);
        } catch (ChangeSetPersister.NotFoundException e) {
            throw new RuntimeException(e);
        }
        staffRepo.delete(s);
    }

    @Transactional(readOnly = true)
    public List<DeliveryStaffSummaryResponse> getSummaries() {
        Long storeId = requireStore();
        List<DeliveryStaff> staffList = staffRepo.findByStoreId(storeId);

        return staffList.stream().map(s -> {
            DeliveryStaffSummaryResponse r = new DeliveryStaffSummaryResponse();
            r.id = s.getId();
            r.name = s.getName();
            r.area = s.getArea();
            r.vehicleInfo = s.getVehicleInfo();
            r.phone = s.getPhone();
            r.rating = s.getRating();
            r.active = s.getActive();

            long active = assignmentRepo.countByStoreIdAndStaffIdAndStatusIn(
                    storeId, s.getId(),
                    Set.of(DeliveryStatus.SCHEDULED, DeliveryStatus.OUT_FOR_DELIVERY));

            long completed = assignmentRepo.countByStoreIdAndStaffIdAndStatusIn(
                    storeId, s.getId(),
                    Set.of(DeliveryStatus.DELIVERED));

            r.activeDeliveries = active;
            r.completedDeliveries = completed;
            return r;
        }).toList();
    }

    private DeliveryStaffResponse toResponse(DeliveryStaff s) {
        DeliveryStaffResponse r = new DeliveryStaffResponse();
        r.id = s.getId();
        r.name = s.getName();
        r.area = s.getArea();
        r.vehicleInfo = s.getVehicleInfo();
        r.phone = s.getPhone();
        r.rating = s.getRating();
        r.active = s.getActive();
        return r;
    }
}
