import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import debounce from 'lodash.debounce';

export function useDebouncedNavigation(delay = 500) {
    const router = useRouter();

    const navigate = useCallback(
        debounce((path: any) => {
            router.push(path);
        }, delay, { leading: true, trailing: false }),
        [router]
    );

    return navigate;
}
