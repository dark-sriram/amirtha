package com.example.hotel.service;


import com.example.hotel.entity.Booking;
import com.example.hotel.entity.Room;
import com.example.hotel.enums.RoomStatus;
import com.example.hotel.repository.BookingRepository;
import com.example.hotel.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoomService {
    private final RoomRepository roomRepository;
    private final BookingRepository bookingRepository;

    public List<Room> findAvailableRooms(LocalDate checkIn, LocalDate checkOut) {
        List<Room> allRooms = roomRepository.findByStatus(RoomStatus.AVAILABLE);
        
        return allRooms.stream()
            .filter(room -> isRoomAvailable(room.getId(), checkIn, checkOut))
            .collect(Collectors.toList());
    }

    private boolean isRoomAvailable(Long roomId, LocalDate checkIn, LocalDate checkOut) {
        List<Booking> conflicts = bookingRepository.findConflictingBookings(roomId, checkIn, checkOut);
        return conflicts.isEmpty();
    }

    public List<Room> findAllRooms() {
        return roomRepository.findAll();
    }

    public Room findRoomById(Long id) {
        return roomRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Room not found"));
    }
}