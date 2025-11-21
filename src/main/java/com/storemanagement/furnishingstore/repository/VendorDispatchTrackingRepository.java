package com.storemanagement.furnishingstore.repository;

import com.storemanagement.furnishingstore.model.VendorDispatchTracking;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VendorDispatchTrackingRepository extends JpaRepository<VendorDispatchTracking, Long> {

    List<VendorDispatchTracking> findByDispatchIdOrderByEventTimeAsc(Long dispatchId);
}
