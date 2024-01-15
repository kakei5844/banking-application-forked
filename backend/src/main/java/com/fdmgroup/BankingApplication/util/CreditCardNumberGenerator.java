package com.fdmgroup.BankingApplication.util;

import java.util.Random;

public class CreditCardNumberGenerator {
	
	public static String generateCreditCardNumber(String iin, int accountNumberLength) {
        String middleDigits = generateMiddleDigits(accountNumberLength);
        String cardWithoutChecksum = iin + middleDigits;
        char checksum = calculateLuhnChecksum(cardWithoutChecksum);
        return cardWithoutChecksum + checksum;
    }
	
	private static String generateMiddleDigits(int length) {
        StringBuilder builder = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < length; i++) {
            int digit = random.nextInt(10);
            builder.append(digit);
        }
        return builder.toString();
    }
	
	private static char calculateLuhnChecksum(String cardNumber) {
        int sum = 0;
        boolean alternate = false;
        for (int i = cardNumber.length() - 1; i >= 0; i--) {
            int n = Integer.parseInt(cardNumber.substring(i, i + 1));
            if (alternate) {
                n *= 2;
                if (n > 9) {
                    n = (n % 10) + 1;
                }
            }
            sum += n;
            alternate = !alternate;
        }
        return (char) ((10 - sum % 10) % 10 + '0');
    }

}
