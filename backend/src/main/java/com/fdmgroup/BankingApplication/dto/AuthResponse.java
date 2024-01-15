package com.fdmgroup.BankingApplication.dto;

import com.fdmgroup.BankingApplication.security.Role;

public record AuthResponse(Long id, String username, Role role) {

}
