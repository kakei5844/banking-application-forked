package com.fdmgroup.BankingApplication.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;

public class WithdrawRequestDTO {

	private String bankAccountNumber;

	@DecimalMin(value = "0.01", message = "Amount must be greater than zero")
	private double amount;

	public WithdrawRequestDTO() {
	}

	public WithdrawRequestDTO(String bankAccountNumber, double amount) {
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
