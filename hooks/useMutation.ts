import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect, useCallback } from 'react';
interface MutationOptions extends RequestInit { }

// Hook for POST, PUT, DELETE requests
export const useMutation = <T>() => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);



    const mutate = async (param: string, method: 'POST' | 'PUT' | 'DELETE', body: unknown = {}, options: MutationOptions = {}) => {
        setLoading(true);
        setError(null);


        console.log(body, '|||||||||||||||||')

        // const userStr: any = await AsyncStorage.getItem('user')
        // const userData = JSON.parse(userStr)


        const accessToken: any = await AsyncStorage.getItem('token')

        const userDataStr = await AsyncStorage.getItem('userData')
        const userData = JSON.parse(userDataStr as any)
        const accessToken2 = userData?.additionalInfo?.idToken

        try {




            const response = await fetch(`https://dev.zone42.in/api-main/${param}`, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken2}`,
                    ...(options.headers || {}),
                },
                body: JSON.stringify(body),
                ...options,
            });
            const result: T = await response.json();

            if (!response.ok) {
                throw new Error(result as unknown as string || 'Something went wrong');
            }
            setData(result);
            return result;
        } catch (err) {
            setError((err as Error).message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { data, error, loading, mutate };
};
