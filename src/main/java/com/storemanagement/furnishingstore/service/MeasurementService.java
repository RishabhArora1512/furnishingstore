package com.storemanagement.furnishingstore.service;

import com.storemanagement.furnishingstore.dto.CreateMeasurementRequest;
import com.storemanagement.furnishingstore.model.Measurement;
import com.storemanagement.furnishingstore.model.OrderStatus;
import com.storemanagement.furnishingstore.model.Orders;
import com.storemanagement.furnishingstore.repository.MeasurementRepository;
import com.storemanagement.furnishingstore.repository.OrderRepository;
import java.util.List;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MeasurementService {

    private final MeasurementRepository measurements;
    private final OrderRepository orders;

    public MeasurementService(MeasurementRepository measurements,
                              OrderRepository orders) {
        this.measurements = measurements;
        this.orders = orders;
    }

    private Orders loadOrderForStore(Long orderId, Long storeId) throws ChangeSetPersister.NotFoundException {
        Orders o = orders.findById(orderId)
                .orElseThrow(ChangeSetPersister.NotFoundException::new);
        if (!storeId.equals(o.getStoreId())) {
            throw new AccessDeniedException("Order does not belong to store " + storeId);
        }
        return o;
    }

    private Measurement loadMeasurementForStore(Long measurementId, Long storeId) throws ChangeSetPersister.NotFoundException {
        Measurement m = measurements.findById(measurementId)
                .orElseThrow(ChangeSetPersister.NotFoundException::new);
        if (!storeId.equals(m.getStoreId())) {
            throw new AccessDeniedException("Measurement does not belong to store " + storeId);
        }
        return m;
    }

    @Transactional
    public Measurement create(CreateMeasurementRequest req) {
        Orders order = null;
        try {
            order = loadOrderForStore(req.orderId, requireStore());
        } catch (ChangeSetPersister.NotFoundException e) {
            throw new RuntimeException(e);
        }

        Measurement m = new Measurement();
        m.setStoreId(requireStore());
        m.setOrderId(req.orderId);
        m.setRoomArea(req.roomArea);
        m.setMeasurementType(req.measurementType);
        m.setHeight(req.height);
        m.setWidth(req.width);
        m.setDepth(req.depth);
        m.setUnit(req.unit);
        m.setSketchUrl(req.sketchUrl);
        m.setNotes(req.notes);

        Measurement saved = measurements.save(m);

        order.setStatus(OrderStatus.MEASURED);
        orders.save(order);

        return saved;
    }

    @Transactional(readOnly = true)
    public List<Measurement> listByOrder(Long orderId) {
        Long storeId = requireStore();
        try {
            loadOrderForStore(orderId, storeId);
        } catch (ChangeSetPersister.NotFoundException e) {
            throw new RuntimeException(e);
        }
        return measurements.findByStoreIdAndOrderId(storeId, orderId);
    }

    @Transactional(readOnly = true)
    public List<Measurement> listAllForStore() {
        Long storeId = requireStore();
        return measurements.findByStoreId(storeId);
    }

    @Transactional
    public Measurement update(Long measurementId, CreateMeasurementRequest req) {
        Long storeId = requireStore();
        Measurement m = null;
        try {
            m = loadMeasurementForStore(measurementId, storeId);
        } catch (ChangeSetPersister.NotFoundException e) {
            throw new RuntimeException(e);
        }

        // if orderId is allowed to change, validate it; else ignore req.orderId
        if (req.orderId != null && !req.orderId.equals(m.getOrderId())) {
            // optional: allow moving measurement to another order
            Orders order = null;
            try {
                order = loadOrderForStore(req.orderId, storeId);
            } catch (ChangeSetPersister.NotFoundException e) {
                throw new RuntimeException(e);
            }
            m.setOrderId(order.getId());
        }

        m.setRoomArea(req.roomArea);
        m.setMeasurementType(req.measurementType);
        m.setHeight(req.height);
        m.setWidth(req.width);
        m.setDepth(req.depth);
        m.setUnit(req.unit);
        m.setSketchUrl(req.sketchUrl);
        m.setNotes(req.notes);

        return measurements.save(m);
    }

    @Transactional
    public void delete(Long measurementId) {
        Long storeId = requireStore();
        Measurement m = null;
        try {
            m = loadMeasurementForStore(measurementId, storeId);
        } catch (ChangeSetPersister.NotFoundException e) {
            throw new RuntimeException(e);
        }
        measurements.delete(m);
        // optional: you could check if order has zero measurements left
        // and decide whether to revert status from MEASURED → something else.
    }

    private Long requireStore() {
        return 1L;
    }
}
