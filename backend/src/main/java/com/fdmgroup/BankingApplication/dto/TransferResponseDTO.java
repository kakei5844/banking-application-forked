package com.fdmgroup.BankingApplication.dto;

import com.fdmgroup.BankingApplication.model.BankAccountTransaction;

public class TransferResponseDTO {

    // subject to change (based on what frontend needs)
    private BankAccountTransaction fromBankAccountTransaction;
    private BankAccountTransaction toBankAccountTransaction;
    private double amount;
    public TransferResponseDTO() {
    }
    public TransferResponseDTO(BankAccountTransaction fromBankAccountTransaction, BankAccountTransaction toBankAccountTransaction, double amount) {
        this.fromBankAccountTransaction = fromBankAccountTransaction;
        this.toBankAccountTransaction = toBankAccountTransaction;
        this.amount = amount;
    }
    public BankAccountTransaction getFromBankAccountTransaction() {
        return fromBankAccountTransaction;
    }
    public void setFromBankAccountTransaction(BankAccountTransaction fromBankAccountTransaction) {
        this.fromBankAccountTransaction = fromBankAccountTransaction;
    }
    public BankAccountTransaction getToBankAccountTransaction() {
        return toBankAccountTransaction;
    }
    public void setToBankAccountTransaction(BankAccountTransaction toBankAccountTransaction) {
        this.toBankAccountTransaction = toBankAccountTransaction;
    }
    public double getAmount() {
        return amount;
    }
    public void setAmount(double amount) {
        this.amount = amount;
    }

}
