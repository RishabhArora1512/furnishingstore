package com.storemanagement.furnishingstore.service;

import com.storemanagement.furnishingstore.dto.TailorStaffRequest;
import com.storemanagement.furnishingstore.dto.TailorStaffResponse;
import com.storemanagement.furnishingstore.dto.TailorStatsResponse;
import com.storemanagement.furnishingstore.model.TailorStaff;
import com.storemanagement.furnishingstore.model.TailorAssignmentStatus;
import com.storemanagement.furnishingstore.repository.TailorStaffRepository;
import com.storemanagement.furnishingstore.repository.TailorAssignmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TailorStaffService {

    private final TailorStaffRepository repo;
    private final TailorAssignmentRepository assignmentRepo;

    public TailorStaffService(TailorStaffRepository repo,
                              TailorAssignmentRepository assignmentRepo) {
        this.repo = repo;
        this.assignmentRepo = assignmentRepo;
    }

    public TailorStaffResponse create(TailorStaffRequest req) {
        TailorStaff t = new TailorStaff();
        t.setStoreId(req.getStoreId());
        t.setName(req.getName());
        t.setCode(req.getCode());
        t.setSpecialty(req.getSpecialty());
        t.setExperienceYears(req.getExperienceYears());
        t.setPhone(req.getPhone());
        t.setRating(req.getRating());
        t.setAvailable(req.getAvailable());

        repo.save(t);
        return toResponse(t);
    }

    public TailorStaffResponse get(Long id) {
        return repo.findById(id).map(this::toResponse)
                .orElseThrow(() -> new RuntimeException("Tailor not found"));
    }

    public List<TailorStaffResponse> list(String q) {
        List<TailorStaff> all;

        if (q == null || q.isBlank()) {
            all = repo.findAll();
        } else {
            q = "%" + q.toLowerCase() + "%";
            all = repo.search(q);
        }

        return all.stream().map(this::toResponse).collect(Collectors.toList());
    }

    public TailorStaffResponse update(Long id, TailorStaffRequest req) {
        TailorStaff t = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Tailor not found"));

        t.setName(req.getName());
        t.setCode(req.getCode());
        t.setSpecialty(req.getSpecialty());
        t.setExperienceYears(req.getExperienceYears());
        t.setPhone(req.getPhone());
        t.setRating(req.getRating());
        t.setAvailable(req.getAvailable());
        t.setStoreId(req.getStoreId());

        repo.save(t);
        return toResponse(t);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

    public List<TailorStatsResponse> stats() {
        return repo.findAll().stream().map(t -> {
            TailorStatsResponse r = new TailorStatsResponse();
            r.setTailorId(t.getId());
            r.setName(t.getName());
            r.setCode(t.getCode());
            r.setSpecialty(t.getSpecialty());
            r.setExperienceYears(t.getExperienceYears());
            r.setRating(t.getRating());
            r.setAvailable(t.getAvailable());

            r.setActiveOrders(
                    assignmentRepo.countByTailorIdAndStatus(t.getId(), TailorAssignmentStatus.IN_PROGRESS)
            );

            r.setCompletedOrders(
                    assignmentRepo.countByTailorIdAndStatus(t.getId(), TailorAssignmentStatus.COMPLETED)
            );

            return r;
        }).collect(Collectors.toList());
    }

    private TailorStaffResponse toResponse(TailorStaff t) {
        TailorStaffResponse r = new TailorStaffResponse();
        r.setId(t.getId());
        r.setStoreId(t.getStoreId());
        r.setName(t.getName());
        r.setCode(t.getCode());
        r.setSpecialty(t.getSpecialty());
        r.setExperienceYears(t.getExperienceYears());
        r.setPhone(t.getPhone());
        r.setRating(t.getRating());
        r.setAvailable(t.getAvailable());
        return r;
    }
}
