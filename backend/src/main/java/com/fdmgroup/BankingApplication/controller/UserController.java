package com.fdmgroup.BankingApplication.controller;

import java.util.Optional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fdmgroup.BankingApplication.BankingApplication;
import com.fdmgroup.BankingApplication.model.User;
import com.fdmgroup.BankingApplication.security.UserPrincipal;
import com.fdmgroup.BankingApplication.service.UserService;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/users")
public class UserController {
		
	private final Logger LOGGER = LogManager.getLogger(BankingApplication.class);
	
	@Autowired
	UserService userService;

	@PreAuthorize("hasAuthority('USER')")
	@GetMapping("/me")
    public User getCurrentUser(@AuthenticationPrincipal UserPrincipal currentUser) {
		Optional<User> optionalUser = userService.getUserByUsername(currentUser.getUsername());
		
		LOGGER.info("UserController: getCurrentUser request from the user with id: {}", currentUser.getId());
		if (optionalUser.isPresent()) {
			return optionalUser.get();
		} else {
			LOGGER.error("UserController: User not found for username: {}", currentUser.getUsername());
			throw new UsernameNotFoundException("Username not found");
		}
    }

}
