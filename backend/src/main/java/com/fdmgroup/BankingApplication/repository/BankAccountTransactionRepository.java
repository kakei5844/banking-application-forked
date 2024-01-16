package com.fdmgroup.BankingApplication.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fdmgroup.BankingApplication.model.BankAccount;
import com.fdmgroup.BankingApplication.model.BankAccountTransaction;

@Repository
public interface BankAccountTransactionRepository extends JpaRepository<BankAccountTransaction, Long> {

    List<BankAccountTransaction> findByBankAccountOrderByCreatedAtDesc(BankAccount bankAccount);


}
