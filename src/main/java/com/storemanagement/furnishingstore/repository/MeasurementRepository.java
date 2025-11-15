package com.storemanagement.furnishingstore.repository;

import com.storemanagement.furnishingstore.model.Measurement;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MeasurementRepository extends JpaRepository<Measurement, Long> {

    List<Measurement> findByStoreIdAndOrderId(Long storeId, Long orderId);

    List<Measurement> findByStoreId(Long storeId);   // NEW: get all for store
}
