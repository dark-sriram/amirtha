package com.example.hotel.dto.response;

import com.example.hotel.enums.UserRole;

import lombok.Data;

@Data
public class UserResponse {
    private Long id;
    private String name;
    private String email;
    private UserRole role;
}