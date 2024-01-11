package com.fdmgroup.BankingApplication.dto;

import com.fdmgroup.BankingApplication.security.Role;

public record UserDTO(Long id, String username, Role role) {

}
