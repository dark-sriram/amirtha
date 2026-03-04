package com.example.hotel.dto.request;

import lombok.Data;

@Data
public class RegisterRequest {
    private String name;
    private String email;
    private String password;
    private String role;  // Optional: ADMIN or CUSTOMER
}