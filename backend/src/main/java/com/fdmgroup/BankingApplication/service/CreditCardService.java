package com.fdmgroup.BankingApplication.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fdmgroup.BankingApplication.dto.CreditCardRequestDTO;
import com.fdmgroup.BankingApplication.model.CreditCard;
import com.fdmgroup.BankingApplication.model.User;
import com.fdmgroup.BankingApplication.repository.CreditCardRepository;
import com.fdmgroup.BankingApplication.repository.UserRepository;

import jakarta.validation.Valid;

@Service
public class CreditCardService {

    @Autowired
    private CreditCardRepository creditCardRepository;

    @Autowired
    private UserRepository userRepository;

    public CreditCard saveCreditCard(CreditCardRequestDTO req) {
        User user = userRepository
                        .findById(req.getUserId())
                        .orElseThrow(() -> new RuntimeException("User id not exist"));
        CreditCard creditCard = new CreditCard();

        // TODO: determine credit limit by req.getAnnualSalary()
        creditCard.setCreditLimit(100000);
        creditCard.setAvailableLimit(100000);
        creditCard.setBalance(0);

        creditCard.setType(req.getCardType());
        creditCard.setUser(user);

        user.getCreditCards().add(creditCard);
        return creditCardRepository.save(creditCard);
    }


}
