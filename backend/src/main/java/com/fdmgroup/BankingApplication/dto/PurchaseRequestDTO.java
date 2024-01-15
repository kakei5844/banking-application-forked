package com.fdmgroup.BankingApplication.dto;

public record PurchaseRequestDTO(long creditCardId, double amount, String merchantName, int mcc) {

    // merchant category code - mcc
    // 0001–1499: Agricultural services
    // 1500–2999: Contracted services
    // 4000–4799: Transportation services
    // 4800–4999: Utility services
    // 5000–5599: Retail outlet services
    // 5600–5699: Clothing stores
    // 5700–7299: Miscellaneous stores
    // 7300–7999: Business services
    // 8000–8999: Professional services and membership organizations
    // 9000–9999: Government services

    // not checking cvv, expiry date for now

}
