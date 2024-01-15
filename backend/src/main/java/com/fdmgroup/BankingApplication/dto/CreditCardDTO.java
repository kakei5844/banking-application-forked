package com.fdmgroup.BankingApplication.dto;

public class CreditCardDTO {

	private Long id;
	private double outstandingBalance;
	private double availableCredit;
	private double creditLimit;

	public CreditCardDTO() {
		super();
	}

	public CreditCardDTO(Long id, double outstandingBalance, double availableCredit, double creditLimit) {
		super();
		this.id = id;
		this.outstandingBalance = outstandingBalance;
		this.availableCredit = availableCredit;
		this.creditLimit = creditLimit;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

}
