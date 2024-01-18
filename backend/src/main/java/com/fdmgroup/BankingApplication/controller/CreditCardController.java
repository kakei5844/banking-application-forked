package com.fdmgroup.BankingApplication.controller;

import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fdmgroup.BankingApplication.BankingApplication;
import com.fdmgroup.BankingApplication.dto.CreditCardRequestDTO;
import com.fdmgroup.BankingApplication.dto.CreditCardTransactionDTO;
import com.fdmgroup.BankingApplication.dto.PurchaseRequestDTO;
import com.fdmgroup.BankingApplication.model.CreditCard;
import com.fdmgroup.BankingApplication.security.UserPrincipal;
import com.fdmgroup.BankingApplication.service.CreditCardService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/credit-cards")
@Slf4j
public class CreditCardController {
	private static final Logger LOGGER = LogManager.getLogger(BankingApplication.class);
	
    @Autowired
    private CreditCardService creditCardService;

	@PreAuthorize("hasAuthority('USER')")
	@PostMapping("/apply")
	public ResponseEntity<?> applyCreditCard(@Valid @RequestBody CreditCardRequestDTO req, @AuthenticationPrincipal UserPrincipal currentUser) {
		try {
			LOGGER.info("CreditCardController: Apply Credit Card request recieved for user: {}", currentUser.getUsername());
			CreditCard savedCreditCard = creditCardService.createCreditCard(req.getAnnualSalary(), req.getCardType(), currentUser.getUsername());
			LOGGER.info("CreditCardController: Apply Credit Card request approved with Credit Card body: {}", req.toString());
			return new ResponseEntity<>(savedCreditCard, HttpStatus.CREATED);
		} catch (Exception e) {
			LOGGER.error("CreditCardController: Error applying credit card, {}",HttpStatus.INTERNAL_SERVER_ERROR);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
		}
	}

	@PreAuthorize("hasAuthority('USER')")
	@GetMapping("/me")
	public List<CreditCard> getCreditCardsOfCurrentUser(@AuthenticationPrincipal UserPrincipal currentUser) {
		LOGGER.info("CreditCardController: Get Credit Cards of Current User request with user Id: {}", currentUser.getId());
		try {
			List<CreditCard> creditCards = creditCardService.getCreditCardsByUsername(currentUser.getUsername());
			LOGGER.info("CreditCardController: Get Credit Cards of Current User request approved");
			return creditCards;
		} catch (Exception e) {
			LOGGER.error("CreditCardController: Error getting credit cards of current user, {}",HttpStatus.INTERNAL_SERVER_ERROR);
            throw e;
		}
    }

	@PreAuthorize("hasAuthority('USER')")
	@GetMapping("/{creditCardId}")
	public ResponseEntity<?> getSingleCreditCardOfCurrentUser(@PathVariable("creditCardId") Long id, @AuthenticationPrincipal UserPrincipal currentUser) {
		
		LOGGER.info("CreditCardController: Get Single Credit Card request received with UserID and CreditCardID: {}, {}", currentUser.getId(),id);
		
		try {
			CreditCard creditCard = creditCardService.findCreditCardByIdAndUsername(id, currentUser.getUsername());
			LOGGER.info("CreditCardController: Get Single Credit Card request approved");
			return new ResponseEntity<>(creditCard, HttpStatus.OK);
		} catch (Exception e) {
			LOGGER.error("CreditCardController: Error retrieving single credit card, {}",HttpStatus.INTERNAL_SERVER_ERROR);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
		}
	}

	@PostMapping("/purchase")
	public ResponseEntity<?> purchase(@Valid @RequestBody PurchaseRequestDTO req) {
		try {
			CreditCardTransactionDTO savedTransaction = creditCardService.purchase(req.creditCardId(), req.amount(), req.merchantName(), req.mcc());
			LOGGER.info("CreditCardController: Purchase request approved with Credit Card Transaction: {}", req.toString());
			return new ResponseEntity<>(savedTransaction, HttpStatus.ACCEPTED);
		} catch (Exception e) {
			LOGGER.error("CreditCardController: Error processing purchase, {}",HttpStatus.INTERNAL_SERVER_ERROR, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
		}
	}

	// TODO: get transaction history with filter (to be confirmed with FE what filter options are there)
    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/{creditCardId}/history")
    public ResponseEntity<?> getTransactionHistory(@PathVariable("creditCardId") Long id, 
            @RequestParam(required = false) Integer month, 
            @RequestParam(required = false) Integer year, 
            @AuthenticationPrincipal UserPrincipal currentUser) {

        List<CreditCardTransactionDTO> history;
        if (year != null) {
            if (month != null) {
                history = creditCardService.getTransactionsByMonthAndYear(id, month, year, currentUser.getUsername());
            } else {
                history = creditCardService.getTransactionsByYear(id, year, currentUser.getUsername());
            }
        } else {
            history = creditCardService.getTransactionsByIdAndUsername(id, currentUser.getUsername());
        }
		LOGGER.info("CreditCardController: Get Transaction History request received for Credit Card ID: {} with UserID: {}", id, currentUser.getId());
        return new ResponseEntity<>(history, HttpStatus.OK);
    }

}
