package com.fdmgroup.BankingApplication.dto;

import java.time.LocalDateTime;

public record CreditCardTransactionDTO(
                Long id,
                Long creditCardId,
                double amount,
                String description,
                LocalDateTime createdAt
) {

}
