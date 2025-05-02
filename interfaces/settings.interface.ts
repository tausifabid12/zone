interface DeliveryOption {
    label: string;
    distanceRange: [number, number];
    distanceUnit: string;
    price: number;
    currency: string;
}

interface Discount {
    value: number;
    unit: 'percentage' | 'flat'; // assuming it could be one of these
}

interface CapDetail {
    minAmount: number;
    discount: Discount;
}

interface StoreSettings {
    isQuickAndSameDayDeliveryActive: boolean;
    isAllIndiaStoreActive: boolean;
    includeSameDayDelivery: boolean;
}

interface DeliveryDetails {
    quick: DeliveryOption[];
    sameDay: DeliveryOption[];
    allIndia: DeliveryOption[];
}

interface CapSettings {
    quick: CapDetail;
    sameDay: CapDetail;
    allIndia: CapDetail;
    total: CapDetail;
}

export interface ISettings {
    store: StoreSettings;
    delivery: DeliveryDetails;
    cap: CapSettings;
}
