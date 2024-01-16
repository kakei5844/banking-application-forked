package com.fdmgroup.BankingApplication.dto.annotation;

import com.fdmgroup.BankingApplication.dto.TransferRequestDTO;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

class DifferentBankAccountValidator implements ConstraintValidator<DifferentBankAccounts, TransferRequestDTO> {

    @Override
    public void initialize(DifferentBankAccounts constraintAnnotation) {
    }

    @Override
    public boolean isValid(TransferRequestDTO transferRequestDTO, ConstraintValidatorContext context) {
        if (transferRequestDTO.getFromBankAccountNumber() == transferRequestDTO.getToBankAccountNumber()) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(context.getDefaultConstraintMessageTemplate())
                    .addPropertyNode("toBankAccountId")
                    .addConstraintViolation();
            return false;
        }
        return true;
    }
}
