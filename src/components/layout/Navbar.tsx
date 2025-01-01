import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { useScrollTo } from '../../hooks/useScrollTo';

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

const NavItem = ({ id, label, isActive, onClick }: NavItemProps) => (
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

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { theme, toggleTheme } = useTheme();
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
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg'
                : 'bg-transparent'
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
                <ul className="hidden md:flex items-center space-x-1">
                    {navItems.map((item) => (
                        <NavItem
                            key={item.id}
                            id={item.id}
                            label={item.label}
                            isActive={activeSection === item.id}
                            onClick={() => handleNavClick(item.id)}
                        />
                    ))}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleTheme}
                        className="ml-4 p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
                    >
                        {theme === 'dark' ? (
                            <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                        ) : (
                            <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                        )}
                    </motion.button>
                </ul>

                {/* Mobile Menu Button */}
                <div className="flex items-center md:hidden">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleTheme}
                        className="mr-2 p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
                    >
                        {theme === 'dark' ? (
                            <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                        ) : (
                            <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                        )}
                    </motion.button>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 text-gray-600 dark:text-gray-300"
                    >
                        {isOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 shadow-lg md:hidden"
                        >
                            <ul className="py-2">
                                {navItems.map((item) => (
                                    <motion.li
                                        key={item.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                    >
                                        <button
                                            onClick={() => handleNavClick(item.id)}
                                            className={`w-full px-4 py-3 text-left ${activeSection === item.id
                                                ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20'
                                                : 'text-gray-600 dark:text-gray-300'
                                                }`}
                                        >
                                            {item.label}
                                        </button>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </motion.header>
    );
};