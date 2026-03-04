package com.example.hotel.dto.request;

import com.example.hotel.enums.PaymentMethod;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class PaymentRequest {
    private Long bookingId;
    private BigDecimal amount;
    private PaymentMethod method;
}