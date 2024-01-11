package com.fdmgroup.BankingApplication.dto;

public class UserLoginRequestDTO {
	
	private String username;
	private String password;
	
	public UserLoginRequestDTO() {
	}
	
	public UserLoginRequestDTO(String username, String password) {
		this.username = username;
		this.password = password;
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
	
}
