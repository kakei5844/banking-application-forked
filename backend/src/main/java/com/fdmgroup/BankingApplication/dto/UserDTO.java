package com.fdmgroup.BankingApplication.dto;

import com.fdmgroup.BankingApplication.security.Role;

public record UserDTO(Long id, String username, String firstName, String lastName, String phoneNumber, String email, Boolean isVerified, Role role) {

}
