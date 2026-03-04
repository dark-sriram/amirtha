package com.example.hotel.entity;


import java.math.BigDecimal;
import java.util.List;

import com.example.hotel.enums.RoomStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "rooms")
@Data
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "room_number", unique = true)
    private String roomNumber;
    
    @Column(name = "room_type")
    private String roomType;
    
    @Column(name = "price_per_night")
    private BigDecimal pricePerNight;
    
    private Integer capacity;
    
    @Enumerated(EnumType.STRING)
    private RoomStatus status;
    
    @OneToMany(mappedBy = "room")
    private List<Booking> bookings;
}