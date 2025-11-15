package com.storemanagement.furnishingstore.dto;

import lombok.Data;

@Data
public class CreateMeasurementRequest {

    public Long orderId;             // Order ID*
    public String roomArea;          // Room or Area*
    public String measurementType;   // Measurement Type*

    public Double height;            // required by UI
    public Double width;
    public Double depth;             // optional

    public String unit;              // "Centimeters (cm)" etc.
    public String sketchUrl;         // result of upload (frontend passes URL / key)
    public String notes;             // notes field
}
