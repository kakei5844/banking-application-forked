package com.fdmgroup.BankingApplication.model;

public enum MerchantTypeCategory {
	UNKNOWN(-1, -1),
    AGRICULTURAL_SERVICES(1, 1499),
    CONTRACTED_SERVICES(1500, 2999),
    AIRLINES(3000, 3299),
    CAR_RENTAL(3300, 3499),
    LODGING(3500, 3999),
    TRANSPORTATION_SERVICES(4000, 4799),
    UTILITY_SERVICES(4800, 4999),
    RETAIL_OUTLET_SERVICES(5000, 5599),
    CLOTHING_STORES(5600, 5699),
    RESTAURANTS_DINING(5700, 5999), // Added category for restaurants and dining
    MISCELLANEOUS_STORES(6000, 7299),
    BUSINESS_SERVICES(7300, 7999),
    PROFESSIONAL_SERVICES_AND_MEMBERSHIP_ORGANIZATIONS(8000, 8999),
    GOVERNMENT_SERVICES(9000, 9999);

	private final int startRange;
	private final int endRange;

	MerchantTypeCategory(int startRange, int endRange) {
		this.startRange = startRange;
		this.endRange = endRange;
	}

	public boolean isInCategory(int mcc) {
		return mcc >= startRange && mcc <= endRange;
	}

	public static MerchantTypeCategory findByMcc(int mcc) {
		for (MerchantTypeCategory category : values()) {
			if (category.isInCategory(mcc)) {
				return category;
			}
		}
		return UNKNOWN;
	}
}