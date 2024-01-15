package com.fdmgroup.BankingApplication.exception;

public class InsufficientCreditException extends RuntimeException {

    public InsufficientCreditException(String message) {
        super(message);
    }

}