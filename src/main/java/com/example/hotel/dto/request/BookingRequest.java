package com.example.hotel.dto.request;

import java.time.LocalDate;

import lombok.Data;

@Data
public class BookingRequest {
    private Long userId;
    private Long roomId;
    private LocalDate checkIn;
    private LocalDate checkOut;
    
    // Validation: checkOut must be after checkIn
    public boolean isValidDates() {
        return checkIn != null && checkOut != null && checkOut.isAfter(checkIn);
    }
}