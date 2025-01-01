import { useTheme } from '../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.button
            onClick={toggleTheme}
            className={`
                relative w-16 h-8 rounded-full p-1
                bg-gradient-to-r
                ${theme === 'dark'
                    ? 'from-indigo-500 to-purple-500'
                    : 'from-yellow-300 to-orange-400'
                }
                transition-colors duration-500
                shadow-lg hover:shadow-xl
                flex items-center
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {/* Background elements */}
            <div className="absolute inset-0 w-full h-full rounded-full overflow-hidden">
                <div className={`
                    absolute inset-0 
                    transition-opacity duration-500
                    ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}
                `}>
                    {/* Stars */}
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-1 bg-white rounded-full"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animation: `twinkle ${1 + Math.random() * 2}s infinite`
                            }}
                        />
                    ))}
                </div>
                <div className={`
                    absolute inset-0
                    transition-opacity duration-500
                    ${theme === 'dark' ? 'opacity-0' : 'opacity-100'}
                `}>
                    {/* Clouds */}
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute bg-white/30 rounded-full"
                            style={{
                                width: `${10 + Math.random() * 20}px`,
                                height: `${6 + Math.random() * 10}px`,
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Toggle circle with icon */}
            <motion.div
                className={`
                    w-6 h-6 rounded-full 
                    flex items-center justify-center
                    ${theme === 'dark'
                        ? 'bg-gray-800'
                        : 'bg-white'
                    }
                    shadow-md
                `}
                initial={false}
                animate={{
                    x: theme === 'dark' ? 32 : 0,
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                }}
            >
                {theme === 'dark' ? (
                    <Moon className="w-4 h-4 text-yellow-300" />
                ) : (
                    <Sun className="w-4 h-4 text-orange-400" />
                )}
            </motion.div>
        </motion.button>
    );
}


export default ThemeToggle;