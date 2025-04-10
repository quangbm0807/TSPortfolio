import { useCallback } from 'react';

export const useScrollTo = () => {
    const scrollTo = useCallback((elementId: string) => {
        const element = document.getElementById(elementId);
        if (element) {
            const navbarHeight = 64; // 4rem or 64px

            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }, []);

    return scrollTo;
};