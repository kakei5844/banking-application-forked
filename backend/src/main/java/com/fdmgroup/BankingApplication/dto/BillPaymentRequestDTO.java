package com.fdmgroup.BankingApplication.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;

public class BillPaymentRequestDTO {

    @Min(value = 1, message = "Invalid credit card id")
    private long creditCardId;

    private String bankAccountNumber;

    @DecimalMin(value = "0.01", message = "Amount must be greater than zero")
    private double amount;

    public BillPaymentRequestDTO() {
    }

    public BillPaymentRequestDTO(@Min(value = 1, message = "Invalid bill id") long creditCardId,
    		String bankAccountNumber,
            @DecimalMin(value = "0.01", message = "Amount must be greater than zero") double amount) {
        this.creditCardId = creditCardId;
        this.bankAccountNumber = bankAccountNumber;
        this.amount = amount;
    }

    public long getCreditCardId() {
        return creditCardId;
    }

    public void setCreditCardId(long creditCardId) {
        this.creditCardId = creditCardId;
    }

    public String getBankAccountNumber() {
		return bankAccountNumber;
	}

	public void setBankAccountNumber(String bankAccountNumber) {
		this.bankAccountNumber = bankAccountNumber;
	}

	public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    @Override
    public String toString() {
        return "BillPaymentRequestDTO{" +
                "creditCardId=" + creditCardId +
                ", bankAccountNumber='" + bankAccountNumber + '\'' +
                ", amount=" + amount +
                '}';
    }
}
