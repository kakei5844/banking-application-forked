package com.fdmgroup.BankingApplication.model;

import java.util.List;

import com.fdmgroup.BankingApplication.security.Role;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

@Entity
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String username;
	private String password;
	
	private String firstName;
	private String lastName;
	private String phoneNumber;

	@Enumerated(EnumType.STRING)
	private Role role;

	@OneToOne
	@JoinColumn(name = "bank_account_id", referencedColumnName = "id")
	private BankAccount bankAccount;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<CreditCard> creditCards;

	public User() {
		super();
	}

	public User(Long id, String username, String password, String firstName, String lastName, String phoneNumber,
			Role role, BankAccount bankAccount, List<CreditCard> creditCards) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.phoneNumber = phoneNumber;
		this.role = role;
		this.bankAccount = bankAccount;
		this.creditCards = creditCards;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public BankAccount getBankAccount() {
		return bankAccount;
	}

	public void setBankAccount(BankAccount bankAccount) {
		this.bankAccount = bankAccount;
	}

	public List<CreditCard> getCreditCards() {
		return creditCards;
	}

	public void setCreditCards(List<CreditCard> creditCards) {
		this.creditCards = creditCards;
	}

}
