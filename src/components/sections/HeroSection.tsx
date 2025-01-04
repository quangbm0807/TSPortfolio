import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Youtube, LucideIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from 'react';

interface SocialLink {
    Icon: LucideIcon;
    href: string;
    label: string;
}

const socialLinks: SocialLink[] = [
    { Icon: Github, href: "https://github.com", label: "GitHub" },
    { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { Icon: Youtube, href: "https://youtube.com", label: "YouTube" },
    { Icon: Mail, href: "mailto:your@email.com", label: "Email" },
];

interface SocialButtonProps {
    Icon: LucideIcon;
    href: string;
    label: string;
}

const SocialButton: React.FC<SocialButtonProps> = ({ Icon, href, label }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            <Button
                variant="ghost"
                size="icon"
                asChild
                className="relative rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80"
            >
                <motion.a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={label}
                >
                    <Icon className="h-5 w-5" />
                    {isHovered && (
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap bg-background/90 px-2 py-1 rounded"
                        >
                            {label}
                        </motion.span>
                    )}
                </motion.a>
            </Button>
        </motion.div>
    );
};

const Star = ({ x, y }: { x: number; y: number }) => {
    const size = Math.random() * 3 + 1;
    const duration = Math.random() * 3 + 2;

    return (
        <motion.div
            className="absolute rounded-full"
            style={{
                left: `${x}%`,
                top: `${y}%`,
                width: `${size}px`,
                height: `${size}px`,
                background: `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`
            }}
            animate={{
                y: [0, -15, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
            }}
            transition={{
                duration,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        />
    );
};

const ShootingStar = () => (
    <motion.div
        className="absolute w-1 h-1 bg-white"
        initial={{ x: "-100%", y: "0%", opacity: 0 }}
        animate={{
            x: "200%",
            y: "100%",
            opacity: [0, 1, 0],
        }}
        transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: Math.random() * 10 + 5
        }}
        style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 50}%`,
        }}
    />
);

export const HeroSection = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const stars = Array.from({ length: 100 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100
    }));

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10
            }
        }
    };

    if (!mounted) return null;

    return (
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
            {/* Animated gradient background */}
            <motion.div
                className="absolute inset-0"
                animate={{
                    background: [
                        "linear-gradient(45deg, rgba(var(--primary-rgb), 0.1) 0%, rgba(var(--primary-rgb), 0.05) 50%, rgba(var(--primary-rgb), 0.1) 100%)",
                        "linear-gradient(45deg, rgba(var(--primary-rgb), 0.15) 0%, rgba(var(--primary-rgb), 0.05) 50%, rgba(var(--primary-rgb), 0.15) 100%)",
                        "linear-gradient(45deg, rgba(var(--primary-rgb), 0.1) 0%, rgba(var(--primary-rgb), 0.05) 50%, rgba(var(--primary-rgb), 0.1) 100%)",
                    ],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Stars background */}
            <div className="absolute inset-0">
                {stars.map((pos, i) => (
                    <Star key={i} x={pos.x} y={pos.y} />
                ))}
                {[1, 2, 3].map((i) => (
                    <ShootingStar key={`shooting-${i}`} />
                ))}
            </div>

            <div className="container relative z-10 px-4 py-32">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-4xl mx-auto text-center"
                >
                    <motion.div variants={itemVariants} className="mb-8">
                        <Avatar className="w-32 h-32 mx-auto border-4 border-background shadow-xl">
                            <AvatarImage src="/api/placeholder/400/400" alt="Profile" />
                            <AvatarFallback>BQ</AvatarFallback>
                        </Avatar>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">
                            Hi, I'm{" "}
                            <motion.span
                                className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60"
                                animate={{
                                    backgroundPosition: ["0%", "100%", "0%"],
                                }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            >
                                Bui Minh Quang
                            </motion.span>
                        </h1>

                        <motion.div
                            variants={itemVariants}
                            className="flex flex-wrap justify-center gap-2 mb-8"
                        >
                            {["Frontend Developer", "Java Developer", "UI/UX Enthusiast"].map((badge, index) => (
                                <motion.div
                                    key={badge}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.2 }}
                                >
                                    <Badge
                                        variant="secondary"
                                        className="text-lg py-1.5 hover:bg-primary/20 transition-colors"
                                    >
                                        {badge}
                                    </Badge>
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <Card className="bg-background/50 backdrop-blur-sm border-none shadow-lg mb-8 hover:bg-background/60 transition-colors">
                                <CardContent className="p-4">
                                    <p className="text-lg text-muted-foreground">
                                        Passionate about creating beautiful and functional web experiences
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="flex justify-center space-x-4"
                        >
                            {socialLinks.map((link, index) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <SocialButton {...link} />
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};