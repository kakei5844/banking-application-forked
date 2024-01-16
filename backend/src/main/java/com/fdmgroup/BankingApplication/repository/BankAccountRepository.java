package com.fdmgroup.BankingApplication.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fdmgroup.BankingApplication.model.BankAccount;

@Repository
public interface BankAccountRepository extends JpaRepository<BankAccount, Long> {

	List<BankAccount> findByUserId(Long userId);

	boolean existsByAccountNumber(String accountNumber);

	Optional<BankAccount> findByAccountNumber(String accountNumber);

}
