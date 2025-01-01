import { motion } from 'framer-motion';

interface LanguageToggleProps {
    currentLang: string;
    onToggle: () => void;
}

const LanguageToggle = ({ currentLang, onToggle }: LanguageToggleProps) => {
    return (
        <motion.button
            onClick={onToggle}
            className="relative h-8 px-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500
                 text-white font-medium text-sm flex items-center justify-center
                 shadow-lg hover:shadow-xl transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <span className="mr-1">
                {currentLang === 'en' ? '🇺🇸' : '🇻🇳'}
            </span>
            {currentLang.toUpperCase()}
        </motion.button>
    );
};

export default LanguageToggle;