package com.fdmgroup.BankingApplication.model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
	private String description;
	private LocalDateTime createdAt;
	
    private int mcc;
    
	@Enumerated(EnumType.STRING)
	private MerchantTypeCategory merchantCategory;

	@JsonIgnore
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "bill_id", nullable = true)
	private Bill bill;

	public CreditCardTransaction() {
		super();
	}

	public CreditCardTransaction(Long id, CreditCard creditCard, double amount, String description,
			LocalDateTime createdAt, int mcc, MerchantTypeCategory merchantCategory, Bill bill) {
		super();
		this.id = id;
		this.creditCard = creditCard;
		this.amount = amount;
		this.description = description;
		this.createdAt = createdAt;
		this.mcc = mcc;
		this.merchantCategory = merchantCategory;
		this.bill = bill;
	}

	public Long getId() {
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

	public int getMcc() {
		return mcc;
	}

	public void setMcc(int mcc) {
		this.mcc = mcc;
	}

	public MerchantTypeCategory getMerchantCategory() {
		return merchantCategory;
	}

	public void setMerchantCategory(MerchantTypeCategory merchantCategory) {
		this.merchantCategory = merchantCategory;
	}

	public Bill getBill() {
		return bill;
	}

	public void setBill(Bill bill) {
		this.bill = bill;
	}

}
