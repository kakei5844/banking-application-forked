package com.fdmgroup.BankingApplication.controller.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fdmgroup.BankingApplication.dto.UserDTO;
import com.fdmgroup.BankingApplication.service.UserService;

@RestController
@RequestMapping("/admin/api/v1/users")
public class ManageUsersController {

    @Autowired
	private UserService userService;

    @GetMapping("/unverified")
    public List<UserDTO> getUnverifiedUsers() {
        return userService.getUnverifiedUsers();
    }

    @PutMapping("/unverified/{userId}")
    public ResponseEntity<?> verifyUser(@PathVariable("userId") Long id) {
        UserDTO user = userService.verifyUser(id);
        return new ResponseEntity<>(user, HttpStatus.ACCEPTED);
    }
}
