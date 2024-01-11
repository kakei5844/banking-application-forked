package com.fdmgroup.BankingApplication.model;

import java.time.LocalDateTime;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Bill {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private LocalDateTime issueDate; // YYYY-MM-DD 00:00:00
	private LocalDateTime dueDate; // YYYY-MM-DD 00:00:00
	private double balanceDue;
	private double minimumPayment;
	private double totalRepaymentAmount;

	public Bill() {
	}

	public Bill(Long id, LocalDateTime issueDate, LocalDateTime dueDate, double balanceDue, double minimumPayment,
			double totalRepaymentAmount) {
		this.id = id;
		this.issueDate = issueDate;
		this.dueDate = dueDate;
		this.balanceDue = balanceDue;
		this.minimumPayment = minimumPayment;
		this.totalRepaymentAmount = totalRepaymentAmount;
	}

	public long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDateTime getIssueDate() {
		return issueDate;
	}

	public void setIssueDate(LocalDateTime issueDate) {
		this.issueDate = issueDate;
	}

	public LocalDateTime getDueDate() {
		return dueDate;
	}

	public void setDueDate(LocalDateTime dueDate) {
		this.dueDate = dueDate;
	}

	public double getBalanceDue() {
		return balanceDue;
	}

	public void setBalanceDue(double balanceDue) {
		this.balanceDue = balanceDue;
	}

	public double getMinimumPayment() {
		return minimumPayment;
	}

	public void setMinimumPayment(double minimumPayment) {
		this.minimumPayment = minimumPayment;
	}

	public double getTotalRepaymentAmount() {
		return totalRepaymentAmount;
	}

	public void setTotalRepaymentAmount(double totalRepaymentAmount) {
		this.totalRepaymentAmount = totalRepaymentAmount;
	}

}
