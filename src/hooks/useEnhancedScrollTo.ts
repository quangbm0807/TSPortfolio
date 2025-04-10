// src/hooks/useEnhancedScrollTo.ts
import { useCallback, useEffect, useState } from 'react';

export const useEnhancedScrollTo = () => {
    const [isMobile, setIsMobile] = useState(false);

    // Check if device is mobile based on window width
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Check immediately on mount
        checkIfMobile();

        // Add resize listener
        window.addEventListener('resize', checkIfMobile);

        // Clean up
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    const scrollTo = useCallback((id: string) => {
        // Add a small delay for mobile devices to ensure the navbar collapse animation completes
        const delay = isMobile ? 300 : 0;

        setTimeout(() => {
            const element = document.getElementById(id);
            if (element) {
                // Use different offset based on device type
                const navbarHeight = isMobile ? 80 : 64; // Larger offset for mobile

                // Get the element's position relative to the viewport
                const elementRect = element.getBoundingClientRect();

                // Calculate the scroll position
                const offsetPosition = elementRect.top + window.pageYOffset - navbarHeight;

                // Perform the scroll
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }, delay);
    }, [isMobile]);

    return scrollTo;
};