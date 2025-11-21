package com.storemanagement.furnishingstore.repository;

import com.storemanagement.furnishingstore.model.Staff;
import com.storemanagement.furnishingstore.model.StaffRole;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StaffRepository extends JpaRepository<Staff, Long> {

    List<Staff> findByRole(StaffRole role);
}
