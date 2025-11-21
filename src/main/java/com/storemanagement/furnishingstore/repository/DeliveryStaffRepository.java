package com.storemanagement.furnishingstore.repository;

import com.storemanagement.furnishingstore.model.DeliveryStaff;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeliveryStaffRepository extends JpaRepository<DeliveryStaff, Long> {

    List<DeliveryStaff> findByStoreId(Long storeId);
}
