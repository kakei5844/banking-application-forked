package com.fdmgroup.BankingApplication.dto;

import jakarta.validation.constraints.DecimalMin;

public class DepositRequestDTO {

	private String bankAccountNumber;
	
    @DecimalMin(value = "0.01", message = "Amount must be greater than zero")
	private double amount;

	public DepositRequestDTO() {
	}

	public DepositRequestDTO(String bankAccountNumber, double amount) {
		this.bankAccountNumber = bankAccountNumber;
		this.amount = amount;
	}

	public String getBankAccountNumber() {
		return bankAccountNumber;
	}

	public void setBankAccountNumber(String bankAccountNumber) {
		this.bankAccountNumber = bankAccountNumber;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

}
