package com.fdmgroup.BankingApplication.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fdmgroup.BankingApplication.model.BankAccount;

@Repository
public interface BankAccountRepository extends JpaRepository<BankAccount, Long> {

}
