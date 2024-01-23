package com.fdmgroup.BankingApplication.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.fdmgroup.BankingApplication.dto.UserRegistrationRequestDTO;
import com.fdmgroup.BankingApplication.exception.UsernameAlreadyExistsException;
import com.fdmgroup.BankingApplication.model.BankAccount;
import com.fdmgroup.BankingApplication.model.User;
import com.fdmgroup.BankingApplication.repository.BankAccountRepository;
import com.fdmgroup.BankingApplication.repository.UserRepository;
import com.fdmgroup.BankingApplication.security.Role;
import com.fdmgroup.BankingApplication.util.BankAccountNumberGenerator;

import jakarta.transaction.Transactional;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

    @Autowired
    private BankAccountRepository bankAccountRepository;

	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	private static final int ACCOUNT_NUMBER_LENGTH = 16;
	private static final int MAX_ATTEMPTS = 10;

	@Transactional
	public User saveUser(UserRegistrationRequestDTO req) throws UsernameAlreadyExistsException {

		if (userRepository.findByUsername(req.getUsername()).isPresent()) {
			throw new UsernameAlreadyExistsException("Username already exists");
		}

		User user = new User();
		user.setUsername(req.getUsername());
		user.setPassword(passwordEncoder.encode(req.getPassword()));
		user.setFirstName(req.getFirstName());
		user.setLastName(req.getLastName());
		user.setPhoneNumber(req.getPhoneNumber());
		user.setRole(req.getRole());

		if (user.getRole() == Role.USER) {
			BankAccount bankAccount = new BankAccount();
			bankAccount.setUser(user);
			bankAccount.setBalance(req.getInitialBalance());
			bankAccount.setAccountNumber(generateUniqueAccountNumber());
			BankAccount savedBankAccount = bankAccountRepository.save(bankAccount);
			user.setBankAccount(savedBankAccount);
		} else {
			user.setBankAccount(null);
		}

		return userRepository.save(user);
	}

	private String generateUniqueAccountNumber() {
		String accountNumber;
		boolean isUnique = false;
		int attempts = 0;
		do {
			accountNumber = BankAccountNumberGenerator.generateAccountNumber(ACCOUNT_NUMBER_LENGTH);
			isUnique = !bankAccountRepository.existsByAccountNumber(accountNumber);
			attempts++;
		} while (!isUnique && attempts < MAX_ATTEMPTS);

		if (!isUnique) {
			throw new RuntimeException(
					"Unable to generate a unique bank account number after " + MAX_ATTEMPTS + " attempts.");
		}

		return accountNumber;
	}

	public Optional<User> getUserByUsername(String username) {
		return userRepository.findByUsername(username);
	}

	public boolean hasUserWithUsername(String username) {
		return userRepository.existsByUsername(username);
	}

	public User validateAndGetUserByUsername(String username) {
		return getUserByUsername(username).orElseThrow(
				() -> new UsernameNotFoundException(String.format("User with username %s not found", username)));
	}

	public Optional<User> validUsernameAndPassword(String username, String password) {
		return getUserByUsername(username).filter(user -> passwordEncoder.matches(password, user.getPassword()));
	}
}
