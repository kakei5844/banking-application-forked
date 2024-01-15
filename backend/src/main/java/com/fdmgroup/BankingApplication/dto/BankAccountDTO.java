package com.fdmgroup.BankingApplication.dto;

public class BankAccountDTO {
	private Long id;
	private double balance;
	// other fields
	
	public BankAccountDTO() {
		super();
	}
	
	public BankAccountDTO(Long id, double balance) {
		super();
		this.id = id;
		this.balance = balance;
	}
	
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public double getBalance() {
		return balance;
	}
	
	public void setBalance(double balance) {
		this.balance = balance;
	}
	
}
