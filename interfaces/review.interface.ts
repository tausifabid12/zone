interface IFullName {
    title: string;
    firstName: string;
    middleName: string;
    lastName: string;
}

interface IStatus {
    code: string;
    date: string;
}

interface ICustomer {
    _id: string;
    fullName: IFullName;
    profileImage: string | null;
    status: IStatus;
}

interface IStore {
    _id: string;
    name: string;
    owner_id: string;
    logo: string | null;
}

interface ISeller {
    _id: string;
    createdAt: string;
    fullName: IFullName;
    photoUrl: string | null;
    status: IStatus;
}

interface IProductDetails {
    _id: string;
    sku: string;
    title: string;
    thumbnail: string;
    status: string;
    createdAt: string;
}

interface IProductVariant {
    name: string;
    images: string[];
    thumbnail: string;
    _id: string;
}

interface IProduct {
    _id: string;
    sku: string | null;
    catalogId: string;
    sellerId: string;
    storeId: string;
    status: string;
    originalPrice: number;
    discountPrice: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
    variant: IProductVariant;
    details: IProductDetails;
}

export interface IReview {
    _id: string;
    productId: string;
    maskName: boolean;
    sellerId: string;
    storeId: string;
    catalogId: string;
    variantId: string;
    rating: number;
    comment: string;
    customerId: string;
    media: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    product: IProduct;
    seller: ISeller;
    store: IStore;
    customer: ICustomer;
}
