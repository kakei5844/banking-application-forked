package com.fdmgroup.BankingApplication.dto;

import com.fdmgroup.BankingApplication.dto.annotation.DifferentBankAccounts;
import jakarta.validation.constraints.DecimalMin;

@DifferentBankAccounts
public class TransferRequestDTO {

    private String fromBankAccountNumber;

    private String toBankAccountNumber;
    
    @DecimalMin(value = "0.01", message = "Amount must be greater than zero")
    private double amount;
    
    public TransferRequestDTO() {
    }

    public TransferRequestDTO(String fromBankAccountNumber, String toBankAccountNumber, double amount) {
    	
        this.fromBankAccountNumber = fromBankAccountNumber;
        this.toBankAccountNumber = toBankAccountNumber;
        this.amount = amount;
    }

    public String getFromBankAccountNumber() {
		return fromBankAccountNumber;
	}

	public void setFromBankAccountNumber(String fromBankAccountNumber) {
		this.fromBankAccountNumber = fromBankAccountNumber;
	}

	public String getToBankAccountNumber() {
		return toBankAccountNumber;
	}

	public void setToBankAccountNumber(String toBankAccountNumber) {
		this.toBankAccountNumber = toBankAccountNumber;
	}

	public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

}
