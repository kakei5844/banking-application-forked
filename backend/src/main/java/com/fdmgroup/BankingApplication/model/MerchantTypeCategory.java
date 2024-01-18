package com.fdmgroup.BankingApplication.model;

public enum MerchantTypeCategory {
	UNKNOWN(-1, -1, 0),
    AGRICULTURAL_SERVICES(1, 1499, 0),
    CONTRACTED_SERVICES(1500, 2999, 0),
    AIRLINES(3000, 3299, 0.01),
    CAR_RENTAL(3300, 3499, 0),
    LODGING(3500, 3999, 0),
    TRANSPORTATION_SERVICES(4000, 4799, 0),
    UTILITY_SERVICES(4800, 4999, 0),
    RETAIL_OUTLET_SERVICES(5000, 5599, 0.02),
    CLOTHING_STORES(5600, 5699, 0.02),
    RESTAURANTS_DINING(5700, 5999, 0.02),
    MISCELLANEOUS_STORES(6000, 7299, 0.03),
    BUSINESS_SERVICES(7300, 7999, 0),
    PROFESSIONAL_SERVICES_AND_MEMBERSHIP_ORGANIZATIONS(8000, 8999, 0),
    GOVERNMENT_SERVICES(9000, 9999, 0);

	private final int startRange;
	private final int endRange;
	private final double cashbackRate;

	MerchantTypeCategory(int startRange, int endRange, double cashbackRate) {
		this.startRange = startRange;
		this.endRange = endRange;
		this.cashbackRate = cashbackRate;
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

	public double getCashbackRate() {
		return cashbackRate;
	}

}