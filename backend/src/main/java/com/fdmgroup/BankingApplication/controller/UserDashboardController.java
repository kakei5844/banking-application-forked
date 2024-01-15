package com.fdmgroup.BankingApplication.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fdmgroup.BankingApplication.dto.DashboardDTO;
import com.fdmgroup.BankingApplication.security.UserPrincipal;
import com.fdmgroup.BankingApplication.service.DashboardService;

@RestController
@RequestMapping("api/v1/user/dashboard")
public class UserDashboardController {
	
	@Autowired
	private DashboardService dashboardService;
	
	@GetMapping
	public ResponseEntity<DashboardDTO> getUserDashboard(@AuthenticationPrincipal UserPrincipal currentUser) {
        Long userId = currentUser.getId();
        DashboardDTO dashboardData = dashboardService.getDashboardDataForUser(userId);
        return ResponseEntity.ok(dashboardData);
    }
}
