package com.storemanagement.furnishingstore.repository;

import com.storemanagement.furnishingstore.model.TailorAssignment;
import com.storemanagement.furnishingstore.model.TailorAssignmentStatus;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TailorAssignmentRepository extends JpaRepository<TailorAssignment, Long> {

    @Query("""
            SELECT a FROM TailorAssignment a
            WHERE (:status IS NULL OR a.status = :status)
              AND (:tailorId IS NULL OR a.tailorId = :tailorId)
              AND (:orderId IS NULL OR a.orderId = :orderId)
           """)
    List<TailorAssignment> filter(TailorAssignmentStatus status, Long tailorId, Long orderId);

    long countByTailorIdAndStatus(Long tailorId, TailorAssignmentStatus status);

    long countByStatus(TailorAssignmentStatus status);
}
