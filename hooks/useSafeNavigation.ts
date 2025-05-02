import { useRouter } from 'expo-router';
import { useRef } from 'react';

export function useSafeNavigation(delay = 1000) {
    const router = useRouter();
    const isNavigating = useRef(false);

    const push = (path: any) => {
        if (isNavigating.current) return;

        isNavigating.current = true;
        router.push(path);

        setTimeout(() => {
            isNavigating.current = false;
        }, delay);
    };

    return { push };
}
