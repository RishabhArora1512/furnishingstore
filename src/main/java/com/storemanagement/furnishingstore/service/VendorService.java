package com.storemanagement.furnishingstore.service;

import com.storemanagement.furnishingstore.dto.VendorRequest;
import com.storemanagement.furnishingstore.dto.VendorResponse;
import com.storemanagement.furnishingstore.repository.VendorRepository;
import com.storemanagement.furnishingstore.model.*;
import org.springframework.data.crossstore.ChangeSetPersister;
//import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class VendorService {

    private final VendorRepository vendors;

    public VendorService(VendorRepository vendors) {
        this.vendors = vendors;
    }

    private Long requireStore() {
        return 1L;
    }

    private Vendor loadForStore(Long id) {
        Long storeId = requireStore();
        Vendor v = null;
        try {
            v = vendors.findById(id)
                    .orElseThrow(ChangeSetPersister.NotFoundException::new);
        } catch (ChangeSetPersister.NotFoundException e) {
            throw new RuntimeException(e);
        }
//        if (!storeId.equals(v.getStoreId())) {
//            throw new AccessDeniedException("Vendor does not belong to store " + storeId);
//        }
        return v;
    }

    @Transactional
    public VendorResponse create(VendorRequest req) {
        Long storeId = requireStore();
        Vendor v = new Vendor();
        v.setStoreId(storeId);
        v.setName(req.getName());
        v.setContact(req.getContact());
        v.setPhone(req.getPhone());
        v.setEmail(req.getEmail());
        v.setAddress(req.getAddress());
        Vendor saved = vendors.save(v);
        return toResponse(saved);
    }

    @Transactional(readOnly = true)
    public List<VendorResponse> list(String q) {
        Long storeId = requireStore();
        List<Vendor> list = (q == null || q.isBlank())
                ? vendors.findByStoreId(storeId)
                : vendors.findByStoreIdAndNameContainingIgnoreCase(storeId, q);
        return list.stream().map(this::toResponse).toList();
    }

    @Transactional(readOnly = true)
    public VendorResponse get(Long id) {
        return toResponse(loadForStore(id));
    }

    @Transactional
    public VendorResponse update(Long id, VendorRequest req) {
        Vendor v = loadForStore(id);
        if (req.getName() != null) v.setName(req.getName());
        if (req.getContact() != null) v.setContact(req.getContact());
        if (req.getPhone() != null) v.setPhone(req.getPhone());
        if (req.getEmail() != null) v.setEmail(req.getEmail());
        if (req.getAddress() != null) v.setAddress(req.getAddress());
        return toResponse(vendors.save(v));
    }

    @Transactional
    public void delete(Long id) {
        Vendor v = loadForStore(id);
        vendors.delete(v);
    }

    private VendorResponse toResponse(Vendor v) {
        VendorResponse r = new VendorResponse();
        r.setId(v.getId());
        r.setName(v.getName());
        r.contact = v.getContact();
        r.phone = v.getPhone();
        r.email = v.getEmail();
        r.address = v.getAddress();
        return r;
    }
}
