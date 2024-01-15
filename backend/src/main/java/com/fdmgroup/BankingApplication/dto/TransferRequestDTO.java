package com.fdmgroup.BankingApplication.dto;

import com.fdmgroup.BankingApplication.dto.annotation.DifferentBankAccounts;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;

@DifferentBankAccounts
public class TransferRequestDTO {

    @Min(value = 1, message = "Invalid bank account id")
    private long fromBankAccountId;

    @Min(value = 1, message = "Invalid bank account id")
    private long toBankAccountId;
    
    @DecimalMin(value = "0.01", message = "Amount must be greater than zero")
    private double amount;
    
    public TransferRequestDTO() {
    }

    public TransferRequestDTO(long fromBankAccountId, long toBankAccountId, double amount) {
    	
        this.fromBankAccountId = fromBankAccountId;
        this.toBankAccountId = toBankAccountId;
        this.amount = amount;
    }

    public long getFromBankAccountId() {
        return fromBankAccountId;
    }

    public void setFromBankAccountId(long fromBankAccountId) {
        this.fromBankAccountId = fromBankAccountId;
    }

    public long getToBankAccountId() {
        return toBankAccountId;
    }

    public void setToBankAccountId(long toBankAccountId) {
        this.toBankAccountId = toBankAccountId;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

}
