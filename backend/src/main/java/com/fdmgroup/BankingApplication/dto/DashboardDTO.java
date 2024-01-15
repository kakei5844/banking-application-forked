package com.fdmgroup.BankingApplication.dto;

import java.util.List;

public class DashboardDTO {
	private List<BankAccountDTO> bankAccounts;
    private List<CreditCardDTO> creditCards;
    // other fields
    
	public DashboardDTO() {
		super();
	}
	
	public DashboardDTO(List<BankAccountDTO> bankAccounts, List<CreditCardDTO> creditCards) {
		super();
		this.bankAccounts = bankAccounts;
		this.creditCards = creditCards;
	}
	
	public List<BankAccountDTO> getBankAccounts() {
		return bankAccounts;
	}
	
	public void setBankAccounts(List<BankAccountDTO> bankAccounts) {
		this.bankAccounts = bankAccounts;
	}
	
	public List<CreditCardDTO> getCreditCards() {
		return creditCards;
	}
	
	public void setCreditCards(List<CreditCardDTO> creditCards) {
		this.creditCards = creditCards;
	}
    
}
