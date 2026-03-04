package com.example.hotel.service;

import com.example.hotel.dto.request.BookingRequest;
import com.example.hotel.dto.response.BookingResponse;
import com.example.hotel.entity.Booking;
import com.example.hotel.entity.Room;
import com.example.hotel.entity.User;
import com.example.hotel.enums.BookingStatus;
import com.example.hotel.repository.BookingRepository;
import com.example.hotel.repository.RoomRepository;
import com.example.hotel.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingService {
    private final BookingRepository bookingRepository;
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;

    // Step ②: Overlap Detection
    public boolean isRoomAvailable(Long roomId, LocalDate checkIn, LocalDate checkOut) {
        List<Booking> conflicts = bookingRepository.findConflictingBookings(roomId, checkIn, checkOut);
        return conflicts.isEmpty();
    }

    // Step ③: Booking Creation
    @Transactional
    public BookingResponse createBooking(BookingRequest request) {
        if (!isRoomAvailable(request.getRoomId(), request.getCheckIn(), request.getCheckOut())) {
            throw new IllegalStateException("Conflict Detected: Room unavailable for selected dates");
        }

        Room room = roomRepository.findById(request.getRoomId())
            .orElseThrow(() -> new RuntimeException("Room not found"));
        
        User user = userRepository.findById(request.getUserId())
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        long nights = ChronoUnit.DAYS.between(request.getCheckIn(), request.getCheckOut());
        BigDecimal total = room.getPricePerNight().multiply(BigDecimal.valueOf(nights));

        Booking booking = new Booking();
        booking.setCustomer(user);
        booking.setRoom(room);
        booking.setCheckInDate(request.getCheckIn());
        booking.setCheckOutDate(request.getCheckOut());
        booking.setTotalAmount(total);
        booking.setStatus(BookingStatus.REQUESTED);
        booking.setCreatedAt(LocalDateTime.now());

        bookingRepository.save(booking);
        
        return new BookingResponse(
            booking.getId(),
            user.getId(),
            room.getId(),
            booking.getCheckInDate(),
            booking.getCheckOutDate(),
            booking.getTotalAmount(),
            booking.getStatus(),
            booking.getCreatedAt()
        );
    }

    // Step ④: Lifecycle Validation
    @Transactional
    public Booking updateBookingStatus(Long bookingId, BookingStatus newStatus) {
        Booking booking = bookingRepository.findById(bookingId)
            .orElseThrow(() -> new RuntimeException("Booking not found"));
        
        BookingStatus currentStatus = booking.getStatus();
        
        if (!isValidTransition(currentStatus, newStatus)) {
            throw new IllegalStateException("Invalid Status Transition from " + currentStatus + " to " + newStatus);
        }

        booking.setStatus(newStatus);
        return bookingRepository.save(booking);
    }

    private boolean isValidTransition(BookingStatus current, BookingStatus next) {
        if (current == BookingStatus.REQUESTED && (next == BookingStatus.CONFIRMED || next == BookingStatus.CANCELLED)) return true;
        if (current == BookingStatus.CONFIRMED && (next == BookingStatus.CHECKED_IN || next == BookingStatus.CANCELLED)) return true;
        if (current == BookingStatus.CHECKED_IN && next == BookingStatus.CHECKED_OUT) return true;
        return false;
    }

    public List<Booking> findAllBookings() {
        return bookingRepository.findAll();
    }

    public Booking findBookingById(Long id) {
        return bookingRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Booking not found"));
    }

    public List<Booking> findBookingsByUser(Long userId) {
        return bookingRepository.findByCustomerId(userId);
    }
}