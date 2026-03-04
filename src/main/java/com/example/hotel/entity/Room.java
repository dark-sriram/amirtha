package com.example.hotel.entity;


// import com.example.hotel.enums.RoomStatus;
import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

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
    // private RoomStatus status;
    
    @OneToMany(mappedBy = "room")
    private List<Booking> bookings;
}