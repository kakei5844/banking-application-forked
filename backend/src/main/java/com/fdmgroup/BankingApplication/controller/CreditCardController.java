package com.fdmgroup.BankingApplication.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fdmgroup.BankingApplication.dto.CreditCardRequestDTO;
import com.fdmgroup.BankingApplication.model.BankAccount;
import com.fdmgroup.BankingApplication.model.CreditCard;
import com.fdmgroup.BankingApplication.service.CreditCardService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/credit-cards")
public class CreditCardController {

    @Autowired
    private CreditCardService creditCardService;

    @PostMapping("/apply")
	public ResponseEntity<?> applyCreditCard(@Valid @RequestBody CreditCardRequestDTO req) {
		CreditCard savedCreditCard = creditCardService.saveCreditCard(req);
		return new ResponseEntity<>(savedCreditCard, HttpStatus.CREATED);
	}

}
