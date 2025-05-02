export interface IProduct {
    _id: string;
    sku: string | null;
    catalogId: string;
    deliveryOptions: {
        allIndia: boolean;
        quick: boolean;
        sameDay: boolean;
    };
    sellerId: string;
    storeId: string;
    status: "in-stock" | "out-of-stock";
    rating: number;
    requestId: string;
    variants: IVariant[];
    stock: number;
    originalPrice: number;
    discountPrice: number;
    __v: number;
    details: IProductDetails;
    seller: any[];
    minPrice: number;
    store: IStore;
}

export interface IVariant {
    name: string;
    originalPrice: number;
    discountPrice: number;
    stock: number;
    shortDescription: string;
    images: string[];
    videos: string[];
    thumbnail: string;
    _id: string;
}

interface IProductDetails {
    _id: string;
    sku: string;
    title: string;
    description: string;
    thumbnail: string | null;
    images: string[];
    videos: string[];
    tags: string[];
    brandName: string;
    categoryId: string;
    addedBy: string;
    deliveryOptions: {
        quick: boolean;
        sameDay: boolean;
        allIndia: boolean;
    };
    deliveryCost: IDeliveryCost;
    status: "active" | "inactive";
    weight: string;
    dimensions: {
        height: string;
        length: string;
        width: string;
    };
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface IDeliveryCost {
    quick: ICostDetails[];
    sameDay: ICostDetails[];
    allIndia: ICostDetails[];
}

interface ICostDetails {
    currency: string;
    distanceUnit: string;
    distanceRange: [number, number];
    price: number;
}

interface IStore {
    _id: string;
    name: string;
    contactDetails: {
        mobile: {
            isd: string;
            number: string;
        };
        email: string;
        facebook: string;
        instagram: string;
        x: string;
    };
    logo: string | null;
    coverImage: string | null;
    location: {
        line1: string;
        line2: string;
        city: string;
        country: string;
        pinCode: string;
        state: string;
        geo: {
            type: string;
            coordinates: [number, number];
        };
    };
    isActive: boolean;
    openingTime: string;
    closingTime: string;
    distance: number;
}
