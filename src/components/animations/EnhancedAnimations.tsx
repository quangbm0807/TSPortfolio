// src/components/animations/EnhancedAnimations.tsx
import { motion } from 'framer-motion';
import React, { useState, useEffect, useRef, useCallback, memo } from 'react';

// Types
interface FloatingElementProps {
    children: React.ReactNode;
    delay?: number;
    duration?: number;
    yOffset?: number;
    className?: string;
}

interface AnimatedTextProps {
    text: string;
    className?: string;
    once?: boolean;
    staggerChildren?: number;
    delayChildren?: number;
    effect?: 'fadeUp' | 'fadeIn' | 'scale';
}

interface RevealSectionProps {
    children: React.ReactNode;
    width?: string;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
}

interface CounterAnimationProps {
    end: number;
    duration?: number;
    prefix?: string;
    suffix?: string;
    className?: string;
    decimals?: number;
    formatter?: (value: number) => string;
}

interface AnimatedBorderProps {
    children: React.ReactNode;
    className?: string;
    borderColor?: string;
    duration?: number;
    pattern?: 'full' | 'corners' | 'sides';
}

interface GlitchTextProps {
    text: string;
    className?: string;
    glitchIntensity?: 'low' | 'medium' | 'high';
    ariaLabel?: string;
}

interface Card3DProps {
    children: React.ReactNode;
    className?: string;
    intensity?: number;
    perspective?: number;
    glare?: boolean;
}

interface ParticleExplosionProps {
    className?: string;
    particleCount?: number;
    duration?: number;
    size?: number;
    colors?: string[];
    autoTrigger?: boolean;
    triggerDelay?: number;
    buttonText?: string;
    onExplode?: () => void;
}

interface AnimatedGradientTextProps {
    text: string;
    className?: string;
    from?: string;
    via?: string;
    to?: string;
    duration?: number;
    angle?: string;
}

interface SpotlightProps {
    children: React.ReactNode;
    className?: string;
    size?: number;
    color?: string;
    intensity?: number;
}

// Floating animation effect for any element
export const FloatingElement = memo(({
    children,
    delay = 0,
    duration = 4,
    yOffset = 15,
    className = ''
}: FloatingElementProps) => {
    return (
        <motion.div
            animate={{
                y: [0, -yOffset, 0],
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: delay,
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
});

// Text animation that reveals each character
export const AnimatedText = memo(({
    text,
    className = '',
    once = true,
    staggerChildren = 0.03,
    delayChildren = 0,
    effect = 'fadeUp'
}: AnimatedTextProps) => {
    // Split the text into individual characters
    const letters = Array.from(text);

    const container = {
        hidden: { opacity: 0 },
        visible: () => ({
            opacity: 1,
            transition: {
                staggerChildren: staggerChildren,
                delayChildren: delayChildren
            },
        }),
    };

    // Different animation effects
    const effects = {
        fadeUp: {
            visible: {
                opacity: 1,
                y: 0,
                transition: {
                    type: "spring",
                    damping: 12,
                    stiffness: 200,
                },
            },
            hidden: {
                opacity: 0,
                y: 20,
                transition: {
                    type: "spring",
                    damping: 12,
                    stiffness: 200,
                },
            },
        },
        fadeIn: {
            visible: {
                opacity: 1,
                transition: { duration: 0.3 },
            },
            hidden: {
                opacity: 0,
                transition: { duration: 0.3 },
            },
        },
        scale: {
            visible: {
                opacity: 1,
                scale: 1,
                transition: { type: "spring", stiffness: 300, damping: 24 },
            },
            hidden: {
                opacity: 0,
                scale: 0.8,
                transition: { type: "spring", stiffness: 300, damping: 24 },
            },
        }
    };

    const child = effects[effect];

    return (
        <motion.div
            className={`overflow-hidden inline-flex ${className}`}
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once }}
        >
            {letters.map((letter, index) => (
                <motion.span
                    key={index}
                    variants={child}
                    className="inline-block"
                    style={{ whiteSpace: letter === " " ? "pre" : "normal" }}
                >
                    {letter === " " ? "\u00A0" : letter}
                </motion.span>
            ))}
        </motion.div>
    );
});

// Reveal animation for sections
export const RevealSection = memo(({
    children,
    width = "100%",
    delay = 0,
    direction = 'up'
}: RevealSectionProps) => {
    const directionMap = {
        up: { initial: { opacity: 0, y: 75 }, animate: { opacity: 1, y: 0 } },
        down: { initial: { opacity: 0, y: -75 }, animate: { opacity: 1, y: 0 } },
        left: { initial: { opacity: 0, x: 75 }, animate: { opacity: 1, x: 0 } },
        right: { initial: { opacity: 0, x: -75 }, animate: { opacity: 1, x: 0 } },
    };

    const selectedAnimation = directionMap[direction];

    return (
        <div className="relative overflow-hidden" style={{ width }}>
            <motion.div
                initial={selectedAnimation.initial}
                whileInView={selectedAnimation.animate}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                    duration: 0.5,
                    ease: "easeOut",
                    delay
                }}
            >
                {children}
            </motion.div>
        </div>
    );
});

// Animated counter for statistics
export const CounterAnimation = memo(({
    end,
    duration = 2,
    prefix = '',
    suffix = '',
    className = '',
    decimals = 0,
    formatter
}: CounterAnimationProps) => {
    const [count, setCount] = useState(0);
    const numberRef = useRef<HTMLDivElement>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const hasAnimated = useRef(false);

    const formatValue = useCallback((value: number) => {
        if (formatter) return formatter(value);
        return decimals > 0
            ? value.toFixed(decimals)
            : Math.floor(value).toString();
    }, [decimals, formatter]);

    useEffect(() => {
        // Clear any existing observer
        if (observerRef.current) {
            observerRef.current.disconnect();
        }

        // Create new observer
        observerRef.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;

                    let startTimestamp: number;
                    const step = (timestamp: number) => {
                        if (!startTimestamp) startTimestamp = timestamp;
                        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
                        setCount(progress * end);

                        if (progress < 1) {
                            window.requestAnimationFrame(step);
                        }
                    };
                    window.requestAnimationFrame(step);

                    // Disconnect after animation starts
                    if (observerRef.current) {
                        observerRef.current.disconnect();
                    }
                }
            },
            { threshold: 0.2, rootMargin: "50px" }
        );

        if (numberRef.current) {
            observerRef.current.observe(numberRef.current);
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [end, duration]);

    return (
        <div ref={numberRef} className={className}>
            {prefix}{formatValue(count)}{suffix}
        </div>
    );
});

// Animated border effect
export const AnimatedBorder = memo(({
    children,
    className = '',
    borderColor = 'text-primary',
    duration = 1.5,
    pattern = 'full'
}: AnimatedBorderProps) => {

    // SVG path patterns
    const patterns = {
        full: "M 0,0 L 100,0 L 100,100 L 0,100 Z",
        corners: "M 0,20 L 0,0 L 20,0 M 80,0 L 100,0 L 100,20 M 100,80 L 100,100 L 80,100 M 20,100 L 0,100 L 0,80",
        sides: "M 0,0 L 100,0 M 100,0 L 100,100 M 100,100 L 0,100 M 0,100 L 0,0"
    };

    return (
        <div className={`relative p-1 ${className}`}>
            <div className="absolute inset-0 rounded-lg overflow-hidden">
                <svg
                    width="100%"
                    height="100%"
                    className={`absolute inset-0 ${borderColor}`}
                    style={{ fill: 'none', strokeWidth: 3 }}
                >
                    <motion.path
                        d={patterns[pattern]}
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration, ease: "easeInOut" }}
                        style={{ vectorEffect: 'non-scaling-stroke' }}
                    />
                </svg>
            </div>
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
});

// Glitch text effect
export const GlitchText = memo(({
    text,
    className = '',
    glitchIntensity = 'medium',
    ariaLabel
}: GlitchTextProps) => {
    const getGlitchDelay = () => {
        switch (glitchIntensity) {
            case 'low': return 8;
            case 'high': return 3;
            default: return 5;
        }
    };

    return (
        <div
            className={`relative inline-block ${className}`}
            role="text"
            aria-label={ariaLabel || text}
        >
            <span className="relative z-10">{text}</span>
            <motion.span
                className="absolute top-0 left-0 text-destructive opacity-70 z-0 select-none"
                animate={{
                    x: [0, -2, 2, -1, 0],
                    opacity: [0, 1, 0]
                }}
                transition={{
                    repeat: Infinity,
                    repeatDelay: getGlitchDelay(),
                    duration: 0.2
                }}
                aria-hidden="true"
            >
                {text}
            </motion.span>
            <motion.span
                className="absolute top-0 left-0 text-primary opacity-70 z-0 select-none"
                animate={{
                    x: [0, 2, -2, 1, 0],
                    opacity: [0, 1, 0]
                }}
                transition={{
                    repeat: Infinity,
                    repeatDelay: getGlitchDelay(),
                    duration: 0.2,
                    delay: 0.05
                }}
                aria-hidden="true"
            >
                {text}
            </motion.span>
        </div>
    );
});

// 3D card effect
export const Card3D = memo(({
    children,
    className = '',
    intensity = 10,
    perspective = 1000,
    glare = false
}: Card3DProps) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [transform, setTransform] = useState('rotateX(0deg) rotateY(0deg)');
    const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateXValue = ((y - centerY) / centerY) * intensity * -1;
        const rotateYValue = ((x - centerX) / centerX) * intensity;

        setTransform(`rotateX(${rotateXValue}deg) rotateY(${rotateYValue}deg)`);

        if (glare) {
            // Calculate glare position (as percentage)
            const glareX = (x / rect.width) * 100;
            const glareY = (y / rect.height) * 100;
            setGlarePos({
                x: glareX,
                y: glareY,
                opacity: 0.2
            });
        }
    }, [intensity, glare]);

    const handleMouseLeave = useCallback(() => {
        setTransform('rotateX(0deg) rotateY(0deg)');
        if (glare) {
            setGlarePos({ ...glarePos, opacity: 0 });
        }
    }, [glare, glarePos]);

    return (
        <div
            ref={cardRef}
            className={`relative ${className}`}
            style={{ perspective: `${perspective}px` }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                style={{
                    transform,
                    transition: 'transform 0.1s ease-out',
                    width: '100%',
                    height: '100%'
                }}
            >
                {children}
                {/* Highlight effect */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-primary/5 via-transparent to-primary/10 dark:from-primary/10 dark:to-primary/20 z-10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Glare effect */}
                {glare && (
                    <div
                        className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg z-20"
                        aria-hidden="true"
                    >
                        <div
                            className="absolute -inset-40 bg-gradient-radial from-foreground/30 to-transparent dark:from-background/40 dark:to-transparent rounded-full"
                            style={{
                                opacity: glarePos.opacity,
                                top: `calc(${glarePos.y}% - 120px)`,
                                left: `calc(${glarePos.x}% - 120px)`,
                                width: '240px',
                                height: '240px',
                                filter: 'blur(25px)',
                                transition: 'opacity 0.2s ease-out'
                            }}
                        />
                    </div>
                )}
            </motion.div>
        </div>
    );
});

// Particle explosion effect
export const ParticleExplosion = memo(({
    className = '',
    particleCount = 20,
    duration = 1,
    size = 8,
    colors = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--chart-1))', 'hsl(var(--chart-2))'],
    autoTrigger = false,
    triggerDelay = 0,
    buttonText = 'Click me!',
    onExplode
}: ParticleExplosionProps) => {
    const [particles, setParticles] = useState<React.ReactNode[]>([]);
    const [isExploding, setIsExploding] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const triggerExplosion = useCallback(() => {
        if (isExploding || !containerRef.current) return;

        setIsExploding(true);

        if (onExplode) {
            onExplode();
        }

        const containerRect = containerRef.current.getBoundingClientRect();
        const centerX = containerRect.width / 2;
        const centerY = containerRect.height / 2;

        const newParticles = Array.from({ length: particleCount }).map((_, i) => {
            const angle = (i / particleCount) * 360;
            const distance = Math.random() * 100 + 50;
            const x = Math.cos(angle * (Math.PI / 180)) * distance;
            const y = Math.sin(angle * (Math.PI / 180)) * distance;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const particleSize = Math.random() * size + (size / 2);
            const particleDuration = Math.random() * duration + (duration / 2);

            return (
                <motion.div
                    key={i}
                    initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                    animate={{
                        x,
                        y,
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0.5]
                    }}
                    transition={{
                        duration: particleDuration,
                        ease: "easeOut"
                    }}
                    className="absolute"
                    style={{
                        width: `${particleSize}px`,
                        height: `${particleSize}px`,
                        borderRadius: '50%',
                        backgroundColor: color,
                        top: centerY,
                        left: centerX,
                        marginTop: `-${particleSize / 2}px`,
                        marginLeft: `-${particleSize / 2}px`
                    }}
                />
            );
        });

        setParticles(newParticles);

        setTimeout(() => {
            setParticles([]);
            setIsExploding(false);
        }, duration * 1200); // Slightly longer to ensure all particles complete
    }, [isExploding, particleCount, colors, size, duration, onExplode]);

    // Auto-trigger effect if enabled
    useEffect(() => {
        if (autoTrigger && !isExploding) {
            const timer = setTimeout(() => {
                triggerExplosion();
            }, triggerDelay);

            return () => clearTimeout(timer);
        }
    }, [autoTrigger, triggerDelay, isExploding, triggerExplosion]);

    return (
        <div
            ref={containerRef}
            className={`relative inline-block cursor-pointer ${className}`}
            onClick={triggerExplosion}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    triggerExplosion();
                }
            }}
        >
            {particles}
            <div className="relative z-10">{buttonText}</div>
        </div>
    );
});

// Gradient text that animates
export const AnimatedGradientText = memo(({
    text,
    className = '',
    from = 'from-primary',
    via = 'via-secondary',
    to = 'to-accent',
    duration = 8,
    angle = 'to-r'
}: AnimatedGradientTextProps) => {
    return (
        <motion.div
            className={`bg-gradient-${angle} ${from} ${via} ${to} bg-clip-text text-transparent animate-gradient ${className}`}
            animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
                duration,
                repeat: Infinity,
                ease: "linear",
            }}
            style={{
                backgroundSize: '300% 300%',
            }}
        >
            {text}
        </motion.div>
    );
});

// Spotlight effect that follows mouse
export const Spotlight = memo(({
    children,
    className = '',
    size = 400,
    color = 'hsla(var(--primary) / 0.15)',
    intensity = 1
}: SpotlightProps) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        setPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
        setOpacity(intensity);
    }, [intensity]);

    const handleMouseLeave = useCallback(() => {
        setOpacity(0);
    }, []);

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div className="relative z-10">
                {children}
            </div>
            <div
                className="pointer-events-none absolute -inset-px z-0 transition-opacity duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(circle ${size}px at ${position.x}px ${position.y}px, ${color}, transparent)`,
                }}
                aria-hidden="true"
            ></div>
        </div>
    );
});

// Add to your tailwind.config.js file:
/*
module.exports = {
  theme: {
    extend: {
      animation: {
        'gradient': 'gradient 8s linear infinite',
      },
      keyframes: {
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  // ...
}
*/