package com.fdmgroup.BankingApplication.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;

public class BillPaymentRequestDTO {

    @Min(value = 1, message = "Invalid credit card id")
    private long creditCardId;

    @Min(value = 1, message = "Invalid bank account id")
    private long bankAccountId;

    @DecimalMin(value = "0.01", message = "Amount must be greater than zero")
    private double amount;

    public BillPaymentRequestDTO() {
    }

    public BillPaymentRequestDTO(@Min(value = 1, message = "Invalid bill id") long creditCardId,
            @Min(value = 1, message = "Invalid bank account id") long bankAccountId,
            @DecimalMin(value = "0.01", message = "Amount must be greater than zero") double amount) {
        this.creditCardId = creditCardId;
        this.bankAccountId = bankAccountId;
        this.amount = amount;
    }

    public long getCreditCardId() {
        return creditCardId;
    }

    public void setCreditCardId(long creditCardId) {
        this.creditCardId = creditCardId;
    }

    public long getBankAccountId() {
        return bankAccountId;
    }

    public void setBankAccountId(long bankAccountId) {
        this.bankAccountId = bankAccountId;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

}
