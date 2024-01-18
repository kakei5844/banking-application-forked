package com.fdmgroup.BankingApplication.controller;

import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
import com.fdmgroup.BankingApplication.service.BankAccountService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/bank-accounts")
@PreAuthorize("hasAuthority('USER')")
@Slf4j
public class BankAccountController {
	private static final Logger LOGGER = LogManager.getLogger(BankingApplication.class);

	@Autowired
	BankAccountService bankAccountService;

	@GetMapping("/{bankAccountId}")
	public ResponseEntity<?> getBankAccount(@PathVariable("bankAccountId") Long id) {

		LOGGER.info("BankAccountController: Get Bank Account request received with Bank Account: {}", id);
		try {
			BankAccount bankAccount = bankAccountService.findBankAccountById(id);
			LOGGER.info("BankAccountController: Get Bank Account request accepted with ResponseStatus: {}",  HttpStatus.OK);
			return new ResponseEntity<>(bankAccount, HttpStatus.OK);
		} catch (Exception e) {
			LOGGER.error("BankAccountController: Error retrieving Bank Account with ResponseStatus, {}",HttpStatus.INTERNAL_SERVER_ERROR);
            return new ResponseEntity<>("Error retrieving Bank Account", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/deposit")
	public ResponseEntity<?> deposit(@Valid @RequestBody DepositRequestDTO req) {

		// LOGGER.info("BankAccountController: Deposit request received with body: {}", req.toString());
		try {
			BankAccountTransactionDTO savedBankAccountTransaction = bankAccountService.deposit(req);
			LOGGER.info("BankAccountController: Deposit request approved with Bank Account Transaction: {}", req.toString());
			return new ResponseEntity<>(savedBankAccountTransaction, HttpStatus.OK);
		} catch (Exception e) {
			LOGGER.error("BankAccountController: Error processing deposit with Response Status: {}",HttpStatus.INTERNAL_SERVER_ERROR);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
		}
	}

	@PostMapping("/withdraw")
	public ResponseEntity<?> withdraw(@Valid @RequestBody WithdrawRequestDTO req) {
		try {
			BankAccountTransactionDTO savedBankAccountTransaction = bankAccountService.withdraw(req);
			LOGGER.info("BankAccountController: Withdraw request approved with Bank Account Transaction: {}", req.toString());
			return new ResponseEntity<>(savedBankAccountTransaction, HttpStatus.OK);
		} catch (InvalidAmountException | InsufficientBalanceException e) {
            LOGGER.error("BankAccountController: Invalid or insufficient balance during withdraw: {}",HttpStatus.BAD_REQUEST);
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            LOGGER.error("BankAccountController: Error processing withdraw, {}",HttpStatus.INTERNAL_SERVER_ERROR);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
	}

	@PostMapping("/transfer")
	public ResponseEntity<?> transfer(@Valid @RequestBody TransferRequestDTO req) {
		try {
			BankAccountTransactionDTO response = bankAccountService.transfer(req);
			LOGGER.info("BankAccountController: Transfer request approved with Bank Account Transaction: {}", req.toString());
			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (InvalidAmountException | InsufficientBalanceException e) {
			LOGGER.error("BankAccountController: Invalid or insufficient balance. \nTransfer request rejected with Bank Account Transaction: {}", req.toString());
	        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			LOGGER.error("BankAccountController: Error processing transfer, {}",HttpStatus.INTERNAL_SERVER_ERROR);
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
		}
	}

	@GetMapping("/{bankAccountId}/history")
	public ResponseEntity<?> getTransactionHistory(@PathVariable("bankAccountId") Long id) {
		try {
			List<BankAccountTransactionDTO> history = bankAccountService.getTransactionsById(id);
			LOGGER.info("BankAccountController: Get Transaction History request received for Bank Account ID: {}", id);
			return new ResponseEntity<>(history, HttpStatus.OK);
		} catch (Exception e) {
			LOGGER.error("BankAccountController: Error retrieving transaction history, {}.", HttpStatus.INTERNAL_SERVER_ERROR);
	        return new ResponseEntity<>("Error retrieving transaction history", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
