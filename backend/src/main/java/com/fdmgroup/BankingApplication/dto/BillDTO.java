package com.fdmgroup.BankingApplication.dto;

import java.time.LocalDate;
import java.util.List;

public record BillDTO(
                Long id, 
                LocalDate issueDate, 
                LocalDate dueDate, 
                double balanceDue, 
                double minimumPayment, 
                double totalRepaymentAmount, 
                double remainingBalance,
                List<CreditCardTransactionDTO> billedTransactionsDTO
            ) {
}
