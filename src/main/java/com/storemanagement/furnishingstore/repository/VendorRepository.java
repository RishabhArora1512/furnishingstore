package com.storemanagement.furnishingstore.repository;

import com.storemanagement.furnishingstore.model.Vendor;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VendorRepository extends JpaRepository<Vendor, Long> {

    List<Vendor> findByStoreId(Long storeId);

    List<Vendor> findByStoreIdAndNameContainingIgnoreCase(Long storeId, String name);
}
