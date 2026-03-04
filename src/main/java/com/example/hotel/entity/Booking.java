package com.example.hotel.entity;

// import com.example.hotel.enums.BookingStatus;
import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
@Data
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private User customer;
    
    @ManyToOne
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;
    
    @Column(name = "check_in_date")
    private LocalDate checkInDate;
    
    @Column(name = "check_out_date")
    private LocalDate checkOutDate;
    
    @Column(name = "total_amount")
    private BigDecimal totalAmount;
    
    @Enumerated(EnumType.STRING)
    // private BookingStatus status;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @OneToOne(mappedBy = "booking", cascade = CascadeType.ALL, orphanRemoval = true)
    private Payment payment;
}