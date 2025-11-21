package com.storemanagement.furnishingstore.repository;

import com.storemanagement.furnishingstore.model.TailorStaff;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

@Repository
public interface TailorStaffRepository extends JpaRepository<TailorStaff, Long> {

    @Query("SELECT t FROM TailorStaff t WHERE " +
            "LOWER(t.name) LIKE :q OR LOWER(t.code) LIKE :q OR LOWER(t.specialty) LIKE :q")
    List<TailorStaff> search(String q);
}
