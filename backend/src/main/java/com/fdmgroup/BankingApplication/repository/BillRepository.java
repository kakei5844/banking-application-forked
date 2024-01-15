package com.fdmgroup.BankingApplication.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fdmgroup.BankingApplication.model.Bill;
import com.fdmgroup.BankingApplication.model.CreditCard;

@Repository
public interface BillRepository extends JpaRepository<Bill, Long> {

    Bill findFirstByCreditCardOrderByIssueDateDesc(CreditCard creditCard);

    List<Bill> findByCreditCardOrderByIssueDateDesc(CreditCard creditCard);

}
