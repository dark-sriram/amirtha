package com.example.hotel.service;

import com.example.hotel.dto.request.PaymentRequest;
import com.example.hotel.entity.Booking;
import com.example.hotel.entity.Payment;
import com.example.hotel.repository.BookingRepository;
import com.example.hotel.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PaymentService {
    private final PaymentRepository paymentRepository;
    private final BookingRepository bookingRepository;

    // Step ⑤: Payment Processing
    @Transactional
    public Payment processPayment(PaymentRequest request) {
        Booking booking = bookingRepository.findById(request.getBookingId())
            .orElseThrow(() -> new RuntimeException("Booking not found"));
        
        if (booking.getPayment() != null) {
            throw new IllegalStateException("Payment already exists for this booking");
        }

        Payment payment = new Payment();
        payment.setBooking(booking);
        payment.setAmountPaid(request.getAmount());
        payment.setMethod(request.getMethod());
        
        return paymentRepository.save(payment);
    }

    public Payment findPaymentByBooking(Long bookingId) {
        return paymentRepository.findByBookingId(bookingId)
            .orElseThrow(() -> new RuntimeException("Payment not found"));
    }
}