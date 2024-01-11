package com.fdmgroup.BankingApplication.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fdmgroup.BankingApplication.model.User;
import com.fdmgroup.BankingApplication.security.UserPrincipal;
import com.fdmgroup.BankingApplication.service.UserService;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/users")
public class UserController {

	@Autowired
	UserService userService;
	
	// GET ALL USERS
	
	// GET USER BY ID
	
	// UPDATE USER BY ID
	
	// DELETE USER

	@GetMapping("/me")
    public User getCurrentUser(@AuthenticationPrincipal UserPrincipal currentUser) {
		Optional<User> optionalUser = userService.getUserByUsername(currentUser.getUsername());
		if (optionalUser.isPresent()) {
			return optionalUser.get();
		} else {
			throw new UsernameNotFoundException("Username not found");
		}
    }

}
