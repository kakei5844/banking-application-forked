package com.fdmgroup.BankingApplication.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fdmgroup.BankingApplication.model.CreditCard;
import com.fdmgroup.BankingApplication.model.CreditCardTransaction;

@Repository
public interface CreditCardTransactionRepository extends JpaRepository<CreditCardTransaction, Long> {

    List<CreditCardTransaction> findByCreditCardAndBillIsNull(CreditCard c);
    
    List<CreditCardTransaction> findByCreditCardAndCreatedAtBetweenOrderByCreatedAtDesc(CreditCard creditCard, LocalDateTime startDate, LocalDateTime endDate);


}
