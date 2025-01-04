import { useEffect, useState, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';

const GalaxyBackground = () => {
    const { theme } = useTheme();
    const isLight = theme === 'light';

    const [stars, setStars] = useState<Array<{
        id: string;
        top: string;
        left: string;
        size: number;
        animationDelay: string;
        opacity: number;
    }>>([]);

    const [shootingStars, setShootingStars] = useState<Array<{
        id: string;
        top: string;
        left: string;
        animationDelay: string;
    }>>([]);

    const [nebulas, setNebulas] = useState<Array<{
        id: string;
        top: string;
        left: string;
        width: string;
        height: string;
        animationDelay: string;
        type: number;
        rotation: number;
    }>>([]);

    const generateElements = useCallback(() => {
        // Generate stars with varying sizes
        const newStars = Array.from({ length: 150 }, (_, i) => ({
            id: `star-${i}`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            size: Math.random() * 2 + 1,
            animationDelay: `${Math.random() * 3}s`,
            opacity: Math.random() * 0.5 + (isLight ? 0.3 : 0.5)
        }));

        // Generate shooting stars
        const newShootingStars = Array.from({ length: 3 }, (_, i) => ({
            id: `shooting-star-${i}`,
            top: `${Math.random() * 50}%`,
            left: `-10px`,
            animationDelay: `${Math.random() * 20 + 5}s`
        }));

        // Generate larger, more spread out nebulas
        const newNebulas = Array.from({ length: 4 }, (_, i) => ({
            id: `nebula-${i}`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 400 + 300}px`,
            height: `${Math.random() * 400 + 300}px`,
            animationDelay: `${Math.random() * 10}s`,
            type: i % 3,
            rotation: Math.random() * 360
        }));

        setStars(newStars);
        setShootingStars(newShootingStars);
        setNebulas(newNebulas);
    }, [isLight]);

    useEffect(() => {
        generateElements();
    }, [generateElements]);

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
            {/* Nebulas - Reduced opacity for light theme */}
            {nebulas.map((nebula) => (
                <div
                    key={nebula.id}
                    className="nebula"
                    style={{
                        top: nebula.top,
                        left: nebula.left,
                        width: nebula.width,
                        height: nebula.height,
                        animationDelay: nebula.animationDelay,
                        transform: `rotate(${nebula.rotation}deg)`,
                        opacity: isLight ? 0.1 : 0.15,
                        background: nebula.type === 0
                            ? 'hsl(var(--galaxy-primary))'
                            : nebula.type === 1
                                ? 'hsl(var(--galaxy-secondary))'
                                : 'hsl(var(--galaxy-accent))'
                    }}
                />
            ))}

            {/* Stars */}
            {stars.map((star) => (
                <div
                    key={star.id}
                    className="star"
                    style={{
                        top: star.top,
                        left: star.left,
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        animationDelay: star.animationDelay,
                        opacity: star.opacity,
                        backgroundColor: 'hsl(var(--star-color))',
                        boxShadow: isLight
                            ? '0 0 2px hsl(var(--star-color) / 0.5)'
                            : '0 0 3px hsl(var(--star-color) / 0.8)'
                    }}
                />
            ))}

            {/* Shooting Stars */}
            {shootingStars.map((star) => (
                <div
                    key={star.id}
                    className="shooting-star"
                    style={{
                        top: star.top,
                        left: star.left,
                        animationDelay: star.animationDelay,
                    }}
                />
            ))}

            {/* Background Gradient Overlay */}
            <div
                className={`absolute inset-0 ${isLight
                    ? 'bg-gradient-to-b from-background/90 via-background/70 to-background/90'
                    : 'bg-gradient-to-b from-background/80 via-background/60 to-background/80'
                    }`}
            />
        </div>
    );
};

export default GalaxyBackground;