package com.fdmgroup.BankingApplication.mapper;

import org.springframework.stereotype.Service;

import com.fdmgroup.BankingApplication.dto.UserDTO;
import com.fdmgroup.BankingApplication.model.User;

@Service
public class UserMapper {

    public UserDTO toUserDTO(User user) {
        if (user == null) {
            return null;
        }
        // Need Role?
        return new UserDTO(user.getId(), user.getUsername(), user.getFirstName(), user.getLastName(), user.getPhoneNumber(), user.getEmail(), user.isVerified(), user.getRole());
    }
}
