package com.fdmgroup.BankingApplication.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fdmgroup.BankingApplication.model.CreditCard;

@Repository
public interface CreditCardRepository extends JpaRepository<CreditCard, Long> {

	List<CreditCard> findByUserId(Long userId);

	boolean existsByCardNumber(String cardNumber);

}
