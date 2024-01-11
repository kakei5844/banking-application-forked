package com.fdmgroup.BankingApplication.dto;

import com.fdmgroup.BankingApplication.security.Role;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;

public class UserRegistrationRequestDTO {
	
    @NotBlank
    private String username;

    @NotBlank
    private String password;

    private Role role;

    @DecimalMin(value = "0.01", message = "Amount must be greater than zero")
    private double initialBalance;
    
    public UserRegistrationRequestDTO() {
    }

    public UserRegistrationRequestDTO(String username, String password, Role role, double initialBalance) {
        this.username = username;
        this.password = password;
        this.role = role;
        this.initialBalance = initialBalance;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public double getInitialBalance() {
        return initialBalance;
    }

    public void setInitialBalance(double initialBalance) {
        this.initialBalance = initialBalance;
    }

}
