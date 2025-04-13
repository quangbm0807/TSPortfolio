import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader2, Clock, MessageSquare, User, Sparkles } from 'lucide-react';
import { useState, useRef } from 'react';

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    message: string;
}

interface FormErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    subject?: string;
    message?: string;
}

const ContactInfo = ({ Icon, title, content }: { Icon: any; title: string; content: string }) => (
    <div className="flex items-start space-x-4 group">
        <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg transition-all duration-300 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800/40 group-hover:shadow-md">
            <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-1 transition-colors duration-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">{title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{content}</p>
        </div>
    </div>
);

export const ContactSection = () => {
    const defaultFormData = {
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
    };

    const [formData, setFormData] = useState<FormData>(defaultFormData);
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [statusMessage, setStatusMessage] = useState('');
    const formRef = useRef<HTMLFormElement>(null);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear error when user types
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            // Determine the appropriate URL based on environment
            const baseUrl = import.meta.env.DEV
                ? 'http://localhost:3001'
                : '';

            const response = await fetch(`${baseUrl}/api/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send message');
            }

            setSubmitStatus('success');
            setStatusMessage('Your message has been sent successfully! I will get back to you soon.');

            // Reset form after successful submission
            setFormData(defaultFormData);

            // Scroll to top of form
            if (formRef.current) {
                formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }

        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');
            setStatusMessage(error instanceof Error ? error.message : 'An unexpected error occurred. Please try again later.');
        } finally {
            setIsSubmitting(false);

            // Automatically clear success message after 8 seconds
            if (submitStatus === 'success') {
                setTimeout(() => {
                    setSubmitStatus('idle');
                }, 8000);
            }
        }
    };

    return (
        <section id="contact" className="py-24 relative overflow-hidden bg-gray-50 dark:bg-gray-900">
            {/* Background decoration */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-100 dark:bg-indigo-900/20 rounded-full opacity-50 blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-indigo-100 dark:bg-indigo-900/20 rounded-full opacity-50 blur-3xl"></div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="max-w-6xl mx-auto"
                >
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center mb-3 px-4 py-1.5 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
                            <Sparkles className="w-4 h-4 mr-2 text-indigo-600 dark:text-indigo-400" />
                            <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">Let's Connect</span>
                        </div>
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
                            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700 backdrop-blur-sm"
                        >
                            <AnimatePresence mode="wait">
                                {submitStatus === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="mb-6 bg-white dark:bg-gray-900 border border-green-200 dark:border-green-800 rounded-lg overflow-hidden shadow-md"
                                    >
                                        <div className="bg-green-100 dark:bg-green-900/30 px-4 py-2 flex items-center border-b border-green-200 dark:border-green-800">
                                            <CheckCircle className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
                                            <h3 className="font-medium text-green-800 dark:text-green-200">Message Sent</h3>
                                        </div>
                                        <div className="p-4">
                                            <p className="text-gray-700 dark:text-gray-300 mb-3">{statusMessage}</p>
                                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                                <Clock className="w-4 h-4 mr-1" />
                                                <span>A confirmation email has been sent to your inbox</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {submitStatus === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="mb-6 bg-white dark:bg-gray-900 border border-red-200 dark:border-red-800 rounded-lg overflow-hidden shadow-md"
                                    >
                                        <div className="bg-red-100 dark:bg-red-900/30 px-4 py-2 flex items-center border-b border-red-200 dark:border-red-800">
                                            <AlertCircle className="w-5 h-5 mr-2 text-red-600 dark:text-red-400" />
                                            <h3 className="font-medium text-red-800 dark:text-red-200">Error</h3>
                                        </div>
                                        <div className="p-4">
                                            <p className="text-gray-700 dark:text-gray-300">{statusMessage}</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                                            <User className="w-4 h-4 mr-1" />
                                            First Name*
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 rounded-lg border ${errors.firstName
                                                ? 'border-red-500 dark:border-red-400 bg-red-50 dark:bg-red-900/10'
                                                : 'border-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-400'
                                                } dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 
                                            outline-none transition-all duration-200`}
                                            placeholder="John"
                                        />
                                        <AnimatePresence>
                                            {errors.firstName && (
                                                <motion.p
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="mt-1 text-sm text-red-500 dark:text-red-400"
                                                >
                                                    {errors.firstName}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                                            <User className="w-4 h-4 mr-1" />
                                            Last Name*
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 rounded-lg border ${errors.lastName
                                                ? 'border-red-500 dark:border-red-400 bg-red-50 dark:bg-red-900/10'
                                                : 'border-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-400'
                                                } dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 
                                            outline-none transition-all duration-200`}
                                            placeholder="Doe"
                                        />
                                        <AnimatePresence>
                                            {errors.lastName && (
                                                <motion.p
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="mt-1 text-sm text-red-500 dark:text-red-400"
                                                >
                                                    {errors.lastName}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                                        <Mail className="w-4 h-4 mr-1" />
                                        Email*
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 rounded-lg border ${errors.email
                                            ? 'border-red-500 dark:border-red-400 bg-red-50 dark:bg-red-900/10'
                                            : 'border-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-400'
                                            } dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 
                                        outline-none transition-all duration-200`}
                                        placeholder="john@example.com"
                                    />
                                    <AnimatePresence>
                                        {errors.email && (
                                            <motion.p
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="mt-1 text-sm text-red-500 dark:text-red-400"
                                            >
                                                {errors.email}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                                        <MessageSquare className="w-4 h-4 mr-1" />
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 
                                        dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 
                                        outline-none transition-all duration-200 focus:border-indigo-500 dark:focus:border-indigo-400"
                                        placeholder="Project Inquiry"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                                        <MessageSquare className="w-4 h-4 mr-1" />
                                        Message*
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={5}
                                        className={`w-full px-4 py-3 rounded-lg border ${errors.message
                                            ? 'border-red-500 dark:border-red-400 bg-red-50 dark:bg-red-900/10'
                                            : 'border-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-400'
                                            } dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 
                                        outline-none transition-all duration-200`}
                                        placeholder="Your message..."
                                    />
                                    <AnimatePresence>
                                        {errors.message && (
                                            <motion.p
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="mt-1 text-sm text-red-500 dark:text-red-400"
                                            >
                                                {errors.message}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full inline-flex items-center justify-center px-6 py-3 bg-indigo-600 
                                    text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200
                                    disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/30 hover:shadow-indigo-600/40"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5 mr-2" />
                                            Send Message
                                        </>
                                    )}
                                </motion.button>

                                {/* Email notification info */}
                                {!isSubmitting && submitStatus !== 'success' && (
                                    <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
                                        <p>A confirmation email will be sent to your inbox</p>
                                    </div>
                                )}
                            </form>
                        </motion.div>

                        {/* Contact Information */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-8 lg:pl-8"
                        >
                            <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 backdrop-blur-sm">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Contact Information</h3>
                                <div className="space-y-6">
                                    <ContactInfo
                                        Icon={Mail}
                                        title="Email"
                                        content="buiminhquang2002@gmail.com"
                                    />
                                    <ContactInfo
                                        Icon={Phone}
                                        title="Phone"
                                        content="0342 8686 39"
                                    />
                                    <ContactInfo
                                        Icon={MapPin}
                                        title="Location"
                                        content="Go Vap, Ho Chi Minh City"
                                    />
                                </div>
                            </div>

                            {/* Map or Additional Content */}
                            <div className="mt-8">
                                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 border border-gray-100 dark:border-gray-700 overflow-hidden">
                                    <div className="w-full h-64 rounded-xl overflow-hidden relative">
                                        <img
                                            src="/images/logos/location.png"
                                            alt="Location map"
                                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                                            <div className="p-4 text-white font-medium">
                                                <span className="flex items-center">
                                                    <MapPin className="w-4 h-4 mr-1" />
                                                    Go Vap, Ho Chi Minh City
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Connect with Me</h3>
                                <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
                                    {/* GitHub */}
                                    <motion.a
                                        href="https://github.com/quangbm0807"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ y: -5 }}
                                        className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors duration-200"
                                        aria-label="GitHub"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                        </svg>
                                    </motion.a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-1/4 left-0 w-24 h-24 bg-indigo-400/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-1/3 right-1/4 w-32 h-32 bg-indigo-400/10 rounded-full blur-xl"></div>
        </section>
    );
};
