import { motion, useAnimation } from 'framer-motion';
import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { useTheme } from '../../context/ThemeContext';

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

interface RevealProps {
    children: React.ReactNode;
    width?: string;
    delay?: number;
    duration?: number;
    threshold?: number;
    distance?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
    repeat?: boolean;
    className?: string;
}

interface CounterAnimationProps {
    end: number;
    duration?: number;
    prefix?: string;
    suffix?: string;
    className?: string;
    decimals?: number;
    formatter?: (value: number) => string;
    repeat?: boolean;
}

interface AnimatedBorderProps {
    children: React.ReactNode;
    className?: string;
    borderColor?: string;
    duration?: number;
    pattern?: 'full' | 'corners' | 'sides';
    repeat?: boolean;
}

interface Card3DProps {
    children: React.ReactNode;
    className?: string;
    intensity?: number;
    perspective?: number;
    glare?: boolean;
    glareColor?: string;
    transformOnHover?: boolean;
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

interface StaggerContainerProps {
    children: React.ReactNode;
    className?: string;
    delayChildren?: number;
    staggerChildren?: number;
    direction?: 'forwards' | 'backwards';
    repeat?: boolean;
    animation?: 'fadeUp' | 'fadeIn' | 'zoom' | 'slideIn';
    distance?: number;
    once?: boolean;
}

interface FadeInWhenVisibleProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    threshold?: number;
    repeat?: boolean;
    animation?: 'fadeUp' | 'fadeIn' | 'scale' | 'slideIn';
    direction?: 'up' | 'down' | 'left' | 'right';
    distance?: number;
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
    once = false,
    staggerChildren = 0.03,
    delayChildren = 0,
    effect = 'fadeUp'
}: AnimatedTextProps) => {
    // Split the text into individual characters
    const letters = Array.from(text);

    // Effects library
    const effects = {
        fadeUp: {
            container: {
                hidden: { opacity: 0 },
                visible: (i = 1) => ({
                    opacity: 1,
                    transition: {
                        staggerChildren: staggerChildren,
                        delayChildren: delayChildren * i,
                    },
                }),
            },
            child: {
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
            }
        },
        fadeIn: {
            container: {
                hidden: { opacity: 0 },
                visible: (i = 1) => ({
                    opacity: 1,
                    transition: {
                        staggerChildren: staggerChildren,
                        delayChildren: delayChildren * i,
                    },
                }),
            },
            child: {
                visible: {
                    opacity: 1,
                    transition: { duration: 0.3 },
                },
                hidden: {
                    opacity: 0,
                    transition: { duration: 0.3 },
                },
            }
        },
        scale: {
            container: {
                hidden: { opacity: 0 },
                visible: (i = 1) => ({
                    opacity: 1,
                    transition: {
                        staggerChildren: staggerChildren,
                        delayChildren: delayChildren * i,
                    },
                }),
            },
            child: {
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
        }
    };

    const selectedEffect = effects[effect];

    const controls = useAnimation();
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        controls.start("visible");
                    } else if (!once) {
                        controls.start("hidden");
                    }
                });
            },
            { threshold: 0.1, rootMargin: "100px" }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [controls, once]);

    return (
        <motion.div
            ref={ref}
            className={`overflow-hidden inline-flex ${className}`}
            variants={selectedEffect.container}
            initial="hidden"
            animate={controls}
        >
            {letters.map((letter, index) => (
                <motion.span
                    key={index}
                    variants={selectedEffect.child}
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
export const Reveal = memo(({
    children,
    width = "100%",
    delay = 0,
    duration = 0.5,
    threshold = 0.1,
    distance = 50,
    direction = 'up',
    repeat = false,
    className = ""
}: RevealProps) => {
    const controls = useAnimation();
    const ref = useRef<HTMLDivElement>(null);

    const directionMap = {
        up: { hidden: { y: distance, opacity: 0 }, visible: { y: 0, opacity: 1 } },
        down: { hidden: { y: -distance, opacity: 0 }, visible: { y: 0, opacity: 1 } },
        left: { hidden: { x: -distance, opacity: 0 }, visible: { x: 0, opacity: 1 } },
        right: { hidden: { x: distance, opacity: 0 }, visible: { x: 0, opacity: 1 } },
    };

    const selectedVariants = directionMap[direction];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        controls.start("visible");
                    } else if (repeat) {
                        controls.start("hidden");
                    }
                });
            },
            { threshold, rootMargin: "10px" }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [controls, threshold, repeat]);

    return (
        <div ref={ref} className={`relative overflow-hidden ${className}`} style={{ width }}>
            <motion.div
                variants={selectedVariants}
                initial="hidden"
                animate={controls}
                transition={{
                    duration,
                    ease: "easeOut",
                    delay
                }}
            >
                {children}
            </motion.div>
        </div>
    );
});

// Stagger children animations
export const StaggerContainer = memo(({
    children,
    className = "",
    delayChildren = 0,
    staggerChildren = 0.1,
    direction = 'forwards',
    repeat = false,
    animation = 'fadeUp',
    distance = 30,
    once = false
}: StaggerContainerProps) => {
    const controls = useAnimation();
    const ref = useRef<HTMLDivElement>(null);

    // Animation variants
    const animations = {
        fadeUp: {
            hidden: { opacity: 0, y: distance },
            visible: { opacity: 1, y: 0 }
        },
        fadeIn: {
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
        },
        zoom: {
            hidden: { opacity: 0, scale: 0.8 },
            visible: { opacity: 1, scale: 1 }
        },
        slideIn: {
            hidden: { opacity: 0, x: distance },
            visible: { opacity: 1, x: 0 }
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren,
                delayChildren,
                staggerDirection: direction === 'backwards' ? -1 : 1
            }
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        controls.start("visible");
                    } else if (repeat && !once) {
                        controls.start("hidden");
                    }
                });
            },
            { threshold: 0.1, rootMargin: "100px" }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [controls, repeat, once]);

    // Create child variants based on the animation type
    const childVariants = animations[animation];

    // Clone children and add variants
    const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<any>, {
                variants: childVariants,
                transition: {
                    type: "spring",
                    damping: 12,
                    stiffness: 200
                }
            });
        }
        return child;
    });

    return (
        <motion.div
            ref={ref}
            className={className}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
        >
            {childrenWithProps}
        </motion.div>
    );
});

// Generic fade in animation when element is visible
export const FadeInWhenVisible = memo(({
    children,
    className = "",
    delay = 0,
    duration = 0.5,
    threshold = 0.1,
    repeat = false,
    animation = 'fadeUp',
    direction = 'up',
    distance = 30
}: FadeInWhenVisibleProps) => {
    const controls = useAnimation();
    const ref = useRef<HTMLDivElement>(null);

    // Construct animation variants based on selected animation type and direction
    const getVariants = () => {
        switch (animation) {
            case 'fadeUp':
                return {
                    hidden: { opacity: 0, y: direction === 'up' ? distance : -distance },
                    visible: { opacity: 1, y: 0 }
                };
            case 'fadeIn':
                return {
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 }
                };
            case 'scale':
                return {
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1 }
                };
            case 'slideIn':
                return {
                    hidden: {
                        opacity: 0,
                        x: direction === 'left' ? -distance : direction === 'right' ? distance : 0,
                        y: direction === 'up' ? distance : direction === 'down' ? -distance : 0
                    },
                    visible: { opacity: 1, x: 0, y: 0 }
                };
            default:
                return {
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                };
        }
    };

    const variants = getVariants();

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        controls.start("visible");
                    } else if (repeat) {
                        controls.start("hidden");
                    }
                });
            },
            { threshold, rootMargin: "10px" }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [controls, threshold, repeat]);

    return (
        <motion.div
            ref={ref}
            className={className}
            variants={variants}
            initial="hidden"
            animate={controls}
            transition={{
                duration,
                delay,
                ease: "easeOut"
            }}
        >
            {children}
        </motion.div>
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
    formatter,
    repeat = false
}: CounterAnimationProps) => {
    const [count, setCount] = useState(0);
    const numberRef = useRef<HTMLDivElement>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const hasAnimated = useRef(false);
    const animationRef = useRef<number | null>(null);

    const formatValue = useCallback((value: number) => {
        if (formatter) return formatter(value);
        return decimals > 0
            ? value.toFixed(decimals)
            : Math.floor(value).toString();
    }, [decimals, formatter]);

    const animateValue = useCallback((timestamp: number, startTimestamp: number = timestamp) => {
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        setCount(progress * end);

        if (progress < 1 && animationRef.current) {
            animationRef.current = window.requestAnimationFrame((newTimestamp) =>
                animateValue(newTimestamp, startTimestamp)
            );
        }
    }, [end, duration]);

    const startAnimation = useCallback(() => {
        if (repeat || !hasAnimated.current) {
            hasAnimated.current = true;

            // Reset any ongoing animation
            if (animationRef.current) {
                window.cancelAnimationFrame(animationRef.current);
            }

            // Start from 0
            setCount(0);

            // Begin new animation
            animationRef.current = window.requestAnimationFrame((timestamp) => animateValue(timestamp));
        }
    }, [animateValue, repeat]);

    useEffect(() => {
        // Clear any existing observer
        if (observerRef.current) {
            observerRef.current.disconnect();
        }

        // Create new observer
        observerRef.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    startAnimation();
                } else if (repeat) {
                    hasAnimated.current = false;
                }
            },
            { threshold: 0.2, rootMargin: "0px" }
        );

        if (numberRef.current) {
            observerRef.current.observe(numberRef.current);
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
            if (animationRef.current) {
                window.cancelAnimationFrame(animationRef.current);
            }
        };
    }, [startAnimation, repeat]);

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
    pattern = 'full',
    repeat = false
}: AnimatedBorderProps) => {
    const { theme } = useTheme();
    const controls = useAnimation();
    const ref = useRef<HTMLDivElement>(null);

    // SVG path patterns
    const patterns = {
        full: "M 0,0 L 100,0 L 100,100 L 0,100 Z",
        corners: "M 0,20 L 0,0 L 20,0 M 80,0 L 100,0 L 100,20 M 100,80 L 100,100 L 80,100 M 20,100 L 0,100 L 0,80",
        sides: "M 0,0 L 100,0 M 100,0 L 100,100 M 100,100 L 0,100 M 0,100 L 0,0"
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        controls.start({
                            pathLength: 1,
                            opacity: 1,
                            transition: { duration, ease: "easeInOut" }
                        });
                    } else if (repeat) {
                        controls.start({
                            pathLength: 0,
                            opacity: 0,
                            transition: { duration: 0.3 }
                        });
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [controls, duration, repeat]);

    // Adapt border color for better visibility in different themes
    const adaptedBorderColor = theme === 'dark'
        ? borderColor.includes('text-primary')
            ? 'text-primary-foreground'
            : borderColor
        : borderColor;

    return (
        <div ref={ref} className={`relative p-1 ${className}`}>
            <div className="absolute inset-0 rounded-lg overflow-hidden">
                <svg
                    width="100%"
                    height="100%"
                    className={`absolute inset-0 ${adaptedBorderColor}`}
                    style={{ fill: 'none', strokeWidth: 3 }}
                >
                    <motion.path
                        d={patterns[pattern]}
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={controls}
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

// 3D card effect
export const Card3D = memo(({
    children,
    className = '',
    intensity = 8,
    perspective = 1000,
    glare = false,
    transformOnHover = true
}: Card3DProps) => {
    const { theme } = useTheme();
    const cardRef = useRef<HTMLDivElement>(null);
    const [transform, setTransform] = useState('rotateX(0deg) rotateY(0deg)');
    const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

    // Adapt glare color based on theme
    const adaptedGlareColor = theme === 'dark'
        ? 'rgba(255, 255, 255, 0.2)'
        : 'rgba(255, 255, 255, 0.4)';

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current || !transformOnHover) return;

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
    }, [intensity, glare, transformOnHover]);

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

                {/* Theme-adaptive highlight effect */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr 
                    from-primary/5 via-transparent to-primary/10 
                    dark:from-primary/10 dark:to-primary/20 
                    z-10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />

                {/* Glare effect */}
                {glare && (
                    <div
                        className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg z-20"
                        aria-hidden="true"
                    >
                        <div
                            className="absolute -inset-40 bg-gradient-radial rounded-full"
                            style={{
                                opacity: glarePos.opacity,
                                top: `calc(${glarePos.y}% - 120px)`,
                                left: `calc(${glarePos.x}% - 120px)`,
                                width: '240px',
                                height: '240px',
                                filter: 'blur(25px)',
                                transition: 'opacity 0.2s ease-out',
                                background: `radial-gradient(circle, ${adaptedGlareColor} 0%, transparent 70%)`
                            }}
                        />
                    </div>
                )}
            </motion.div>
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
    const { theme } = useTheme();

    // Adjust gradient colors for dark mode if needed
    const adaptedFrom = theme === 'dark' && from === 'from-primary' ? 'from-primary-foreground' : from;
    const adaptedTo = theme === 'dark' && to === 'to-accent' ? 'to-accent-foreground' : to;

    return (
        <motion.div
            className={`bg-gradient-${angle} ${adaptedFrom} ${via} ${adaptedTo} bg-clip-text text-transparent ${className}`}
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

// Export a ready-to-use animations object for easier imports
export const Animations = {
    FloatingElement,
    AnimatedText,
    Reveal,
    StaggerContainer,
    FadeInWhenVisible,
    CounterAnimation,
    AnimatedBorder,
    Card3D,
    AnimatedGradientText
};

export default Animations;