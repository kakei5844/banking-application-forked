package com.fdmgroup.BankingApplication.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fdmgroup.BankingApplication.dto.BankAccountDTO;
import com.fdmgroup.BankingApplication.dto.BankAccountTransactionDTO;
import com.fdmgroup.BankingApplication.dto.DepositRequestDTO;
import com.fdmgroup.BankingApplication.dto.TransferRequestDTO;
import com.fdmgroup.BankingApplication.dto.WithdrawRequestDTO;
import com.fdmgroup.BankingApplication.exception.BankAccountNotFoundException;
import com.fdmgroup.BankingApplication.exception.InsufficientBalanceException;
import com.fdmgroup.BankingApplication.model.BankAccount;
import com.fdmgroup.BankingApplication.model.BankAccountTransaction;
import com.fdmgroup.BankingApplication.repository.BankAccountRepository;
import com.fdmgroup.BankingApplication.repository.BankAccountTransactionRepository;

import jakarta.transaction.Transactional;

@Service
public class BankAccountService {

	@Autowired
	private BankAccountRepository bankAccountRepository;

	@Autowired
	private BankAccountTransactionRepository bankAccountTransactionRepository;

	public List<BankAccountDTO> getBankAccountsForUser(Long userId) {
		return bankAccountRepository.findByUserId(userId).stream().map(this::convertToDTO).collect(Collectors.toList());
	}

	private BankAccountDTO convertToDTO(BankAccount bankAccount) {
		return new BankAccountDTO(bankAccount.getId(), bankAccount.getBalance());
	}

	public BankAccount findBankAccountById(Long id) {
		return bankAccountRepository.findById(id)
				.orElseThrow(() -> new BankAccountNotFoundException("Bank account not found for ID: " + id));
	}
	
	public BankAccount findBankAccountByNumber(String accountNumber) {
	    return bankAccountRepository.findByAccountNumber(accountNumber)
	            .orElseThrow(() -> new BankAccountNotFoundException("Bank account not found for account number: " + accountNumber));
	}

	@Transactional
	public BankAccountTransactionDTO deposit(DepositRequestDTO req) {
		BankAccountTransaction transaction = processTransaction(req.getBankAccountNumber(), req.getAmount(), "Deposit");
		return convertToDTO(transaction);
	}

	@Transactional
	public BankAccountTransactionDTO withdraw(WithdrawRequestDTO req) {
		checkSufficientBalance(req.getBankAccountNumber(), req.getAmount());
		BankAccountTransaction transaction = processTransaction(req.getBankAccountNumber(), -req.getAmount(), "Withdrawal");
		return convertToDTO(transaction);
	}

	@Transactional
	public BankAccountTransactionDTO transfer(TransferRequestDTO req) {
		checkSufficientBalance(req.getFromBankAccountNumber(), req.getAmount());
		processTransaction(req.getToBankAccountNumber(), req.getAmount(),
				"Transfer from account " + req.getFromBankAccountNumber());
		BankAccountTransaction fromTransaction = processTransaction(req.getFromBankAccountNumber(), -req.getAmount(),
				"Transfer to account " + req.getToBankAccountNumber());
		return convertToDTO(fromTransaction);
	}

	public List<BankAccountTransactionDTO> getTransactionsById(Long id) {
		BankAccount bankAccount = findBankAccountById(id);
		List<BankAccountTransaction> transactions = bankAccountTransactionRepository.findByBankAccountOrderByCreatedAtDesc(bankAccount);
		return transactions.stream().map(this::convertToDTO).collect(Collectors.toList());
	}

	private void checkSufficientBalance(String bankAccountNumber, double amount) {
		BankAccount bankAccount = findBankAccountByNumber(bankAccountNumber);
		if (bankAccount.getBalance() < amount) {
			throw new InsufficientBalanceException("Insufficient balance for transaction.");
		}
	}

	public BankAccountTransaction processTransaction(String bankAccountNumber, double amount, String description) {
	    BankAccount bankAccount = findBankAccountByNumber(bankAccountNumber);

		// Update the balance
		double newBalance = bankAccount.getBalance() + amount;
		bankAccount.setBalance(newBalance);
		bankAccountRepository.save(bankAccount); // Save the updated bank account

		// Create and save transaction with updated balance
		BankAccountTransaction bankAccountTransaction = new BankAccountTransaction();
		bankAccountTransaction.setBankAccount(bankAccount);
		bankAccountTransaction.setAmount(amount);
		bankAccountTransaction.setDescription(description);
		bankAccountTransaction.setCreatedAt(LocalDateTime.now());
		bankAccountTransaction.setUpdatedBalance(newBalance);
		return bankAccountTransactionRepository.save(bankAccountTransaction);
	}

	private BankAccountTransactionDTO convertToDTO(BankAccountTransaction transaction) {
		BankAccountTransactionDTO dto = new BankAccountTransactionDTO();
		dto.setId(transaction.getId());
		dto.setBankAccountNumber(transaction.getBankAccount().getAccountNumber());
		dto.setAmount(transaction.getAmount());
		dto.setDescription(transaction.getDescription());
		dto.setCreatedAt(transaction.getCreatedAt());
		dto.setUpdatedBalance(transaction.getUpdatedBalance());
		return dto;
	}

}
