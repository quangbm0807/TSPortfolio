import { useState, useEffect } from 'react';

export const useScrollSpy = (ids: string[], offset = 0) => {
    const [activeId, setActiveId] = useState<string>('');

    useEffect(() => {
        const listener = () => {
            const scroll = window.scrollY;

            const element = ids
                .map((id) => {
                    const element = document.getElementById(id);
                    if (!element) return { id, top: 0 };
                    return {
                        id,
                        top: element.getBoundingClientRect().top + scroll,
                    };
                })
                .filter(({ top }) => top - offset <= scroll)
                .sort((a, b) => b.top - a.top)[0];

            setActiveId(element?.id || '');
        };

        listener();
        window.addEventListener('scroll', listener);
        return () => window.removeEventListener('scroll', listener);
    }, [ids, offset]);

    return activeId;
};