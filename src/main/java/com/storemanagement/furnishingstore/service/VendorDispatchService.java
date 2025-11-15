package com.storemanagement.furnishingstore.service;

import com.storemanagement.furnishingstore.dto.*;
import com.storemanagement.furnishingstore.model.*;
import com.storemanagement.furnishingstore.repository.*;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

import com.storemanagement.furnishingstore.dto.TrackingEventResponse;

@Service
public class VendorDispatchService {

    private final VendorDispatchRepository dispatches;
    private final VendorDispatchTrackingRepository trackingRepo;
    private final VendorRepository vendors;
    private final OrderRepository orders;

    public VendorDispatchService(VendorDispatchRepository dispatches,
                                 VendorDispatchTrackingRepository trackingRepo,
                                 VendorRepository vendors,
                                 OrderRepository orders) {
        this.dispatches = dispatches;
        this.trackingRepo = trackingRepo;
        this.vendors = vendors;
        this.orders = orders;
    }

    private Long requireStore() {
        return 1L;
    }

    private VendorDispatch loadForStore(Long id) {
        Long storeId = requireStore();
        VendorDispatch d = null;
        try {
            d = dispatches.findById(id)
                    .orElseThrow(ChangeSetPersister.NotFoundException::new);
        } catch (ChangeSetPersister.NotFoundException e) {
            throw new RuntimeException(e);
        }
        if (!storeId.equals(d.getStoreId())) {
            throw new AccessDeniedException("Dispatch does not belong to store " + storeId);
        }
        return d;
    }

    private void validateOrderAndVendor(Long storeId, Long orderId, Long vendorId) {
        orders.findById(orderId)
                .filter(o -> storeId.equals(o.getStoreId()))
                .orElseThrow(() -> new AccessDeniedException("Order not in store " + storeId));
        vendors.findById(vendorId)
                .filter(v -> storeId.equals(v.getStoreId()))
                .orElseThrow(() -> new AccessDeniedException("Vendor not in store " + storeId));
    }

    @Transactional
    public VendorDispatchResponse create(CreateVendorDispatchRequest req) {
        Long storeId = requireStore();
        validateOrderAndVendor(storeId, req.orderId, req.vendorId);

        VendorDispatch d = new VendorDispatch();
        d.setStoreId(storeId);
        d.setOrderId(req.orderId);
        d.setVendorId(req.vendorId);
        d.setTransportMode(TransportMode.valueOf(req.transportMode));
        d.setAwbNumber(req.awbNumber);
        d.setDispatchDate(req.dispatchDate);
        d.setExpectedDelivery(req.expectedDelivery);
        d.setInvoiceUrl(req.invoiceUrl);
        d.setStatus(DispatchStatus.IN_TRANSIT);
        d.setLastStatusUpdate(Instant.now());

        VendorDispatch saved = dispatches.save(d);

        CreateTrackingEventRequest firstEvent = new CreateTrackingEventRequest();
        firstEvent.message = "Dispatch created";
        firstEvent.status = "IN_TRANSIT";
        addTrackingEventInternal(storeId, saved, firstEvent);

        return toResponse(saved, true);
    }

    @Transactional(readOnly = true)
    public List<VendorDispatchResponse> list(String status, Long vendorId, Long orderId) {
        Long storeId = requireStore();

        List<VendorDispatch> base;
        if (status != null) {
            base = dispatches.findByStoreIdAndStatus(storeId, DispatchStatus.valueOf(status));
        } else if (vendorId != null) {
            base = dispatches.findByStoreIdAndVendorId(storeId, vendorId);
        } else if (orderId != null) {
            base = dispatches.findByStoreIdAndOrderId(storeId, orderId);
        } else {
            base = dispatches.findByStoreId(storeId);
        }

        return base.stream()
                .map(d -> toResponse(d, false))
                .toList();
    }

    @Transactional(readOnly = true)
    public VendorDispatchResponse getWithTracking(Long id) {
        VendorDispatch d = loadForStore(id);
        return toResponse(d, true);
    }

    @Transactional
    public VendorDispatchResponse update(Long id, UpdateVendorDispatchRequest req) {
        Long storeId = requireStore();
        VendorDispatch d = loadForStore(id);

        if (req.orderId != null || req.vendorId != null) {
            Long orderId = req.orderId != null ? req.orderId : d.getOrderId();
            Long vendorId = req.vendorId != null ? req.vendorId : d.getVendorId();
            validateOrderAndVendor(storeId, orderId, vendorId);
            d.setOrderId(orderId);
            d.setVendorId(vendorId);
        }

        if (req.transportMode != null) {
            d.setTransportMode(TransportMode.valueOf(req.transportMode));
        }
        if (req.awbNumber != null) {
            d.setAwbNumber(req.awbNumber);
        }
        if (req.dispatchDate != null) {
            d.setDispatchDate(req.dispatchDate);
        }
        if (req.expectedDelivery != null) {
            d.setExpectedDelivery(req.expectedDelivery);
        }
        if (req.invoiceUrl != null) {
            d.setInvoiceUrl(req.invoiceUrl);
        }

        VendorDispatch saved = dispatches.save(d);
        return toResponse(saved, false);
    }

    @Transactional
    public void delete(Long id) {
        VendorDispatch d = loadForStore(id);
        dispatches.delete(d);
    }

    @Transactional
    public VendorDispatchResponse updateStatus(Long id, UpdateDispatchStatusRequest req) {
        VendorDispatch d = loadForStore(id);
        DispatchStatus newStatus = DispatchStatus.valueOf(req.status);
        d.setStatus(newStatus);
        d.setLastStatusUpdate(Instant.now());
        if (req.expectedDelivery != null) {
            d.setExpectedDelivery(req.expectedDelivery);
        }
        VendorDispatch saved = dispatches.save(d);

        CreateTrackingEventRequest ev = new CreateTrackingEventRequest();
        ev.message = "Status changed to " + req.status;
        ev.status = req.status;
        addTrackingEventInternal(saved.getStoreId(), saved, ev);

        return toResponse(saved, true);
    }

    @Transactional
    public TrackingEventResponse addTrackingEvent(Long dispatchId, CreateTrackingEventRequest req) {
        VendorDispatch d = loadForStore(dispatchId);
        return addTrackingEventInternal(d.getStoreId(), d, req);
    }

    private TrackingEventResponse addTrackingEventInternal(Long storeId,
                                                           VendorDispatch d,
                                                           CreateTrackingEventRequest req) {
        VendorDispatchTracking t = new VendorDispatchTracking();
        t.setStoreId(storeId);
        t.setDispatchId(d.getId());
        t.setMessage(req.message);
        if (req.status != null) {
            t.setStatusSnapshot(DispatchStatus.valueOf(req.status));
        }
        if (req.eventTime != null) {
            t.setEventTime(req.eventTime);
        }

        VendorDispatchTracking saved = trackingRepo.save(t);

        TrackingEventResponse r = new TrackingEventResponse();
        r.id = saved.getId();
        r.message = saved.getMessage();
        r.status = saved.getStatusSnapshot() != null ? saved.getStatusSnapshot().name() : null;
        r.eventTime = saved.getEventTime();
        return r;
    }

    @Transactional(readOnly = true)
    public List<TrackingEventResponse> listTrackingEvents(Long dispatchId) {
        VendorDispatch d = loadForStore(dispatchId);
        return trackingRepo.findByDispatchIdOrderByEventTimeAsc(d.getId())
                .stream()
                .map(t -> {
                    TrackingEventResponse r = new TrackingEventResponse();
                    r.id = t.getId();
                    r.message = t.getMessage();
                    r.status = t.getStatusSnapshot() != null ? t.getStatusSnapshot().name() : null;
                    r.eventTime = t.getEventTime();
                    return r;
                }).toList();
    }

    private VendorDispatchResponse toResponse(VendorDispatch d, boolean includeTracking) {
        VendorDispatchResponse r = new VendorDispatchResponse();
        r.id = d.getId();
        r.orderId = d.getOrderId();
        r.vendorId = d.getVendorId();
        r.transportMode = d.getTransportMode().name();
        r.awbNumber = d.getAwbNumber();
        r.dispatchDate = d.getDispatchDate();
        r.expectedDelivery = d.getExpectedDelivery();
        r.invoiceUrl = d.getInvoiceUrl();
        r.status = d.getStatus().name();
        r.lastStatusUpdate = d.getLastStatusUpdate();

        vendors.findById(d.getVendorId()).ifPresent(v -> r.vendorName = v.getName());

        if (includeTracking) {
            r.trackingEvents = listTrackingEvents(d.getId());
        }

        return r;
    }
}