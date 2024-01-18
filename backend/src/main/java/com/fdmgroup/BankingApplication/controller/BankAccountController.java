package com.fdmgroup.BankingApplication.controller;

import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fdmgroup.BankingApplication.BankingApplication;
import com.fdmgroup.BankingApplication.dto.BankAccountTransactionDTO;
import com.fdmgroup.BankingApplication.dto.DepositRequestDTO;
import com.fdmgroup.BankingApplication.dto.TransferRequestDTO;
import com.fdmgroup.BankingApplication.dto.WithdrawRequestDTO;
import com.fdmgroup.BankingApplication.model.BankAccount;
import com.fdmgroup.BankingApplication.security.UserPrincipal;
import com.fdmgroup.BankingApplication.service.BankAccountService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/bank-accounts")
@PreAuthorize("hasAuthority('USER')")
public class BankAccountController {
	private static final Logger LOGGER = LogManager.getLogger(BankingApplication.class);

	@Autowired
	BankAccountService bankAccountService;

	@GetMapping("/{bankAccountId}")
	public ResponseEntity<?> getBankAccount(@PathVariable("bankAccountId") Long id, @AuthenticationPrincipal UserPrincipal currentUser) {
		BankAccount bankAccount = bankAccountService.findBankAccountByIdAndUsername(id, currentUser.getUsername());
		LOGGER.info("BankAccountController: Get Bank Account request received with Bank Account: {}, and UserID: {}", currentUser.getId());
		return new ResponseEntity<>(bankAccount, HttpStatus.OK);
	}


	@PostMapping("/deposit")
	public ResponseEntity<?> deposit(@Valid @RequestBody DepositRequestDTO req, @AuthenticationPrincipal UserPrincipal currentUser) {
		LOGGER.info("BankAccountController: Deposit request received with body: {}", req.toString());
		BankAccountTransactionDTO savedBankAccountTransaction = bankAccountService.deposit(req.getBankAccountNumber(), req.getAmount(), currentUser.getUsername());
		return new ResponseEntity<>(savedBankAccountTransaction, HttpStatus.OK);
	}

	@PostMapping("/withdraw")
	public ResponseEntity<?> withdraw(@Valid @RequestBody WithdrawRequestDTO req, @AuthenticationPrincipal UserPrincipal currentUser) {
		LOGGER.info("BankAccountController: Withdraw request received with body: {}", req.toString());
		BankAccountTransactionDTO savedBankAccountTransaction = bankAccountService.withdraw(req.getBankAccountNumber(), req.getAmount(), currentUser.getUsername());
		return new ResponseEntity<>(savedBankAccountTransaction, HttpStatus.OK);
	}

	@PostMapping("/transfer")
	public ResponseEntity<?> transfer(@Valid @RequestBody TransferRequestDTO req, @AuthenticationPrincipal UserPrincipal currentUser) {
		LOGGER.info("BankAccountController: Transfer request received with body: {}", req.toString());
		BankAccountTransactionDTO response = bankAccountService.transfer(req.getFromBankAccountNumber(), req.getToBankAccountNumber(), req.getAmount(), currentUser.getUsername());
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	@GetMapping("/{bankAccountId}/history")
	public ResponseEntity<?> getTransactionHistory(
			@PathVariable("bankAccountId") Long id,
			@RequestParam(required = false) Integer month, 
			@RequestParam(required = false) Integer year, 
			@AuthenticationPrincipal UserPrincipal currentUser) {

		List<BankAccountTransactionDTO> history;
		
		if (year != null) {
			if (month != null) {
				LOGGER.info("BankAccountController: Get Transaction History request received for Bank Account ID: {}, month: {}, year: {}, userId: {}", id, month, year, currentUser.getId());
				history = bankAccountService.getTransactionsByMonthAndYear(id, month, year, currentUser.getUsername());
			} else {
				LOGGER.info("BankAccountController: Get Transaction History request received for Bank Account ID: {}, year: {}, userId: {}", id, year, currentUser.getId());
				history = bankAccountService.getTransactionsByYear(id, year, currentUser.getUsername());
			}
		} else {
			LOGGER.info("BankAccountController: Get Transaction History request received for Bank Account ID: {}, userId: {}", id, currentUser.getId());
			history = bankAccountService.getTransactionsById(id, currentUser.getUsername());
		}
		return new ResponseEntity<>(history, HttpStatus.OK);
	}

}
