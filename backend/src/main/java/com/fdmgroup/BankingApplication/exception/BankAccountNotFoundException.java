package com.fdmgroup.BankingApplication.exception;

public class BankAccountNotFoundException extends RuntimeException {
	
	public BankAccountNotFoundException(String message) {
		super(message);
	}

}
