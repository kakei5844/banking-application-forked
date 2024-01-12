package com.fdmgroup.BankingApplication.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class CreditCardTransaction {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "credit_card_id", nullable = false)
	private CreditCard creditCard;

	private double amount;
//	private boolean isValid;
	private String description;
	private LocalDateTime createdAt;

	public CreditCardTransaction() {
	}

	public CreditCardTransaction(Long id, CreditCard creditCard, double amount, String description,
			LocalDateTime createdAt) {
		this.id = id;
		this.creditCard = creditCard;
		this.amount = amount;
//		this.isValid = isValid;
		this.description = description;
		this.createdAt = createdAt;
	}

	public long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public CreditCard getCreditCard() {
		return creditCard;
	}

	public void setCreditCard(CreditCard creditCard) {
		this.creditCard = creditCard;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

//	public boolean isValid() {
//		return isValid;
//	}
//
//	public void setValid(boolean isValid) {
//		this.isValid = isValid;
//	}

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
