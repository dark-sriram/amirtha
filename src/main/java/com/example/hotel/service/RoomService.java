package com.example.hotel.service;

import com.example.hotel.entity.Booking;
import com.example.hotel.entity.Room;
import com.example.hotel.enums.BookingStatus;
import com.example.hotel.enums.RoomStatus;
import com.example.hotel.repository.BookingRepository;
import com.example.hotel.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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
    
    // ADMIN: Create new room
    public Room createRoom(Room room) {
        if (roomRepository.existsByRoomNumber(room.getRoomNumber())) {
            throw new IllegalStateException("Room number already exists");
        }
        return roomRepository.save(room);
    }
    
    // ADMIN: Update room
    public Room updateRoom(Long id, Room roomDetails) {
        Room room = findRoomById(id);
        room.setRoomNumber(roomDetails.getRoomNumber());
        room.setRoomType(roomDetails.getRoomType());
        room.setPricePerNight(roomDetails.getPricePerNight());
        room.setCapacity(roomDetails.getCapacity());
        room.setStatus(roomDetails.getStatus());
        return roomRepository.save(room);
    }
    
    // ADMIN: Delete room - Cannot delete if active bookings exist
    @Transactional
    public void deleteRoom(Long id) {
        Room room = findRoomById(id);
        
        // Check for active bookings (CONFIRMED or CHECKED_IN)
        List<Booking> activeBookings = bookingRepository.findByRoomIdAndStatusIn(
            id, 
            List.of(BookingStatus.CONFIRMED, BookingStatus.CHECKED_IN)
        );
        
        if (!activeBookings.isEmpty()) {
            throw new IllegalStateException("Cannot delete room with " + activeBookings.size() + " active booking(s)");
        }
        
        roomRepository.delete(room);
    }
    
    // ADMIN: Mark room as CHECKED_OUT (update status)
    public Room updateRoomStatus(Long id, RoomStatus status) {
        Room room = findRoomById(id);
        room.setStatus(status);
        return roomRepository.save(room);
    }
}