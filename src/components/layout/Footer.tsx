import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';

export const Footer = () => {
    const socialLinks = [
        { Icon: Github, href: "https://github.com", label: "GitHub" },
        { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
        { Icon: Twitter, href: "https://twitter.com", label: "Twitter" },
        { Icon: Mail, href: "mailto:your@email.com", label: "Email" },
    ];

    const links = [
        { title: "Navigation", items: ["Home", "About", "Projects", "Experience"] },
        { title: "Resources", items: ["Blog", "Documentation", "Source Code"] },
        { title: "Legal", items: ["Privacy Policy", "Terms of Service"] },
    ];

    return (
        <footer className="bg-white dark:bg-gray-900 border-t dark:border-gray-800">
            {/* Main Footer */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Portfolio</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Crafting digital experiences with passion and precision
                        </p>
                        <div className="flex space-x-4">
                            {socialLinks.map(({ Icon, href, label }) => (
                                <motion.a
                                    key={href}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400"
                                    aria-label={label}
                                >
                                    <Icon className="w-5 h-5" />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Links Sections */}
                    {links.map((section) => (
                        <div key={section.title}>
                            <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                                {section.title}
                            </h4>
                            <ul className="space-y-2">
                                {section.items.map((item) => (
                                    <li key={item}>
                                        <a
                                            href="#"
                                            className="text-gray-600 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-200"
                                        >
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-200 dark:border-gray-800">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            © {new Date().getFullYear()} Your Name. All rights reserved.
                        </p>
                        <div className="flex space-x-6">
                            <a
                                href="#"
                                className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400"
                            >
                                Privacy Policy
                            </a>
                            <a
                                href="#"
                                className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400"
                            >
                                Terms of Service
                            </a>
                            <a
                                href="#"
                                className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400"
                            >
                                Contact
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};