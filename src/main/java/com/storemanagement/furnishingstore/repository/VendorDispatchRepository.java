package com.storemanagement.furnishingstore.repository;

import com.storemanagement.furnishingstore.model.DispatchStatus;
import com.storemanagement.furnishingstore.model.VendorDispatch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface VendorDispatchRepository extends JpaRepository<VendorDispatch, Long> {

    List<VendorDispatch> findByStoreId(Long storeId);

    List<VendorDispatch> findByStoreIdAndStatus(Long storeId, DispatchStatus status);

    List<VendorDispatch> findByStoreIdAndVendorId(Long storeId, Long vendorId);

    List<VendorDispatch> findByStoreIdAndOrderId(Long storeId, Long orderId);

    List<VendorDispatch> findByStoreIdAndStatusAndExpectedDeliveryBefore(
            Long storeId, DispatchStatus status, LocalDate expectedDelivery);
}
