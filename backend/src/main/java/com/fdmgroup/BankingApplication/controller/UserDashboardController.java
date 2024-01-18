package com.fdmgroup.BankingApplication.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fdmgroup.BankingApplication.BankingApplication;
import com.fdmgroup.BankingApplication.dto.DashboardDTO;
import com.fdmgroup.BankingApplication.security.UserPrincipal;
import com.fdmgroup.BankingApplication.service.DashboardService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("api/v1/user/dashboard")
@Slf4j
public class UserDashboardController {
	
	private final Logger LOGGER = LogManager.getLogger(BankingApplication.class);	
	
	
	@Autowired
	private DashboardService dashboardService;
	
	@GetMapping
	public ResponseEntity<DashboardDTO> getUserDashboard(@AuthenticationPrincipal UserPrincipal currentUser) {
        Long userId = currentUser.getId();
       
        LOGGER.info("UserDashboardController: User Dashboard request from the user with id: {}", userId);
        DashboardDTO dashboardData = dashboardService.getDashboardDataForUser(userId);
        return ResponseEntity.ok(dashboardData);
    }
}
