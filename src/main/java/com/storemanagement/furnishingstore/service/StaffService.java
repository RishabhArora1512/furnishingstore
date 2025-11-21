package com.storemanagement.furnishingstore.service;

import com.storemanagement.furnishingstore.dto.CreateStaffRequest;
import com.storemanagement.furnishingstore.dto.StaffResponse;
import com.storemanagement.furnishingstore.model.Staff;
import com.storemanagement.furnishingstore.repository.StaffRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

@Service
public class StaffService {

    private final StaffRepository repo;

    public StaffService(StaffRepository repo) {
        this.repo = repo;
    }

    public StaffResponse create(CreateStaffRequest req) {
        Staff s = new Staff();
        s.setStoreId(req.getStoreId());
        s.setName(req.getName());
        s.setRole(req.getRole());
        s.setPhone(req.getPhone());

        repo.save(s);
        return toResponse(s);
    }

    public StaffResponse get(Long id) {
        Staff s = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Staff not found: " + id));
        return toResponse(s);
    }

    public List<StaffResponse> list() {
        return repo.findAll()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    private StaffResponse toResponse(Staff s) {
        StaffResponse r = new StaffResponse();
        r.setId(s.getId());
        r.setStoreId(s.getStoreId());
        r.setName(s.getName());
        r.setRole(s.getRole());
        r.setPhone(s.getPhone());
        return r;
    }
}
