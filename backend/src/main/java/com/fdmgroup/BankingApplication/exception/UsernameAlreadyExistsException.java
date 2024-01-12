package com.fdmgroup.BankingApplication.exception;

public class UsernameAlreadyExistsException extends RuntimeException {
	
    public UsernameAlreadyExistsException(String message) {
        super(message);
    }
    
}
