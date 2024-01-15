package com.fdmgroup.BankingApplication.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fdmgroup.BankingApplication.dto.BankAccountDTO;
import com.fdmgroup.BankingApplication.dto.CreditCardDTO;
import com.fdmgroup.BankingApplication.dto.DashboardDTO;

@Service
public class DashboardService {
	
	@Autowired
	private BankAccountService bankAccountService;
	
	@Autowired
	private CreditCardService creditCardService;
	
	public DashboardDTO getDashboardDataForUser(Long userId) {
		DashboardDTO dashboard = new DashboardDTO();
		
		List<BankAccountDTO> bankAccountDTOs = bankAccountService.getBankAccountsForUser(userId);
        dashboard.setBankAccounts(bankAccountDTOs);
        
        List<CreditCardDTO> creditCardDTOs = creditCardService.getCreditCardsForUser(userId);
        dashboard.setCreditCards(creditCardDTOs);
        
        return dashboard;
	}

}
