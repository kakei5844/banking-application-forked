package com.fdmgroup.BankingApplication.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fdmgroup.BankingApplication.model.BankAccount;
import com.fdmgroup.BankingApplication.model.BankAccountTransaction;

@Repository
public interface BankAccountTransactionRepository extends JpaRepository<BankAccountTransaction, Long> {

    List<BankAccountTransaction> findByBankAccountOrderByCreatedAtDesc(BankAccount bankAccount);

	List<BankAccountTransaction> findByBankAccountAndCreatedAtBetweenOrderByCreatedAtDesc(BankAccount bankAccount,
			LocalDateTime startOfMonth, LocalDateTime endOfMonth);

}
