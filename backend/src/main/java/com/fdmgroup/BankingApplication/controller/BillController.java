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
import org.springframework.web.bind.annotation.RestController;

import com.fdmgroup.BankingApplication.BankingApplication;
import com.fdmgroup.BankingApplication.dto.BillDTO;
import com.fdmgroup.BankingApplication.dto.BillPaymentRequestDTO;
import com.fdmgroup.BankingApplication.model.Bill;
import com.fdmgroup.BankingApplication.security.UserPrincipal;
import com.fdmgroup.BankingApplication.service.BillService;

@RestController
@RequestMapping("/api/v1/bills")
@Slf4j
public class BillController {
	private static final Logger LOGGER = LogManager.getLogger(BankingApplication.class);
    @Autowired
    BillService billService;

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/create")
    public  ResponseEntity<?> createBillsForAllCreditCards() {
        try {
        	LOGGER.info("BillController: Creating bills for all credit cards.");
			billService.saveBills();
			LOGGER.info("BillController: Successfully created bills for all credit cards.");
			return ResponseEntity.ok("Successfully generated bills");
		} catch (Exception e) {
			LOGGER.error("BillController: Error creating bills with Status, {}",HttpStatus.INTERNAL_SERVER_ERROR, e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
		}
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<?> getAllBills() {
        try {
        	LOGGER.info("BillController: Request recieved for Retrieving all bills.");
			List<Bill> bills = billService.getAllBills();
			LOGGER.info("BillController: Request approved for Retrieving all bills, {}", HttpStatus.OK);
			return new ResponseEntity<>(bills, HttpStatus.OK);
		} catch (Exception e) {
			LOGGER.error("BillController: Error retrieving all bills", e);
            throw e;
		}
    }

    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/credit-card/{creditCardId}")
    public ResponseEntity<?> getBillsByCreditCardId(@PathVariable("creditCardId") Long id, @AuthenticationPrincipal UserPrincipal currentUser) {
		try {
			LOGGER.info("BillController: Request recieved for Retrieving bills for credit card ID: {} for user: {}", id, currentUser.getUsername());
			List<BillDTO> bills = billService.getBillsByCreditCardId(id, currentUser.getUsername());
			LOGGER.info("BillController: Request approved for Retrieve bills for credit card ID: {} for user: {}, {}", id, currentUser.getUsername(), HttpStatus.OK);
			return new ResponseEntity<>(bills, HttpStatus.OK);
		} catch (Exception e) {
			LOGGER.error("BillController: Error retrieving bills for credit card ID: {} for user: {}", id, currentUser.getUsername(), e);
			throw e;
		}
	}

    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/credit-card/{creditCardId}/latest")
    public ResponseEntity<?> getLatestBillByCreditCardId(@PathVariable("creditCardId") Long id, @AuthenticationPrincipal UserPrincipal currentUser) {
		try {
			LOGGER.info("BillController: Request recieved for Retrieving latest bill for credit card ID: {} for user: {}", id, currentUser.getUsername());
			BillDTO bill = billService.getLatestBillByCreditCardId(id, currentUser.getUsername());
			LOGGER.info("BillController: Request approved for Retrieve latest bill for credit card ID: {} for user: {}, {}", id, currentUser.getUsername(), HttpStatus.OK);
			return new ResponseEntity<>(bill, HttpStatus.OK);
		} catch (Exception e) {
            throw e;
		}
	}

    @PreAuthorize("hasAuthority('USER')")
    @PostMapping("/payment")
    public ResponseEntity<?> payBill(@RequestBody BillPaymentRequestDTO req, @AuthenticationPrincipal UserPrincipal currentUser) {
        try {
        	LOGGER.info("BillController: Request recieved for Initiating payment for {}, for user: {}", req.toString(), currentUser.getUsername());
			billService.payBill(req.getCreditCardId(), req.getBankAccountNumber(), req.getAmount(), currentUser.getUsername());
			LOGGER.info("BillController: Request approved for Initiating payment for {}, for user: {}", req.toString(), currentUser.getUsername());
			return ResponseEntity.ok("Successful payment");
		} catch (Exception e) {
			LOGGER.error("BillController: Error processing payment, {}",HttpStatus.INTERNAL_SERVER_ERROR, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
		}
    }

}
