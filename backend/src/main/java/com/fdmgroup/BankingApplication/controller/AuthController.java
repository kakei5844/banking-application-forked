package com.fdmgroup.BankingApplication.controller;

import java.util.Optional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fdmgroup.BankingApplication.BankingApplication;
import com.fdmgroup.BankingApplication.dto.AuthResponse;
import com.fdmgroup.BankingApplication.dto.UserLoginRequestDTO;
import com.fdmgroup.BankingApplication.dto.UserRegistrationRequestDTO;
import com.fdmgroup.BankingApplication.model.User;
import com.fdmgroup.BankingApplication.service.UserService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1")
public class AuthController {

	private final Logger LOGGER = LogManager.getLogger(BankingApplication.class);

	@Autowired
	UserService userService;

	private final SecurityContextLogoutHandler logoutHandler = new SecurityContextLogoutHandler();

	@PostMapping("/register")
	public ResponseEntity<?> register(@Valid @RequestBody UserRegistrationRequestDTO req) {

		LOGGER.info("UserManagementController: register User request received with body : {}", req.toString());
		try {
			User savedUser = userService.saveUser(req);
			AuthResponse response = new AuthResponse(savedUser.getId(), savedUser.getUsername(), savedUser.getRole());
			LOGGER.info("UserManagementController: register User request approved with Response Status : {}",
					HttpStatus.CREATED);
			return new ResponseEntity<>(response, HttpStatus.CREATED);
		} catch (DataIntegrityViolationException e) {
	        LOGGER.error("UserManagementController: Registration failed for username: {}, error: {}", req.getUsername(), e.getMessage());
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Registration failed: Username may already be taken.");
	    } catch (Exception e) {
	        LOGGER.error("UserManagementController: Unexpected error during registration for username: {}, error: {}", req.getUsername(), e.getMessage());
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An internal error occurred.");
	    }
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody UserLoginRequestDTO loginRequest) {
		
		Optional<User> userOptional = userService.validUsernameAndPassword(loginRequest.getUsername(),
				loginRequest.getPassword());
		
		if (userOptional.isPresent()) {
			User user = userOptional.get();
			LOGGER.info("UserManagementController: login User request approved for username: {}", user.getUsername());
			return ResponseEntity.ok(new AuthResponse(user.getId(), user.getUsername(), user.getRole()));
		} else {
			LOGGER.info("UserManagementController: login User request denied for username: {}",
					loginRequest.getUsername());
			throw new AccessDeniedException("Incorrect username/ password");
		}
	}

	@PostMapping("/logout")
	public ResponseEntity<?> performLogout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
	    try {
	        logoutHandler.logout(request, response, authentication);

	        HttpSession session = request.getSession(false);
	        if (session != null) {
	            session.invalidate();
	        }
	        SecurityContextHolder.clearContext();

	        Cookie cookie = new Cookie("JSESSIONID", null);
	        cookie.setPath(request.getContextPath());
	        cookie.setMaxAge(0);
	        response.addCookie(cookie);

	        LOGGER.info("User logged out successfully");
	        return ResponseEntity.ok("Logged out successfully");
	    } catch (Exception e) {
	        LOGGER.error("Error during logout: {}", e.getMessage());
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Logout failed due to an internal error.");
	    }
	}
}
