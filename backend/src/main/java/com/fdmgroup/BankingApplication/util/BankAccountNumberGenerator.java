package com.fdmgroup.BankingApplication.util;

import java.util.Random;

public class BankAccountNumberGenerator {

	public static String generateAccountNumber(int length) {
		Random random = new Random();
		StringBuilder accountNumber = new StringBuilder();

		for (int i = 0; i < length; i++) {
			int digit = random.nextInt(10);
			accountNumber.append(digit);
		}

		return accountNumber.toString();
	}

}
