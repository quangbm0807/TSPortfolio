import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactInfo = ({ Icon, title, content }: { Icon: any; title: string; content: string }) => (
    <div className="flex items-start space-x-4">
        <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
            <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-1">{title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{content}</p>
        </div>
    </div>
);

export const ContactSection = () => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Add form submission logic here
    };

    return (
        <section id="contact" className="py-20 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="max-w-6xl mx-auto"
                >
                    <div className="text-center mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white"
                        >
                            Get in Touch
                        </motion.h2>
                        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Have a question or want to work together? Feel free to reach out!
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
                        >
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 
                             dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 
                             outline-none transition-all duration-200"
                                            placeholder="John"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 
                             dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 
                             outline-none transition-all duration-200"
                                            placeholder="Doe"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 
                           dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 
                           outline-none transition-all duration-200"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 
                           dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 
                           outline-none transition-all duration-200"
                                        placeholder="Project Inquiry"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        rows={4}
                                        className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 
                           dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 
                           outline-none transition-all duration-200"
                                        placeholder="Your message..."
                                    />
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="w-full inline-flex items-center justify-center px-6 py-3 bg-indigo-600 
                         text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                                >
                                    <Send className="w-5 h-5 mr-2" />
                                    Send Message
                                </motion.button>
                            </form>
                        </motion.div>

                        {/* Contact Information */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-8 lg:pl-8"
                        >
                            <ContactInfo
                                Icon={Mail}
                                title="Email"
                                content="contact@example.com"
                            />
                            <ContactInfo
                                Icon={Phone}
                                title="Phone"
                                content="+1 (555) 123-4567"
                            />
                            <ContactInfo
                                Icon={MapPin}
                                title="Location"
                                content="San Francisco, CA, United States"
                            />

                            {/* Map or Additional Content */}
                            <div className="mt-8">
                                <div className="bg-gray-100 dark:bg-gray-800 rounded-xl h-64">
                                    {/* Add map component or additional content here */}
                                    <div className="w-full h-full rounded-xl overflow-hidden">
                                        <img
                                            src="/api/placeholder/800/400"
                                            alt="Location map"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};