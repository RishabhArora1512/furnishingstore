package com.storemanagement.furnishingstore.repository;

import com.storemanagement.furnishingstore.model.DeliveryAssignment;
import com.storemanagement.furnishingstore.model.DeliveryStatus;
import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeliveryAssignmentRepository extends JpaRepository<DeliveryAssignment, Long> {

    List<DeliveryAssignment> findByStoreId(Long storeId);

    List<DeliveryAssignment> findByStoreIdAndStatus(Long storeId, DeliveryStatus status);

    List<DeliveryAssignment> findByStoreIdAndStaffId(Long storeId, Long staffId);

    List<DeliveryAssignment> findByStoreIdAndDeliveryDate(Long storeId, LocalDate date);

    long countByStoreIdAndStaffIdAndStatusIn(Long storeId, Long staffId,
                                             Collection<DeliveryStatus> statuses);
}
