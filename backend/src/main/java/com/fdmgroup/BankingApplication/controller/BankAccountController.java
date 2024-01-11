package com.fdmgroup.BankingApplication.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fdmgroup.BankingApplication.dto.DepositRequestDTO;
import com.fdmgroup.BankingApplication.dto.TransferRequestDTO;
import com.fdmgroup.BankingApplication.dto.TransferResponseDTO;
import com.fdmgroup.BankingApplication.dto.WithdrawRequestDTO;
import com.fdmgroup.BankingApplication.exception.InsufficientBalanceException;
import com.fdmgroup.BankingApplication.exception.InvalidAmountException;
import com.fdmgroup.BankingApplication.model.BankAccount;
import com.fdmgroup.BankingApplication.model.BankAccountTransaction;
import com.fdmgroup.BankingApplication.service.BankAccountService;

import jakarta.validation.Valid;

// TO IMPLEMENT ROLE-BASED ACCESS FOR ENDPOINTS --- NO NEED?, AUTHORITIES ALREADY INCLUDE ROLE)
// 
// add @PreAuthorize annotations to endpoints for specific roles --- you mean user PreAuthorize to replace requestMatchers?

@RestController
@RequestMapping("/api/v1/bank-accounts")
public class BankAccountController {

	@Autowired
	BankAccountService bankAccountService;

	@GetMapping("/{bankAccountId}")
	public ResponseEntity<?> getBankAccount(@PathVariable("bankAccountId") Long id) {
		BankAccount bankAccount = bankAccountService.findBankAccountById(id);
		return new ResponseEntity<>(bankAccount, HttpStatus.OK);
	}

	@PostMapping("/deposit")
	public ResponseEntity<?> deposit(@Valid @RequestBody DepositRequestDTO req) {

		BankAccountTransaction savedBankAccountTransaction = bankAccountService.deposit(req);
		return new ResponseEntity<>(savedBankAccountTransaction, HttpStatus.OK);
	}

	@PostMapping("/withdraw")
	public ResponseEntity<?> withdraw(@Valid @RequestBody WithdrawRequestDTO req) {
		try {
			BankAccountTransaction savedBankAccountTransaction = bankAccountService.withdraw(req);
			return new ResponseEntity<>(savedBankAccountTransaction, HttpStatus.OK);
		} catch (InvalidAmountException | InsufficientBalanceException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST); // need to ask front-end they want an error message or an error object
		}
	}

	@PostMapping("/transfer")
	public ResponseEntity<?> transfer(@Valid @RequestBody TransferRequestDTO req) {
		try {
			TransferResponseDTO response = bankAccountService.transfer(req);
			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (InvalidAmountException | InsufficientBalanceException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/{bankAccountId}/history")
	public ResponseEntity<?> getTransactionHistory(@PathVariable("bankAccountId") Long id) {
		List<BankAccountTransaction> history = bankAccountService.getTransactionsById(id);
		return new ResponseEntity<>(history, HttpStatus.OK);
	}

}
