export interface ProductVariant {
    name: string;
    originalPrice: number;
    discountPrice: number;
    stock: number;
    shortDescription?: string;
    images?: string[];
    videos?: string[];
    thumbnail?: string;
}

export interface IProduct {
    id: string
    catalogId: string;
    deliveryOptions: {
        allIndia: boolean;
        quick: boolean;
        sameDay: boolean;
    };
    sellerUid: string;
    storeId: string;
    status: string;
    rating: number;
    variants: ProductVariant[];
    stock?: number;
    originalPrice?: number;
    discountPrice?: number;
}