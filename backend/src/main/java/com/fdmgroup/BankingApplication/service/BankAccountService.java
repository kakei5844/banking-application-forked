package com.fdmgroup.BankingApplication.service;

import java.time.LocalDateTime;
import java.time.temporal.TemporalAdjusters;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

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

	@Transactional
	public BankAccountTransactionDTO deposit(DepositRequestDTO req) {
		BankAccountTransaction transaction = processTransaction(req.getBankAccountNumber(), req.getAmount(), "Deposit");
		return convertToDTO(transaction);
	}

	@Transactional
	public BankAccountTransactionDTO withdraw(WithdrawRequestDTO req) {
		BankAccountTransaction transaction = processTransaction(req.getBankAccountNumber(), -req.getAmount(),
				"Withdrawal");
		return convertToDTO(transaction);
	}

	@Transactional
	public BankAccountTransactionDTO transfer(TransferRequestDTO req) {
		processTransaction(req.getToBankAccountNumber(), req.getAmount(),
				"Transferred from account " + req.getFromBankAccountNumber());
		BankAccountTransaction fromTransaction = processTransaction(req.getFromBankAccountNumber(), -req.getAmount(),
				"Transfer to account " + req.getToBankAccountNumber());
		return convertToDTO(fromTransaction);
	}

	public List<BankAccountTransactionDTO> getTransactionsById(Long id, String username) {
		BankAccount bankAccount = findBankAccountByIdAndUsername(id, username);
		List<BankAccountTransaction> transactions = bankAccountTransactionRepository
				.findByBankAccountOrderByCreatedAtDesc(bankAccount);
		return transactions.stream().map(this::convertToDTO).collect(Collectors.toList());
	}

	public List<BankAccountTransactionDTO> getTransactionsByMonthAndYear(Long id, int month, int year, String username) {
		BankAccount bankAccount = findBankAccountByIdAndUsername(id, username);
		LocalDateTime startOfMonth = LocalDateTime.of(year, month, 1, 0, 0);
		LocalDateTime endOfMonth = startOfMonth.with(TemporalAdjusters.lastDayOfMonth()).withHour(23).withMinute(59)
				.withSecond(59);

		List<BankAccountTransaction> transactions = bankAccountTransactionRepository
				.findByBankAccountAndCreatedAtBetweenOrderByCreatedAtDesc(bankAccount, startOfMonth, endOfMonth);
		return transactions.stream().map(this::convertToDTO).collect(Collectors.toList());
	}
	
	public List<BankAccountTransactionDTO> getTransactionsByYear(Long id, int year, String username) {
	    BankAccount bankAccount = findBankAccountByIdAndUsername(id, username);
	    LocalDateTime startOfYear = LocalDateTime.of(year, 1, 1, 0, 0);
	    LocalDateTime endOfYear = LocalDateTime.of(year, 12, 31, 23, 59, 59);

	    List<BankAccountTransaction> transactions = bankAccountTransactionRepository.findByBankAccountAndCreatedAtBetweenOrderByCreatedAtDesc(bankAccount, startOfYear, endOfYear);
	    return transactions.stream().map(this::convertToDTO).collect(Collectors.toList());
	}

	private BankAccount findBankAccountById(Long id) {
		return bankAccountRepository.findById(id)
				.orElseThrow(() -> new BankAccountNotFoundException("Bank account not found for ID: " + id));
	}

	public BankAccountTransaction processTransaction(String bankAccountNumber, double amount, String description) {
		BankAccount bankAccount = findBankAccountByNumber(bankAccountNumber);
		checkSufficientBalance(bankAccount, amount);

		double newBalance = bankAccount.getBalance() + amount;
		bankAccount.setBalance(newBalance);
		bankAccountRepository.save(bankAccount);

		BankAccountTransaction bankAccountTransaction = new BankAccountTransaction();
		bankAccountTransaction.setBankAccount(bankAccount);
		bankAccountTransaction.setAmount(amount);
		bankAccountTransaction.setDescription(description);
		bankAccountTransaction.setCreatedAt(LocalDateTime.now());
		bankAccountTransaction.setUpdatedBalance(newBalance);
		return bankAccountTransactionRepository.save(bankAccountTransaction);
	}

	public BankAccount findBankAccountByNumber(String accountNumber) {
		return bankAccountRepository.findByAccountNumber(accountNumber).orElseThrow(
				() -> new BankAccountNotFoundException("Bank account not found for account number: " + accountNumber));
	}

	private boolean checkSufficientBalance(BankAccount bankAccount, double amount) {
		if (bankAccount.getBalance() + amount < 0) {
			throw new InsufficientBalanceException("Insufficient balance for transaction.");
		}
		return true;
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

    public BankAccount findBankAccountByIdAndUsername(Long id, String username) {
		BankAccount bankAccount = findBankAccountById(id);
		if (!bankAccount.getUser().getUsername().equals(username)) {
			throw new AccessDeniedException("Access Denied: You are not the owner of this bank account ID: " + id);
		}
		return bankAccount;
    }

}
