package com.fdmgroup.BankingApplication.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fdmgroup.BankingApplication.dto.DepositRequestDTO;
import com.fdmgroup.BankingApplication.dto.TransferRequestDTO;
import com.fdmgroup.BankingApplication.dto.TransferResponseDTO;
import com.fdmgroup.BankingApplication.dto.WithdrawRequestDTO;
import com.fdmgroup.BankingApplication.exception.BankAccountNotFoundException;
import com.fdmgroup.BankingApplication.exception.InsufficientBalanceException;
import com.fdmgroup.BankingApplication.exception.InvalidAmountException;
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

    public BankAccount findBankAccountById(Long id) {
        return bankAccountRepository.findById(id)
               .orElseThrow(() -> new BankAccountNotFoundException("Bank account not found for ID: " + id));
    }
    
    @Transactional
    public BankAccountTransaction deposit(DepositRequestDTO req) {
        validateAmount(req.getAmount()); // no need (already handled by jakarta.validation)

        return processTransaction(req.getBankAccountId(), req.getAmount(), "Deposit");
    }
    
    @Transactional
    public BankAccountTransaction withdraw(WithdrawRequestDTO req) {
        validateAmount(req.getAmount()); // no need (already handled by jakarta.validation)
        
        checkSufficientBalance(req.getBankAccountId(), req.getAmount());
        return processTransaction(req.getBankAccountId(), -req.getAmount(), "Withdrawal");
    }
    
    @Transactional
    public TransferResponseDTO transfer(TransferRequestDTO req) {
        validateAmount(req.getAmount()); // no need (already handled by jakarta.validation)
        checkSufficientBalance(req.getFromBankAccountId(), req.getAmount());
        BankAccountTransaction fromTransaction = processTransaction(req.getFromBankAccountId(), -req.getAmount(), "Transfer to account " + req.getToBankAccountId());
        BankAccountTransaction toTransaction = processTransaction(req.getToBankAccountId(), req.getAmount(), "Transfer from account " + req.getFromBankAccountId());
        return new TransferResponseDTO(fromTransaction, toTransaction, req.getAmount());
    }

    public List<BankAccountTransaction> getTransactionsById(Long id) {
        BankAccount bankAccount = findBankAccountById(id);
        return bankAccount.getBankAccountTransactions();
    }
    
    // can remove (validation already handled by jakarta.validation)
    private void validateAmount(double amount) {
        if (amount <= 0) {
            throw new InvalidAmountException("Amount must be greater than 0");
        }
    }
    
    private void checkSufficientBalance(long bankAccountId, double amount) {
        BankAccount bankAccount = findBankAccountById(bankAccountId);
        if (bankAccount.getBalance() < amount) {
            throw new InsufficientBalanceException("Insufficient balance for transaction.");
        }
    }
    
    private BankAccountTransaction processTransaction(long bankAccountId, double amount, String description) {
        BankAccount bankAccount = findBankAccountById(bankAccountId);

        // Create and set up the BankAccountTransaction
        BankAccountTransaction bankAccountTransaction = new BankAccountTransaction();
        bankAccountTransaction.setBankAccount(bankAccount);
        bankAccountTransaction.setAmount(amount);
        bankAccountTransaction.setCreatedAt(LocalDateTime.now());
        bankAccountTransaction.setDescription(description);

        // Update the bank account balance
        bankAccount.setBalance(bankAccount.getBalance() + amount);

        // Save the transaction
        return bankAccountTransactionRepository.save(bankAccountTransaction);
    }

}
