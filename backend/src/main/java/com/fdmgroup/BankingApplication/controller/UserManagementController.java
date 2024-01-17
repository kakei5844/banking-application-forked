package com.fdmgroup.BankingApplication.controller;

import org.springframework.beans.factory.annotation.Autowired;
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
public class UserManagementController {

	@Autowired
	UserService userService;

	private final SecurityContextLogoutHandler logoutHandler = new SecurityContextLogoutHandler();

	@PostMapping("/register")
	public ResponseEntity<?> register(@Valid @RequestBody UserRegistrationRequestDTO req) {
		try {
			User savedUser = userService.saveUser(req);
			AuthResponse response = new AuthResponse(savedUser.getId(), savedUser.getUsername(), savedUser.getRole());
			return new ResponseEntity<>(response, HttpStatus.CREATED);
		} catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody UserLoginRequestDTO loginRequest) {
		User user = userService.validUsernameAndPassword(loginRequest.getUsername(), loginRequest.getPassword())
						.orElseThrow(() -> new AccessDeniedException("Incorrect username/ password"));
		return ResponseEntity.ok(new AuthResponse(user.getId(), user.getUsername(), user.getRole()));
	}

	@PostMapping("/logout")
	public ResponseEntity<?> performLogout(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) {
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

		return ResponseEntity.ok("Logged out successfully");
	}
}
