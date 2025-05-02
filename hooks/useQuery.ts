// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useState, useEffect, useCallback } from 'react';

// interface FetchOptions extends RequestInit { }


// // Hook for GET requests
// export const useQuery = <T>(param: string, options: FetchOptions = {}) => {
//     const [data, setData] = useState<T | null>(null);
//     const [error, setError] = useState<string | null>(null);
//     const [loading, setLoading] = useState<boolean>(false);

//     const fetchData = useCallback(async () => {
//         setLoading(true);
//         setError(null);

//         const accessToken: any = await AsyncStorage.getItem('token')

//         console.log(accessToken, "PPPPPPPPPPPPPPPPPPPPPP accessToken accessToken accessToken")


//         const userDataStr = await AsyncStorage.getItem('userData')
//         const userData = JSON.parse(userDataStr as any)
//         const accessToken2 = userData?.additionalInfo?.idToken

//         console.log(userData, 'accessToken2 accessToken2 accessToken2')
//         console.log(accessToken2, 'accessToken2 accessToken2 accessToken2')
//         // const accessToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImE5ZGRjYTc2YzEyMzMyNmI5ZTJlODJkOGFjNDg0MWU1MzMyMmI3NmEiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiIEFiaWQgIDEiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc29sYXItYm90YW55LTQ0NzUxMy1oOCIsImF1ZCI6InNvbGFyLWJvdGFueS00NDc1MTMtaDgiLCJhdXRoX3RpbWUiOjE3NDM3NjgxOTcsInVzZXJfaWQiOiJub0lrNDh3elBBZ3JRcDR2ZVJFZG1lMVNRS0MzIiwic3ViIjoibm9JazQ4d3pQQWdyUXA0dmVSRWRtZTFTUUtDMyIsImlhdCI6MTc0Mzc2ODE5NywiZXhwIjoxNzQzNzcxNzk3LCJlbWFpbCI6InVzZXIxQDQ0Z21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJwaG9uZV9udW1iZXIiOiIrODgwMTMxODA0ODU0NCIsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidXNlcjFANDRnbWFpbC5jb20iXSwicGhvbmUiOlsiKzg4MDEzMTgwNDg1NDQiXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwaG9uZSJ9fQ.eLJcfIrd2H4G9qpPORBUVrHX7ILTvKLmxLTi5xCq3noeLiiI9sQ6iOPx4Ue5L4wY9lnEjv8TtBIfYu_3-2ERUpQlZOl6kdfUKTgguGuPxL6hdoJFaSM5aqlRbPEYVwb8uKp5_e7rBR7x_d6GCB7dKS2lqaHwXiUmoM2Cl1pXpZPCfEx6cSChk2Y8w0DXQDUVHG7vZmSgKfgCgsIk2oWpdk9-HOqBWc_V53r5KWyDvYrMhJkMkWbT34t1RgHKrJmUr58wxSD8wjLffItPNAEotLAMLntn_0Rp8YsRV6Kv9o69PuksaGAvVYWiVRF-7omy2SMGgMQDVhH94IeJCK-rgw'





//         try {
//             // const response = await fetch(`https://dev.zone42.in/api-main/${param}`, { ...options, method: 'GET' });


//             const response = await fetch(`https://dev.zone42.in/api-main/${param}`, {
//                 ...options,
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${accessToken2}`, // Add Authorization header
//                     ...(options.headers || {}),
//                 },
//             });





//             const result: T = await response.json();
//             if (!response.ok) {
//                 throw new Error(result as unknown as string || 'Something went wrong');
//             }
//             setData(result);
//         } catch (err) {
//             setError((err as Error).message);
//         } finally {
//             setLoading(false);
//         }
//     }, [param, options]);

//     useEffect(() => {
//         fetchData();
//     }, [param]);

//     return { data, error, loading, refetch: fetchData };
// };




import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect, useCallback } from 'react';

interface FetchOptions extends RequestInit { }

export const useQuery = <T>(param: string, options: FetchOptions = {}) => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);

        const userDataStr = await AsyncStorage.getItem('userData');
        const userData = userDataStr ? JSON.parse(userDataStr) : null;
        const accessToken = userData?.additionalInfo?.idToken;

        try {
            const response = await fetch(`https://dev.zone42.in/api-main/${param}`, {
                ...options,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                    ...(options.headers || {}),
                },
            });

            const result: T = await response.json();

            if (!response.ok) {
                throw new Error((result as unknown as string) || 'Something went wrong');
            }

            // Save latest data in AsyncStorage
            await AsyncStorage.setItem(`cache_${param}`, JSON.stringify(result));
            setData(result);

        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    }, [param, options]);

    useEffect(() => {
        const loadLocalAndFetch = async () => {
            // Load local data first
            const local = await AsyncStorage.getItem(`cache_${param}`);
            if (local) {
                setData(JSON.parse(local));
            }
            // Then try to fetch the latest
            fetchData();
        };

        loadLocalAndFetch();
    }, [param]);

    return { data, error, loading, refetch: fetchData };
};
