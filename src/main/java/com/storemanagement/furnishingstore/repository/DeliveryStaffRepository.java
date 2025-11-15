package com.storemanagement.furnishingstore.repository;

import com.storemanagement.furnishingstore.model.DeliveryStaff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeliveryStaffRepository extends JpaRepository<DeliveryStaff, Long> {

    List<DeliveryStaff> findByStoreId(Long storeId);
}
