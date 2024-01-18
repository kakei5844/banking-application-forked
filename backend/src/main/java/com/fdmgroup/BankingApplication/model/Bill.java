package com.fdmgroup.BankingApplication.model;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Bill {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private LocalDate issueDate;
	private LocalDate dueDate;
	private double balanceDue;
	private double minimumPayment;
	private double totalRepaymentAmount;

	@ManyToOne
	@JoinColumn(name = "credit_card_id", nullable = false)
	private CreditCard creditCard;

	@OneToMany(mappedBy = "bill")
	private List<CreditCardTransaction> billedTransactions;

	public Bill() {
	}

	public Bill(Long id, LocalDate issueDate, LocalDate dueDate, double balanceDue, double minimumPayment,
			double totalRepaymentAmount, CreditCard creditCard, List<CreditCardTransaction> billedTransactions) {
		this.id = id;
		this.issueDate = issueDate;
		this.dueDate = dueDate;
		this.balanceDue = balanceDue;
		this.minimumPayment = minimumPayment;
		this.totalRepaymentAmount = totalRepaymentAmount;
		this.creditCard = creditCard;
		this.billedTransactions = billedTransactions;
	}

	public Bill(LocalDate issueDate, LocalDate dueDate, double balanceDue, double minimumPayment,
			double totalRepaymentAmount, CreditCard creditCard, List<CreditCardTransaction> billedTransactions) {
		this.issueDate = issueDate;
		this.dueDate = dueDate;
		this.balanceDue = balanceDue;
		this.minimumPayment = minimumPayment;
		this.totalRepaymentAmount = totalRepaymentAmount;
		this.creditCard = creditCard;
		this.billedTransactions = billedTransactions;
	}

	public long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDate getIssueDate() {
		return issueDate;
	}

	public void setIssueDate(LocalDate issueDate) {
		this.issueDate = issueDate;
	}

	public LocalDate getDueDate() {
		return dueDate;
	}

	public void setDueDate(LocalDate dueDate) {
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

	public CreditCard getCreditCard() {
		return creditCard;
	}

	public void setCreditCard(CreditCard creditCard) {
		this.creditCard = creditCard;
	}

	public List<CreditCardTransaction> getBilledTransactions() {
		return billedTransactions;
	}

	public void setBilledTransactions(List<CreditCardTransaction> billedTransactions) {
		this.billedTransactions = billedTransactions;
	}

	@Override
	public String toString() {
		return "Bill [id=" + id + ", issueDate=" + issueDate + ", dueDate=" + dueDate + ", balanceDue=" + balanceDue
				+ ", minimumPayment=" + minimumPayment + ", totalRepaymentAmount=" + totalRepaymentAmount
				+ ", creditCard=" + creditCard + ", billedTransactions=" + billedTransactions + "]";
	}

}
