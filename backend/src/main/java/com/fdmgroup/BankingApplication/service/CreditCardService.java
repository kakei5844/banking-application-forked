package com.fdmgroup.BankingApplication.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
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
import com.fdmgroup.BankingApplication.model.Bill;
import com.fdmgroup.BankingApplication.model.CreditCard;
import com.fdmgroup.BankingApplication.model.CreditCardTransaction;
import com.fdmgroup.BankingApplication.model.MerchantTypeCategory;
import com.fdmgroup.BankingApplication.model.User;
import com.fdmgroup.BankingApplication.repository.BillRepository;
import com.fdmgroup.BankingApplication.repository.CreditCardRepository;
import com.fdmgroup.BankingApplication.repository.CreditCardTransactionRepository;
import com.fdmgroup.BankingApplication.util.CreditCardNumberGenerator;

import static com.fdmgroup.BankingApplication.model.MerchantTypeCategory.*;

@Service
public class CreditCardService {

	@Autowired
	private CreditCardRepository creditCardRepository;

	@Autowired
	private CreditCardTransactionRepository creditCardTransactionRepository;

	@Autowired
	private UserService userService;

	@Autowired
	private BillRepository billRepository;

	private static final int MAX_ATTEMPTS = 10;

	public CreditCard createCreditCard(double annualSalary, String cardType, String username) {
		User user = userService.getUserByUsername(username)
				.orElseThrow(() -> new UsernameNotFoundException("Username not found"));
		CreditCard creditCard = new CreditCard();

		creditCard.setCreditLimit(100000);
		creditCard.setAvailableCredit(100000);
		creditCard.setOutstandingBalance(0);

		creditCard.setType(cardType);
		creditCard.setUser(user);
		creditCard.setIssueDate(LocalDate.now());
		creditCard.setCashback(0);

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
			throw new RuntimeException(
					"Unable to generate a unique credit card number after " + MAX_ATTEMPTS + " attempts.");
		}

		return cardNumber;
	}

	private String generateCardNumberForType(String cardType) {
		String iin;
		int accountNumberLength = 9;

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

	public CreditCard findCreditCardByIdAndUsername(Long id, String username) {
		CreditCard creditCard = findCreditCardById(id);
		if (!creditCard.getUser().getUsername().equals(username)) {
			throw new AccessDeniedException("Access Denied: You are not the owner of this credit card ID: " + id);
		}
		return creditCard;
	}

	public List<CreditCardDTO> getCreditCardsForUser(Long userId) {
		return creditCardRepository.findByUserId(userId).stream().map(this::convertToDTO).collect(Collectors.toList());
	}

	private CreditCardDTO convertToDTO(CreditCard creditCard) {
		return new CreditCardDTO(creditCard.getId(), creditCard.getOutstandingBalance(),
				creditCard.getAvailableCredit(), creditCard.getCreditLimit());
	}

	public CreditCardTransactionDTO purchase(long creditCardId, double amount, String merchantName, int mcc) {
		return convertToDTO(processTransaction(creditCardId, amount, "Purchase from " + merchantName, mcc));
	}
	
	public List<CreditCardTransactionDTO> getTransactionsByIdAndUsername(Long id, String username) {
		CreditCard creditCard = findCreditCardByIdAndUsername(id, username);
		return creditCard.getCreditCardTransactions().stream().map(t -> convertToDTO(t)).collect(Collectors.toList());
	}

	public List<CreditCard> getAllCreditCards() {
		return creditCardRepository.findAll();
	}

	private CreditCard findCreditCardById(Long id) {
		return creditCardRepository.findById(id)
				.orElseThrow(() -> new CreditCardNotFoundException("Credit card not found for ID: " + id));
	}

	public List<CreditCardTransaction> getTransactionsToBeBilledByCreditCard(CreditCard c) {
		return creditCardTransactionRepository.findByCreditCardAndBillIsNull(c);
	}

	public CreditCardTransactionDTO convertToDTO(CreditCardTransaction transaction) {
		return new CreditCardTransactionDTO(transaction.getId(), transaction.getCreditCard().getId(),
				transaction.getAmount(), transaction.getDescription(), transaction.getCreatedAt());
	}

	public CreditCardTransaction processTransaction(long creditCardId, double amount, String description, int mcc) {
		CreditCard creditCard = findCreditCardById(creditCardId);

		if (amount > creditCard.getAvailableCredit()) {
			throw new InsufficientCreditException("Insufficient available credit for the transaction.");
		}

		MerchantTypeCategory merchantCategory = MerchantTypeCategory.findByMcc(mcc);

		if (merchantCategory != UNKNOWN && merchantCategory.getCashbackRate() != 0) {
			double cashBack = toTwoDecimalPlaces(merchantCategory.getCashbackRate() * amount);
			creditCard.setCashback(creditCard.getCashback() + cashBack);
			description = description.concat("\n" + cashBack + " cashbacks earned");
		}

		CreditCardTransaction creditCardTransaction = new CreditCardTransaction();
		creditCardTransaction.setAmount(amount);
		creditCardTransaction.setCreatedAt(LocalDateTime.now());
		creditCardTransaction.setDescription(description);
		creditCardTransaction.setCreditCard(creditCard);
		creditCardTransaction.setMcc(mcc);
		creditCardTransaction.setMerchantCategory(merchantCategory);

		double newOutstandingBalance = toTwoDecimalPlaces(creditCard.getOutstandingBalance() + amount);
		creditCard.setOutstandingBalance(newOutstandingBalance);
		double newAvailableCredit = creditCard.getCreditLimit() - creditCard.getOutstandingBalance();
		creditCard.setAvailableCredit(newAvailableCredit);

		return creditCardTransactionRepository.save(creditCardTransaction);
	}

	public CreditCard payCreditWithCashback(CreditCard creditCard) {
		double accumulatedCashback = toTwoDecimalPlaces(creditCard.getCashback());
		if (accumulatedCashback == 0) { return creditCard; }

		creditCard.setOutstandingBalance(toTwoDecimalPlaces(creditCard.getOutstandingBalance() - accumulatedCashback));

		creditCard.setAvailableCredit(creditCard.getCreditLimit() - creditCard.getOutstandingBalance());

		creditCard.setCashback(0);

		CreditCardTransaction transaction = new CreditCardTransaction();
		transaction.setAmount(accumulatedCashback * -1);
		transaction.setCreatedAt(LocalDateTime.now());
		transaction.setCreditCard(creditCard);
		transaction.setDescription("Offset by Cashback");
		transaction.setMcc(0);
		transaction.setMerchantCategory(UNKNOWN);

		creditCardTransactionRepository.save(transaction);

		return creditCardRepository.save(creditCard);
	}

	public void generateLatePaymentCharge() {
		List<CreditCard> creditCards = this.getAllCreditCards();
		for (CreditCard creditCard : creditCards) {
			Bill bill = billRepository.findFirstByCreditCardOrderByIssueDateDesc(creditCard);
			double balanceDue = bill.getBalanceDue();
			double totalRepaymentAmount = bill.getTotalRepaymentAmount();
			double minimumPayment = bill.getMinimumPayment();

			double interestCharge = (balanceDue - totalRepaymentAmount) * 0.02;
			double interestAndPenaltyCharge = (balanceDue - totalRepaymentAmount) * (0.02 + 0.04);

			if (totalRepaymentAmount < balanceDue) {
				CreditCardTransaction transaction = new CreditCardTransaction();

				if (totalRepaymentAmount >= minimumPayment) {
					transaction.setAmount(interestCharge);
					transaction.setCreatedAt(LocalDateTime.now());
					transaction.setCreditCard(creditCard);
					transaction.setDescription("Overdue Interest Charge");
					transaction.setMcc(0);
					transaction.setMerchantCategory(UNKNOWN);

					creditCard.setOutstandingBalance(creditCard.getOutstandingBalance() + interestCharge);

					creditCard.setAvailableCredit(creditCard.getAvailableCredit() - interestCharge);
				} else {
					transaction.setAmount(interestAndPenaltyCharge);
					transaction.setCreatedAt(LocalDateTime.now());
					transaction.setCreditCard(creditCard);
					transaction.setDescription("Overdue Interest Charge and Extra Penalty");
					transaction.setMcc(0);
					transaction.setMerchantCategory(UNKNOWN);

					creditCard.setOutstandingBalance(creditCard.getOutstandingBalance() + interestAndPenaltyCharge);

					creditCard.setAvailableCredit(creditCard.getAvailableCredit() - interestAndPenaltyCharge);
				}

				creditCardTransactionRepository.save(transaction);
				creditCardRepository.save(creditCard);
			}
		}
	}

	private double toTwoDecimalPlaces(double value) {
		return new BigDecimal(value).setScale(2, RoundingMode.HALF_UP).doubleValue();
	}
}
