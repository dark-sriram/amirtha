package com.example.hotel.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.hotel.entity.Booking;
import com.example.hotel.enums.BookingStatus;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    // Step ②: Overlap Detection Query
    @Query("SELECT b FROM Booking b WHERE b.room.id = :roomId "
            + "AND b.status NOT IN ('CANCELLED', 'CHECKED_OUT') "
            + "AND b.checkInDate < :checkOut AND b.checkOutDate > :checkIn")
    List<Booking> findConflictingBookings(
            @Param("roomId") Long roomId,
            @Param("checkIn") LocalDate checkIn,
            @Param("checkOut") LocalDate checkOut
    );

    @Query("SELECT b FROM Booking b WHERE b.room.id = :roomId AND b.status IN :statuses")
    List<Booking> findByRoomIdAndStatusIn(
            @Param("roomId") Long roomId,
            @Param("statuses") List<BookingStatus> statuses
    );

    List<Booking> findByCustomerId(Long customerId);
}
