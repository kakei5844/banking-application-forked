package com.fdmgroup.BankingApplication.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;

public class WithdrawRequestDTO {

	@Min(value = 1, message = "Invalid bank account id")
    private long bankAccountId;
    
    @DecimalMin(value = "0.01", message = "Amount must be greater than zero")
	private double amount;

	public WithdrawRequestDTO() {
	}

	public WithdrawRequestDTO(long bankAccountId, double amount) {
		this.bankAccountId = bankAccountId;
		this.amount = amount;
	}

	public long getBankAccountId() {
		return bankAccountId;
	}

	public void setBankAccountId(long bankAccountId) {
		this.bankAccountId = bankAccountId;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}
}
