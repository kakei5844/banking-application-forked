package com.fdmgroup.BankingApplication.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class BankAccountTransaction {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "bank_account_id", nullable = false)
	private BankAccount bankAccount;

	private double amount;
	private String description;
	private LocalDateTime createdAt;
	private double updatedBalance;

	public BankAccountTransaction() {
	}

	public BankAccountTransaction(Long id, BankAccount bankAccount, double amount, String description,
			LocalDateTime createdAt, double updatedBalance) {
		super();
		this.id = id;
		this.bankAccount = bankAccount;
		this.amount = amount;
		this.description = description;
		this.createdAt = createdAt;
		this.updatedBalance = updatedBalance;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public BankAccount getBankAccount() {
		return bankAccount;
	}

	public void setBankAccount(BankAccount bankAccount) {
		this.bankAccount = bankAccount;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
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

	public double getUpdatedBalance() {
		return updatedBalance;
	}

	public void setUpdatedBalance(double updatedBalance) {
		this.updatedBalance = updatedBalance;
	}

}
