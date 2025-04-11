import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, LucideIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from 'react';
import { ImageModal } from '../ImageModal';

interface SocialLink {
    Icon: LucideIcon;
    href: string;
    label: string;
}

const socialLinks: SocialLink[] = [
    { Icon: Github, href: "https://github.com/quangbm0807", label: "GitHub" },
    { Icon: Linkedin, href: "https://linkedin.com/in/your-linkedin", label: "LinkedIn" },
    { Icon: Mail, href: "mailto:buiminhquang2002@gmail.com", label: "Email" },
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

export const HeroSection = () => {
    const [mounted, setMounted] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [profileImage] = useState("/images/profile/avatar.jpg");

    useEffect(() => {
        setMounted(true);
    }, []);

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

    const handleImageClick = () => {
        setIsModalOpen(true);
    };

    if (!mounted) return null;

    return (
        <section id="home" className="py-20 relative overflow-hidden">
            <div className="relative z-10 px-4 py-32">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-4xl mx-auto text-center"
                >
                    <motion.div variants={itemVariants} className="mb-8">
                        <div className="w-40 h-40 mx-auto border-4 border-background shadow-xl rounded-full overflow-hidden cursor-pointer group">
                            <motion.img
                                src={profileImage}
                                alt="Bui Minh Quang"
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                onClick={handleImageClick}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            />
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 flex flex-wrap items-center justify-center">
                            Hi, I'm{" "}
                            <div className="relative h-[1.2em] w-full inline-flex justify-center ml-2">
                                <motion.span
                                    key="name"
                                    initial={{ display: "block", opacity: 0, y: 20 }}
                                    animate={{ opacity: [0, 1, 1, 0], y: [20, 0, 0, -20] }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        repeatDelay: 3,
                                        ease: "easeInOut",
                                        times: [0, 0.1, 0.9, 1]
                                    }}
                                    className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700 whitespace-nowrap"
                                >
                                    Bui Minh Quang
                                </motion.span>
                                <motion.span
                                    key="role"
                                    initial={{ display: "block", opacity: 0, y: 20 }}
                                    animate={{ opacity: [0, 1, 1, 0], y: [20, 0, 0, -20] }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        repeatDelay: 3,
                                        delay: 3,
                                        ease: "easeInOut",
                                        times: [0, 0.1, 0.9, 1]
                                    }}
                                    className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-purple-700 whitespace-nowrap"
                                >
                                    Fullstack Developer
                                </motion.span>
                            </div>
                        </h1>

                        <motion.div
                            variants={itemVariants}
                            className="flex flex-wrap justify-center gap-2 mb-8"
                        >
                            {["Fullstack Developer", "Java Developer", "React Developer"].map((badge, index) => (
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
                            {socialLinks?.map((link, index) => (
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

            {/* Image Modal */}
            <ImageModal
                isOpen={isModalOpen}
                imageUrl={profileImage}
                altText="Bui Minh Quang"
                onClose={() => setIsModalOpen(false)}
            />
        </section>
    );
};