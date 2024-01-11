package com.fdmgroup.BankingApplication.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class CreditCard {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String type;

	private double balance; // amount spent
	private double availableLimit;
	private double creditLimit;

	@JsonIgnore
	@OneToMany(mappedBy = "creditCard", cascade = CascadeType.ALL)
	private List<CreditCardTransaction> creditCardTransactions;

	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	@JsonIgnore
	private User user;

	public CreditCard() {
	}

	public CreditCard(Long id, String type, double balance, double availableLimit, double creditLimit, User user) {
		this.id = id;
		this.type = type;
		this.balance = balance;
		this.availableLimit = availableLimit;
		this.creditLimit = creditLimit;
		this.user = user;
	}

	public long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public double getBalance() {
		return balance;
	}

	public void setBalance(double balance) {
		this.balance = balance;
	}

	public double getAvailableLimit() {
		return availableLimit;
	}

	public void setAvailableLimit(double availableLimit) {
		this.availableLimit = availableLimit;
	}

	public double getCreditLimit() {
		return creditLimit;
	}

	public void setCreditLimit(double creditLimit) {
		this.creditLimit = creditLimit;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}
