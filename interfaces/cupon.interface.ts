export interface ICoupon {
    _id: string;
    title: string;
    couponFor: string; // e.g., "total"
    description: string;
    bannerImage: string | null;
    thumbnail: string | null;
    applicableDeliveryTypes: ("quick" | "sameDay" | "allIndia")[];
    specific: any | null;
    usedCount: number;
    purchaseConditions: {
        minAmount: number;
        minQuantity: number;
    };
    limitOfUses: number;
    eligibleCustomers: string[];
    validFrom: string; // ISO date string (e.g., "2025-03-31")
    validTill: string; // ISO date string (e.g., "2025-04-10")
    disabled: boolean;
    oneTimeUseForEachCustomer: boolean;
    discount: {
        amount: number;
        type: "percentage" | "flat"; // assuming only these two types
    };
    createdBy: string;
    __v: number;
}
