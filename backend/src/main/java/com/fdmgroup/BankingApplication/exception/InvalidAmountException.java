package com.fdmgroup.BankingApplication.exception;

public class InvalidAmountException extends RuntimeException {
	
    public InvalidAmountException(String message) {
        super(message);
    }

}
