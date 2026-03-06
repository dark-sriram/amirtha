package com.example.hotel.config;

import java.math.BigDecimal;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.hotel.entity.Room;
import com.example.hotel.enums.RoomStatus;
import com.example.hotel.enums.RoomType;
import com.example.hotel.repository.RoomRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final RoomRepository roomRepository;

    @Override
    public void run(String... args) throws Exception {
        if (roomRepository.count() == 0) {
            // Add sample rooms
            Room room1 = new Room();
            room1.setRoomNumber("101");
            room1.setRoomType(RoomType.STANDARD);
            room1.setPricePerNight(BigDecimal.valueOf(100.0));
            room1.setCapacity(2);
            room1.setStatus(RoomStatus.AVAILABLE);
            roomRepository.save(room1);

            Room room2 = new Room();
            room2.setRoomNumber("102");
            room2.setRoomType(RoomType.STANDARD);
            room2.setPricePerNight(BigDecimal.valueOf(100.0));
            room2.setCapacity(2);
            room2.setStatus(RoomStatus.AVAILABLE);
            roomRepository.save(room2);

            Room room3 = new Room();
            room3.setRoomNumber("103");
            room3.setRoomType(RoomType.DELUXE);
            room3.setPricePerNight(BigDecimal.valueOf(150.0));
            room3.setCapacity(3);
            room3.setStatus(RoomStatus.AVAILABLE);
            roomRepository.save(room3);

            Room room4 = new Room();
            room4.setRoomNumber("104");
            room4.setRoomType(RoomType.DELUXE);
            room4.setPricePerNight(BigDecimal.valueOf(150.0));
            room4.setCapacity(3);
            room4.setStatus(RoomStatus.AVAILABLE);
            roomRepository.save(room4);

            Room room5 = new Room();
            room5.setRoomNumber("201");
            room5.setRoomType(RoomType.SUITE);
            room5.setPricePerNight(BigDecimal.valueOf(250.0));
            room5.setCapacity(4);
            room5.setStatus(RoomStatus.AVAILABLE);
            roomRepository.save(room5);

            Room room6 = new Room();
            room6.setRoomNumber("202");
            room6.setRoomType(RoomType.SUITE);
            room6.setPricePerNight(BigDecimal.valueOf(250.0));
            room6.setCapacity(4);
            room6.setStatus(RoomStatus.AVAILABLE);
            roomRepository.save(room6);

            Room room7 = new Room();
            room7.setRoomNumber("203");
            room7.setRoomType(RoomType.STANDARD);
            room7.setPricePerNight(BigDecimal.valueOf(100.0));
            room7.setCapacity(2);
            room7.setStatus(RoomStatus.AVAILABLE);
            roomRepository.save(room7);

            Room room8 = new Room();
            room8.setRoomNumber("204");
            room8.setRoomType(RoomType.DELUXE);
            room8.setPricePerNight(BigDecimal.valueOf(150.0));
            room8.setCapacity(3);
            room8.setStatus(RoomStatus.AVAILABLE);
            roomRepository.save(room8);

            System.out.println("Sample rooms initialized!");
        }
    }
}
