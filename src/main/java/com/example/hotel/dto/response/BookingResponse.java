package com.example.hotel.dto.response;

import com.example.hotel.enums.BookingStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class BookingResponse {
    private Long id;
    private Long userId;
    private Long roomId;
    private LocalDate checkIn;
    private LocalDate checkOut;
    private BigDecimal totalAmount;
    private BookingStatus status;
    private LocalDateTime createdAt;
}