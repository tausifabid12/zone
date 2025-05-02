export interface IUser {
    _id: string;
    fullName: {
        title: string;
        firstName: string;
        middleName: string;
        lastName: string;
    };
    profileImage: string | null;
    email: string;
    uid: string;
    phoneNumber: {
        isd: string;
        number: string;
    };
    status: {
        code: string;
        date: string;
    };
    address: {
        line1: string;
        line2: string;
        city: string;
        country: string;
        pinCode: string;
        state: string;
        geo: {
            type: "Point";
            coordinates: [number, number];
        };
    }[];
    notificationKey: string | null;
    fcmTokens: string[];
    __v: number;
    additionalInfo: {
        idToken: string;
        role: string;
        uid: string;
        email: string;
        emailVerified: boolean;
        displayName: string;
        phoneNumber: string;
        disabled: boolean;
        metadata: {
            lastSignInTime: string;
            creationTime: string;
            lastRefreshTime: string;
        };
        providerData: {
            uid: string;
            providerId: string;
            phoneNumber: string;
        }[];
        tokensValidAfterTime: string;
        _id: string;
    };
}
