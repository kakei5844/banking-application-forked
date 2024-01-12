package com.fdmgroup.BankingApplication.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

@Entity
public class BankAccount {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@OneToOne(mappedBy = "bankAccount", cascade = CascadeType.ALL)
	@JsonIgnore
	private User user;

	private double balance;

	@JsonIgnore
	@OneToMany(mappedBy = "bankAccount", cascade = CascadeType.ALL)
	private List<BankAccountTransaction> bankAccountTransactions = new ArrayList<>();

	public BankAccount() {
	}

	public BankAccount(Long id, User user, double balance) {
		this.id = id;
		this.user = user;
		this.balance = balance;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public double getBalance() {
		return balance;
	}

	public void setBalance(double balance) {
		this.balance = balance;
	}

	public List<BankAccountTransaction> getBankAccountTransactions() {
		return bankAccountTransactions;
	}

	public void setBankAccountTransactions(List<BankAccountTransaction> bankAccountTransactions) {
		this.bankAccountTransactions = bankAccountTransactions;
	}
	
	@Override
	public String toString() {
		return "BankAccount [id=" + id + ", user=" + user.getId() + ", balance=" + balance + "]";
	}
}
