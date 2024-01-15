package com.fdmgroup.BankingApplication.dto;

import java.time.LocalDateTime;

public class BankAccountTransactionDTO {
	
	private Long id;
	private Long bankAccountId;
	private double amount;
	private double updatedBalance;
	private String description;
	private LocalDateTime createdAt;
	
	public BankAccountTransactionDTO() {
		super();
	}
	
	public BankAccountTransactionDTO(Long id, Long bankAccountId, double amount, double updatedBalance,
			String description, LocalDateTime createdAt) {
		super();
		this.id = id;
		this.bankAccountId = bankAccountId;
		this.amount = amount;
		this.updatedBalance = updatedBalance;
		this.description = description;
		this.createdAt = createdAt;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getBankAccountId() {
		return bankAccountId;
	}

	public void setBankAccountId(Long bankAccountId) {
		this.bankAccountId = bankAccountId;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public double getUpdatedBalance() {
		return updatedBalance;
	}

	public void setUpdatedBalance(double updatedBalance) {
		this.updatedBalance = updatedBalance;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
	
}
