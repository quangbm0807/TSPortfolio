import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

export const HeroSection = () => {
    const socialLinks = [
        { Icon: Github, href: "https://github.com" },
        { Icon: Linkedin, href: "https://linkedin.com" },
        { Icon: Twitter, href: "https://twitter.com" },
        { Icon: Mail, href: "mailto:your@email.com" },
    ];

    return (
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800" />

            {/* Content */}
            <div className="container relative z-10 px-4 py-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-xl"
                    >
                        <img
                            src="/api/placeholder/128/128"
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6"
                    >
                        Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Your Name</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12"
                    >
                        Crafting digital experiences with code & creativity
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex justify-center space-x-6"
                    >
                        {socialLinks.map(({ Icon, href }) => (
                            <motion.a
                                key={href}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <Icon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                            </motion.a>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};