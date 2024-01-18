package com.fdmgroup.BankingApplication.dto;

import jakarta.validation.constraints.DecimalMin;
// import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;

public class CreditCardRequestDTO {

    @DecimalMin(value = "0.01", message = "annual salary must be greater than zero")
    private double annualSalary; 

    @NotEmpty(message = "card type must be provided")
    private String cardType;

    public CreditCardRequestDTO() {
    }

    public double getAnnualSalary() {
        return annualSalary;
    }

    public void setAnnualSalary(double annualSalary) {
        this.annualSalary = annualSalary;
    }

    public String getCardType() {
        return cardType;
    }

    public void setCardType(String cardType) {
        this.cardType = cardType;
    }

    @Override
    public String toString() {
        return "CreditCardRequestDTO{" +
                "annualSalary=" + annualSalary +
                ", cardType='" + cardType + '\'' +
                '}';
    }

}
