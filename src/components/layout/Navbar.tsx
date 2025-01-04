import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { useScrollTo } from '../../hooks/useScrollTo';
import ThemeToggle from '../ThemeToggle';

const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
];

interface NavItemProps {
    id: string;
    label: string;
    isActive: boolean;
    onClick: () => void;
}

const NavItem = ({ label, isActive, onClick }: NavItemProps) => (
    <motion.li
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative"
    >
        <button
            onClick={onClick}
            className={`px-4 py-2 text-sm md:text-base relative ${isActive
                ? 'text-indigo-600 dark:text-indigo-400'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
        >
            {label}
            {isActive && (
                <motion.div
                    layoutId="activeSection"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400"
                    initial={false}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
            )}
        </button>
    </motion.li>
);

// Menu animation variants
const menuVariants = {
    closed: {
        height: 0,
        opacity: 0,
        transition: {
            duration: 0.3,
            type: "tween",
            ease: "easeInOut",
            staggerChildren: 0.05,
            staggerDirection: -1
        }
    },
    open: {
        height: "auto",
        opacity: 1,
        transition: {
            duration: 0.3,
            type: "tween",
            ease: "easeInOut",
            staggerChildren: 0.05,
            delayChildren: 0.1
        }
    }
};

const menuItemVariants = {
    closed: {
        x: -20,
        opacity: 0
    },
    open: {
        x: 0,
        opacity: 1
    }
};

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const activeSection = useScrollSpy(navItems.map(item => item.id), 100);
    const scrollTo = useScrollTo();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (id: string) => {
        scrollTo(id);
        setIsOpen(false);
    };



    return (
        <motion.header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
    ${isScrolled
                    ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg'
                    : 'bg-transparent backdrop-blur-sm'
                }`}
        >
            <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <motion.a
                    href="#home"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-xl font-bold text-gray-900 dark:text-white"
                    onClick={(e) => {
                        e.preventDefault();
                        handleNavClick('home');
                    }}
                >
                    Portfolio
                </motion.a>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-6">
                    <ul className="flex items-center space-x-1">
                        {navItems.map((item) => (
                            <NavItem
                                key={item.id}
                                id={item.id}
                                label={item.label}
                                isActive={activeSection === item.id}
                                onClick={() => handleNavClick(item.id)}
                            />
                        ))}
                    </ul>

                    {/* Controls Group */}
                    <div className="flex items-center space-x-4">
                        {/* <LanguageToggle
                            currentLang={currentLang}
                            onToggle={toggleLanguage}
                        /> */}
                        <ThemeToggle />
                    </div>
                </div>

                {/* Mobile Controls */}
                <div className="flex items-center space-x-4 md:hidden">
                    {/* <LanguageToggle
                        currentLang={currentLang}
                        onToggle={toggleLanguage}
                    /> */}
                    <ThemeToggle />
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={isOpen ? 'close' : 'open'}
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                {isOpen ? (
                                    <X className="w-6 h-6" />
                                ) : (
                                    <Menu className="w-6 h-6" />
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </motion.button>
                </div>

                {/* Mobile Navigation Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            variants={menuVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            className="absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 shadow-lg md:hidden
                                     overflow-hidden"
                        >
                            <motion.ul
                                className="py-2"
                                variants={menuVariants}
                            >
                                {navItems.map((item) => (
                                    <motion.li
                                        key={item.id}
                                        variants={menuItemVariants}
                                        className="border-b border-gray-100 dark:border-gray-800 last:border-none"
                                    >
                                        <button
                                            onClick={() => handleNavClick(item.id)}
                                            className={`w-full px-6 py-4 text-left flex items-center space-x-4
                                                      transition-colors duration-200 ${activeSection === item.id
                                                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20'
                                                    : 'text-gray-600 dark:text-gray-300'
                                                }`}
                                        >
                                            <span>{item.label}</span>
                                            {activeSection === item.id && (
                                                <motion.div
                                                    layoutId="activeIndicator"
                                                    className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400"
                                                />
                                            )}
                                        </button>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </motion.header>
    );
};