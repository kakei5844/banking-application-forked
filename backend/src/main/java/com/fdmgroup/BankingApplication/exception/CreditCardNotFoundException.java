package com.fdmgroup.BankingApplication.exception;

public class CreditCardNotFoundException extends RuntimeException {

    public CreditCardNotFoundException(String message) {
        super(message);
    }

}
