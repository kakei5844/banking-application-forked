package com.fdmgroup.BankingApplication.model;

import java.time.LocalDate;
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
	private String cardNumber;
	private String type;

	private double outstandingBalance; // amount spent (changed from balance to availableBalance)
	private double availableCredit; // available credit balance (changed from availableLimit to availableCredit)
	private double creditLimit;

	private LocalDate issueDate;

	@JsonIgnore
	@OneToMany(mappedBy = "creditCard", cascade = CascadeType.ALL)
	private List<CreditCardTransaction> creditCardTransactions;

	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	@JsonIgnore
	private User user;

	@JsonIgnore
	@OneToMany(mappedBy = "creditCard", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Bill> bills;

	public CreditCard() {
		super();
	}

	public CreditCard(Long id, String cardNumber, String type, double outstandingBalance, double availableCredit,
			double creditLimit, LocalDate issueDate, List<CreditCardTransaction> creditCardTransactions, User user,
			List<Bill> bills) {
		super();
		this.id = id;
		this.cardNumber = cardNumber;
		this.type = type;
		this.outstandingBalance = outstandingBalance;
		this.availableCredit = availableCredit;
		this.creditLimit = creditLimit;
		this.issueDate = issueDate;
		this.creditCardTransactions = creditCardTransactions;
		this.user = user;
		this.bills = bills;
	}

	public long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCardNumber() {
		return cardNumber;
	}

	public void setCardNumber(String cardNumber) {
		this.cardNumber = cardNumber;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public double getOutstandingBalance() {
		return outstandingBalance;
	}

	public void setOutstandingBalance(double outstandingBalance) {
		this.outstandingBalance = outstandingBalance;
	}

	public double getAvailableCredit() {
		return availableCredit;
	}

	public void setAvailableCredit(double availableCredit) {
		this.availableCredit = availableCredit;
	}

	public double getCreditLimit() {
		return creditLimit;
	}

	public void setCreditLimit(double creditLimit) {
		this.creditLimit = creditLimit;
	}

	public LocalDate getIssueDate() {
		return issueDate;
	}

	public void setIssueDate(LocalDate issueDate) {
		this.issueDate = issueDate;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public List<CreditCardTransaction> getCreditCardTransactions() {
		return creditCardTransactions;
	}

	public void setCreditCardTransactions(List<CreditCardTransaction> creditCardTransactions) {
		this.creditCardTransactions = creditCardTransactions;
	}

	public List<Bill> getBills() {
		return bills;
	}

	public void setBills(List<Bill> bills) {
		this.bills = bills;
	}

}
