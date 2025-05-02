export interface IOrder {
    amount: number;
    customer_id: string;
    orderStatus: "VALIDATED" | string;
    paymentStatus: "pending" | string;
    operation: {
        data: any;
        error: any;
    };
    _id: string;
    products: IProduct[];
    receipt: string;
    notes: {
        userId: string;
        userEntity: string;
    };
    line_items: ILineItem[];
    line_items_total: number;
    customer_details: ICustomerDetails;
    setting: ISetting;
    paymentInfo: IPaymentInfo;
    createdAt: string;
    updatedAt: string;
}

interface IProduct {
    quantity: number;
    productId: string;
    variantId: string;
    notes: {
        deliveryType: string;
    };
}

interface ILineItem {
    name: string;
    description: string;
    price: string;
    offer_price: string;
    quantity: number;
    tax_amount: number;
    sku: string;
    type: string;
    dimensions: {
        height: string;
        length: string;
        width: string;
    };
    image_url: string;
    notes: {
        categoryId: string;
        productId: string;
        variantId: string;
        sellerId: string;
        storeId: string;
        status: string;
        deliveryType: string;
        deliveryCost: number;
    };
    product_url: string;
    variant_id: string;
    weight: string;
}

interface ICustomerDetails {
    shipping_address: IAddress;
    billing_address: IAddress;
    name: string;
    email: string;
    contact: string;
}

interface IAddress {
    line1: string;
    line2: string;
    city: string;
    state: string;
    country: string;
    zipcode: string;
}

interface ISetting {
    store: {
        isQuickAndSameDayDeliveryActive: boolean;
        isAllIndiaStoreActive: boolean;
        includeSameDayDelivery: boolean;
    };
    delivery: {
        quick: IDeliveryOption[];
        sameDay: IDeliveryOption[];
        allIndia: IDeliveryOption[];
    };
    cap: {
        quick: IDiscountCap;
        sameDay: IDiscountCap;
        allIndia: IDiscountCap;
        total: IDiscountCap;
    };
}

interface IDeliveryOption {
    label: string;
    distanceRange: [number, number];
    distanceUnit: string;
    price: number;
    currency: string;
}

interface IDiscountCap {
    minAmount: number;
    discount: {
        value: number;
        unit: string;
    };
}

interface IPaymentInfo {
    couponDiscounts: {
        delivery: number;
        products: number;
        total: number;
    };
    storeWiseCost: {
        [key: string]: IStoreWiseCost;
    };
    revisedCost: {
        totalProductCost: number;
        quickDeliveryFee: number;
        sameDayDeliveryFee: number;
        allIndiaDeliveryFee: number;
        totalDeliveryFee: number;
        handlingFee: number;
        operationalExpenses: number;
        finalAmount: number;
    };
}

interface IStoreWiseCost {
    storeId: string;
    sellerId: string;
    totalProductCost: number;
    deliveryCost: {
        quick: {
            unit: string;
            amount: number;
            distance: number;
        };
    };
    paymentReceivedBySeller: any;
}
