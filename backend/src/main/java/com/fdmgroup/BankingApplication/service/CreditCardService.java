package com.fdmgroup.BankingApplication.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.fdmgroup.BankingApplication.dto.CreditCardDTO;
import com.fdmgroup.BankingApplication.dto.CreditCardTransactionDTO;
import com.fdmgroup.BankingApplication.exception.CreditCardNotFoundException;
import com.fdmgroup.BankingApplication.exception.InsufficientCreditException;
import com.fdmgroup.BankingApplication.model.CreditCard;
import com.fdmgroup.BankingApplication.model.CreditCardTransaction;
import com.fdmgroup.BankingApplication.model.MerchantTypeCategory;
import com.fdmgroup.BankingApplication.model.User;
import com.fdmgroup.BankingApplication.repository.CreditCardRepository;
import com.fdmgroup.BankingApplication.repository.CreditCardTransactionRepository;
import com.fdmgroup.BankingApplication.util.CreditCardNumberGenerator;

@Service
public class CreditCardService {

	@Autowired
	private CreditCardRepository creditCardRepository;

	@Autowired
	private CreditCardTransactionRepository creditCardTransactionRepository;

	@Autowired
	private UserService userService;
	
    private static final int MAX_ATTEMPTS = 10;

	public List<CreditCardDTO> getCreditCardsForUser(Long userId) {
		return creditCardRepository.findByUserId(userId).stream().map(this::convertToDTO).collect(Collectors.toList());
	}

	private CreditCardDTO convertToDTO(CreditCard creditCard) {
		return new CreditCardDTO(creditCard.getId(), creditCard.getOutstandingBalance(),
				creditCard.getAvailableCredit(), creditCard.getCreditLimit());
	}

	public CreditCard findCreditCardByIdAndUsername(Long id, String username) {
		CreditCard creditCard = findCreditCardById(id);
		if (!creditCard.getUser().getUsername().equals(username)) {
			throw new AccessDeniedException("Access Denied: You are not the owner of this credit card ID: " + id);
		}
		return creditCard;
	}

	public CreditCard createCreditCard(double annualSalary, String cardType, String username) {
        User user = userService.getUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Username not found"));
        CreditCard creditCard = new CreditCard();

        // Set credit limit, available credit, outstanding balance, etc.
        creditCard.setCreditLimit(100000);
        creditCard.setAvailableCredit(100000);
        creditCard.setOutstandingBalance(0);

        creditCard.setType(cardType);
        creditCard.setUser(user);
        creditCard.setIssueDate(LocalDate.now());

        // Generate a unique Credit Card Number
        String cardNumber = generateUniqueCardNumber(cardType);
        creditCard.setCardNumber(cardNumber);

        user.getCreditCards().add(creditCard);
        return creditCardRepository.save(creditCard);
    }

	private String generateUniqueCardNumber(String cardType) {
        String cardNumber;
        boolean isUnique = false;
        int attempts = 0;
        do {
            cardNumber = generateCardNumberForType(cardType);
            isUnique = !creditCardRepository.existsByCardNumber(cardNumber);
            attempts++;
        } while (!isUnique && attempts < MAX_ATTEMPTS);

        if (!isUnique) {
            throw new RuntimeException("Unable to generate a unique credit card number after " + MAX_ATTEMPTS + " attempts.");
        }

        return cardNumber;
    }
	
	private String generateCardNumberForType(String cardType) {
		String iin;
        int accountNumberLength = 9; // Account number length for a total of 16 digits

        switch (cardType.toUpperCase()) {
            case "VISA":
                iin = "411111";
                break;
            case "MASTERCARD":
                iin = "510000";
                break;
            default:
                throw new IllegalArgumentException("Unsupported card type: " + cardType);
        }

        return CreditCardNumberGenerator.generateCreditCardNumber(iin, accountNumberLength);
    }

	public List<CreditCard> getCreditCardsByUsername(String username) {
		User user = userService.getUserByUsername(username)
				.orElseThrow(() -> new UsernameNotFoundException("Username not found"));
		return user.getCreditCards();
	}

	public CreditCardTransactionDTO purchase(long creditCardId, double amount, String merchantName, int mcc) {

		return convertToDTO(
				processTransaction(
					creditCardId, 
					amount, 
					"Purchase from " + merchantName,
					mcc
				)
		);
	}

	public List<CreditCard> getAllCreditCards() {
		return creditCardRepository.findAll();
	}

	private CreditCard findCreditCardById(Long id) {
		return creditCardRepository.findById(id)
				.orElseThrow(() -> new CreditCardNotFoundException("Credit card not found for ID: " + id));
	}

	public List<CreditCardTransactionDTO> getTransactionsByIdAndUsername(Long id, String username) {
		CreditCard creditCard = findCreditCardByIdAndUsername(id, username);
		return creditCard.getCreditCardTransactions().stream().map(t -> convertToDTO(t)).collect(Collectors.toList());
	}

	public List<CreditCardTransaction> getLastMonthTransactionsByCreditCard(CreditCard c) {
		return creditCardTransactionRepository.findByCreditCardAndCreatedAtBetween(c,
				LocalDateTime.now().minusMonths(1), LocalDateTime.now());
	}

	public CreditCardTransactionDTO convertToDTO(CreditCardTransaction transaction) {
		return new CreditCardTransactionDTO(transaction.getId(), transaction.getCreditCard().getId(),
				transaction.getAmount(), transaction.getDescription(), transaction.getCreatedAt());
	}

	public CreditCardTransaction processTransaction(long creditCardId, double amount, String description, int mcc) {
		CreditCard creditCard = findCreditCardById(creditCardId);

		// Check and update credit card balance and limit before proceeding?
		if (amount > creditCard.getAvailableCredit()) {
			throw new InsufficientCreditException("Insufficient available credit for the transaction.");
		}

		// Resolve merchant category from MCC
		MerchantTypeCategory merchantCategory = MerchantTypeCategory.findByMcc(mcc);

		// Create and set up the CreditCardTransaction
		CreditCardTransaction creditCardTransaction = new CreditCardTransaction();
		creditCardTransaction.setAmount(amount);
		creditCardTransaction.setCreatedAt(LocalDateTime.now());
		creditCardTransaction.setDescription(description);
		creditCardTransaction.setCreditCard(creditCard);
		creditCardTransaction.setMcc(mcc);
		creditCardTransaction.setMerchantCategory(merchantCategory);

		// Gain rewards based on mcc



		// Update credit card outstanding balance & available credit
		double newOutstandingBalance = creditCard.getOutstandingBalance() + amount;
		creditCard.setOutstandingBalance(newOutstandingBalance);
		double newAvailableCredit = creditCard.getAvailableCredit() - amount;
		creditCard.setAvailableCredit(newAvailableCredit);

		// Save the transaction
		return creditCardTransactionRepository.save(creditCardTransaction);
	}

}
