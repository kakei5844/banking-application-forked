package com.fdmgroup.BankingApplication.controller;

import java.util.List;

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

import com.fdmgroup.BankingApplication.dto.BillDTO;
import com.fdmgroup.BankingApplication.dto.BillPaymentRequestDTO;
import com.fdmgroup.BankingApplication.model.Bill;
import com.fdmgroup.BankingApplication.security.UserPrincipal;
import com.fdmgroup.BankingApplication.service.BillService;

@RestController
@RequestMapping("/api/v1/bills")
public class BillController {

    @Autowired
    BillService billService;

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/create") // SIMULATE AUTOMATIC BILL GENERATION
    public  ResponseEntity<?> createBillsForAllCreditCards() {
        billService.saveBills();
        return ResponseEntity.ok("Successfully generated bills");
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<?> getAllBills() {
        List<Bill> bills = billService.getAllBills();
        return new ResponseEntity<>(bills, HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/credit-card/{creditCardId}")
    public ResponseEntity<?> getBillsByCreditCardId(@PathVariable("creditCardId") Long id, @AuthenticationPrincipal UserPrincipal currentUser) {
		List<BillDTO> bills = billService.getBillsByCreditCardId(id, currentUser.getUsername());
		return new ResponseEntity<>(bills, HttpStatus.OK);
	}

    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/credit-card/{creditCardId}/latest")
    public ResponseEntity<?> getLatestBillByCreditCardId(@PathVariable("creditCardId") Long id, @AuthenticationPrincipal UserPrincipal currentUser) {
		BillDTO bill = billService.getLatestBillByCreditCardId(id, currentUser.getUsername());
		return new ResponseEntity<>(bill, HttpStatus.OK);
	}

    @PreAuthorize("hasAuthority('USER')")
    @PostMapping("/payment")
    public ResponseEntity<?> payBill(@RequestBody BillPaymentRequestDTO req, @AuthenticationPrincipal UserPrincipal currentUser) {
        billService.payBill(req.getCreditCardId(), req.getBankAccountNumber(), req.getAmount(), currentUser.getUsername());
        return ResponseEntity.ok("Successful payment");
    }

}
