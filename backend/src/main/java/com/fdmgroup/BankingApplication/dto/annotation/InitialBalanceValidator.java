package com.fdmgroup.BankingApplication.dto.annotation;

import com.fdmgroup.BankingApplication.dto.UserRegistrationRequestDTO;
import com.fdmgroup.BankingApplication.security.Role;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class InitialBalanceValidator implements ConstraintValidator<ValidInitialBalance, UserRegistrationRequestDTO> {

    @Override
    public void initialize(ValidInitialBalance constraint) {
    }

    @Override
    public boolean isValid(UserRegistrationRequestDTO dto, ConstraintValidatorContext context) {
        if (dto.getRole() == Role.USER && dto.getInitialBalance() < 0.01) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(context.getDefaultConstraintMessageTemplate())
                    .addPropertyNode("initialBalance")
                    .addConstraintViolation();
            return false;
        } else if (dto.getRole() == Role.ADMIN && dto.getInitialBalance() != 0) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("No initial balance for admin")
                    .addPropertyNode("initialBalance")
                    .addConstraintViolation();
            return false;
        }
        return true;
    }
}