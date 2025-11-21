package com.storemanagement.furnishingstore.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "tailor_assignment")
@Getter
@Setter
public class TailorAssignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "store_id", nullable = false)
    private Long storeId;

    @Column(name = "order_id", nullable = false)
    private Long orderId;

    @Column(name = "tailor_id", nullable = false)
    private Long tailorId;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 32)
    private TailorAssignmentStatus status;

    @Column(name = "assigned_date", nullable = false)
    private LocalDate assignedDate;

    @Column(name = "expected_completion_date")
    private LocalDate expectedCompletionDate;

    @Column(name = "completed_date")
    private LocalDate completedDate;

    @Column(name = "notes", length = 2000)
    private String notes;

    // Short label for table chip: "Proof Uploaded", "Cutting done", etc.
    @Column(name = "progress_note", length = 500)
    private String progressNote;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
