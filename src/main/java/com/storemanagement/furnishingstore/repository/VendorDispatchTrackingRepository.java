package com.storemanagement.furnishingstore.repository;

import com.storemanagement.furnishingstore.model.VendorDispatchTracking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VendorDispatchTrackingRepository extends JpaRepository<VendorDispatchTracking, Long> {

    List<VendorDispatchTracking> findByDispatchIdOrderByEventTimeAsc(Long dispatchId);
}
