package com.fdmgroup.BankingApplication.dto;

import java.time.LocalDateTime;
import java.util.List;

public record BillDTO(
                Long id, 
                LocalDateTime issueDate, 
                LocalDateTime dueDate, 
                double balanceDue, 
                double minimumPayment, 
                double totalRepaymentAmount, 
                double remainingBalance,
                List<CreditCardTransactionDTO> billedTransactionsDTO
            ) {
}
