package com.fdmgroup.BankingApplication.controller;

import java.util.Optional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fdmgroup.BankingApplication.BankingApplication;
import com.fdmgroup.BankingApplication.dto.AuthResponse;
import com.fdmgroup.BankingApplication.dto.UserDTO;
import com.fdmgroup.BankingApplication.dto.UserLoginRequestDTO;
import com.fdmgroup.BankingApplication.dto.UserRegistrationRequestDTO;
import com.fdmgroup.BankingApplication.model.User;
import com.fdmgroup.BankingApplication.service.UserService;


import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/v1")
@Slf4j
public class UserManagementController {
	
	private final Logger LOGGER = LogManager.getLogger(BankingApplication.class);

	@Autowired
	UserService userService;

	private final SecurityContextLogoutHandler logoutHandler = new SecurityContextLogoutHandler();

	@PostMapping("/register")
	public ResponseEntity<?> register(@Valid @RequestBody UserRegistrationRequestDTO req) {
		
//		("UserManagementController: register User request received with body : {}", req.toString());
		LOGGER.info("UserManagementController: register User request received with body : {}", req.toString());
		try {
			User savedUser = userService.saveUser(req);
			AuthResponse response = new AuthResponse(savedUser.getId(), savedUser.getUsername(), savedUser.getRole());
			LOGGER.info("UserManagementController: register User request approved with Response Status : {}", HttpStatus.CREATED);
			return new ResponseEntity<>(response, HttpStatus.CREATED);
		} catch (Exception e) {
			// to be confirmed with FE what they need
			LOGGER.error("UserManagementController: register User request rejected with Response Status: {}", HttpStatus.INTERNAL_SERVER_ERROR);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody UserLoginRequestDTO loginRequest) {
		Optional<User> userOptional = userService.validUsernameAndPassword(loginRequest.getUsername(), loginRequest.getPassword());
		
		LOGGER.info("UserManagementController: login User request received with body : {}", loginRequest.toString());
		
		if (userOptional.isPresent()) {
            User user = userOptional.get();
            LOGGER.info("UserManagementController: login User request approved with Response Status : {}", HttpStatus.OK);
            return ResponseEntity.ok(new AuthResponse(user.getId(), user.getUsername(), user.getRole()));
        }
		LOGGER.error("UserManagementController: login User request rejected with Response Status : {}", HttpStatus.UNAUTHORIZED);
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // to be confirmed with FE what they need
	}

	@PostMapping("/logout")
	public ResponseEntity<?> performLogout(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) {
		logoutHandler.logout(request, response, authentication);

		// Invalidate the session and clear the security context
		HttpSession session = request.getSession(false);
		if (session != null) {
			session.invalidate();
		}
		SecurityContextHolder.clearContext();

		// Create a cookie with the same name as the session cookie but with a Max-Age
		// of 0
		Cookie cookie = new Cookie("JSESSIONID", null);
		cookie.setPath(request.getContextPath());
		cookie.setMaxAge(0);
		response.addCookie(cookie);

		return ResponseEntity.ok("Logged out successfully");
	}
}
