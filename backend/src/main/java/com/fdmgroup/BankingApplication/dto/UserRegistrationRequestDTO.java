package com.fdmgroup.BankingApplication.dto;

import com.fdmgroup.BankingApplication.dto.annotation.ValidInitialBalance;
import com.fdmgroup.BankingApplication.security.Role;

import jakarta.validation.constraints.NotBlank;

@ValidInitialBalance
public class UserRegistrationRequestDTO {

	@NotBlank(message = "username must not be blank")
	private String username;

	@NotBlank(message = "password must not be blank")
	private String password;

	@NotBlank(message = "First name must not be blank")
	private String firstName;

	@NotBlank(message = "Last name must not be blank")
	private String lastName;

	@NotBlank(message = "Phone number must not be blank")
	private String phoneNumber;

	@NotBlank(message = "Email must not be blank")
	private String email;

	private Role role;

	private double initialBalance;

	public UserRegistrationRequestDTO() {
		super();
	}

	public UserRegistrationRequestDTO(String username, String password, String firstName, String lastName,
			String phoneNumber, String email, Role role, double initialBalance) {
		super();
		this.username = username;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.phoneNumber = phoneNumber;
		this.email = email;
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

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Override
	public String toString() {
		return "UserRegistrationRequestDTO [username=" + username + ", firstName=" + firstName + ", lastName="
				+ lastName + ", role=" + role + "]";
	}

}
