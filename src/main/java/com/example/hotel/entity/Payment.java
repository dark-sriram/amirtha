package com.example.hotel.entity;


// import com.example.hotel.enums.PaymentMethod;
import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;

@Entity
@Table(name = "payments")
@Data
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToOne
    @JoinColumn(name = "booking_id", unique = true, nullable = false)
    private Booking booking;
    
    @Column(name = "amount_paid")
    private BigDecimal amountPaid;
    
    // @Enumerated(EnumType.STRING)
    // private PaymentMethod method;
}
