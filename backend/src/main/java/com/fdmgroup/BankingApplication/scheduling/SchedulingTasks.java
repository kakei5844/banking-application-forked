package com.fdmgroup.BankingApplication.scheduling;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.fdmgroup.BankingApplication.service.BillService;
import com.fdmgroup.BankingApplication.service.CreditCardService;

@EnableScheduling
@Component
public class SchedulingTasks {

    @Autowired
    BillService billService;

    @Autowired
    CreditCardService creditCardService;

    @Scheduled(cron = "0 55 23 L * ?") // Executed at 23:55:00 on last day of every month
    public void monthlyBillGeneration() {
        billService.saveBills();
    }

    @Scheduled(cron = "0 0 0 26 * ?") // Executed at 00:00:00 on 26th day of every month
    public void dueDateLatePaymentCharge() {
        creditCardService.generateLatePaymentCharge();
    }

}
