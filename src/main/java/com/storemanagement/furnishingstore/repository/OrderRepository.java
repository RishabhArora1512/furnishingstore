package com.storemanagement.furnishingstore.repository;

import com.storemanagement.furnishingstore.model.OrderStatus;
import com.storemanagement.furnishingstore.model.Orders;
import java.time.Instant;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Orders, Long> {

    List<Orders> findByStatusAndCreatedAtBefore(OrderStatus status, Instant createdBefore);

    List<Orders> findByStoreId(Long storeId);

    List<Orders> findByStoreIdAndStatus(Long storeId, OrderStatus status);

    List<Orders> findByStoreIdAndCustomerId(Long storeId, Long customerId);

    List<Orders> findByStoreIdAndStatusAndCustomerId(Long storeId, OrderStatus status, Long customerId);
}