package com.fdmgroup.BankingApplication.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fdmgroup.BankingApplication.dto.BillDTO;
import com.fdmgroup.BankingApplication.model.Bill;
import com.fdmgroup.BankingApplication.model.CreditCard;
import com.fdmgroup.BankingApplication.model.CreditCardTransaction;
import com.fdmgroup.BankingApplication.repository.BillRepository;

@Service
public class BillService {

    @Autowired
    BillRepository billRepository;

    @Autowired
    CreditCardService creditCardService;

    @Autowired
    BankAccountService bankAccountService;

    // Prototype (TO BE DONE WITH SCHEDULAR)
    public List<Bill> saveBills() {
        List<Bill> bills = new ArrayList<>();
        List<CreditCard> creditCards = creditCardService.getAllCreditCards();
        for (CreditCard creditCard : creditCards) {
            List<CreditCardTransaction> transactions = creditCardService.getLastMonthTransactionsByCreditCard(creditCard);

            Bill bill = new Bill(
                                LocalDateTime.now(), 
                                LocalDateTime.now().plusDays(25), 
                                creditCard.getOutstandingBalance(), 
                                creditCard.getOutstandingBalance()*0.02,
                                0, 
                                creditCard, 
                                transactions);
            transactions.stream().forEach(t -> t.setBill(bill));
            bills.add(bill);
        }
        
        return billRepository.saveAll(bills);
    }

    public List<Bill> getAllBills() {
        return billRepository.findAll();
    }

    public BillDTO getLatestBillByCreditCardId(long creditCardId, String username) {
        CreditCard creditCard = creditCardService.findCreditCardByIdAndUsername(creditCardId, username);
        return convertToDTO(billRepository.findFirstByCreditCardOrderByIssueDateDesc(creditCard));
    }

    public List<BillDTO> getBillsByCreditCardId(Long creditCardId, String username) {
        CreditCard creditCard = creditCardService.findCreditCardByIdAndUsername(creditCardId, username);
        return billRepository
                .findByCreditCardOrderByIssueDateDesc(creditCard)
                .stream()
                .map(b -> convertToDTO(b))
                .collect(Collectors.toList());
    }

    private BillDTO convertToDTO(Bill bill) {
        return new BillDTO(
            bill.getId(), 
            bill.getIssueDate(), 
            bill.getDueDate(), 
            bill.getBalanceDue(), 
            bill.getMinimumPayment(), 
            bill.getTotalRepaymentAmount(), 
            bill.getBalanceDue() - bill.getTotalRepaymentAmount(),
            bill.getBilledTransactions()
                .stream()
                .map(t -> creditCardService.convertToDTO(t))
                .collect(Collectors.toList())
        );
    }

    public void payBill(long creditCardId, long bankAccountId, double amount, String username) {
        CreditCard creditCard = creditCardService.findCreditCardByIdAndUsername(creditCardId, username);
        creditCardService.processTransaction(creditCardId, amount * -1, "Credit Payment", 0);
        
        // TODO: ensure the user is the owner of the bank account
        bankAccountService.processTransaction(bankAccountId, amount * -1, "Credit Payment");
        
        Bill bill = billRepository.findFirstByCreditCardOrderByIssueDateDesc(creditCard);
        bill.setTotalRepaymentAmount(bill.getTotalRepaymentAmount() + amount);
        billRepository.save(bill);
        
    }


}
