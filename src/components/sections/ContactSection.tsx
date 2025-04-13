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
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
                        >
                            {submitStatus === 'success' && (
                                <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-lg flex items-center">
                                    <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                                    <p>{statusMessage}</p>
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-lg flex items-center">
                                    <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                                    <p>{statusMessage}</p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            First Name*
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-2 rounded-lg border ${errors.firstName ? 'border-red-500 dark:border-red-400' : 'dark:border-gray-600'
                                                } dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 
                                            outline-none transition-all duration-200`}
                                            placeholder="John"
                                        />
                                        {errors.firstName && (
                                            <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.firstName}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Last Name*
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-2 rounded-lg border ${errors.lastName ? 'border-red-500 dark:border-red-400' : 'dark:border-gray-600'
                                                } dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 
                                            outline-none transition-all duration-200`}
                                            placeholder="Doe"
                                        />
                                        {errors.lastName && (
                                            <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.lastName}</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Email*
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2 rounded-lg border ${errors.email ? 'border-red-500 dark:border-red-400' : 'dark:border-gray-600'
                                            } dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 
                                        outline-none transition-all duration-200`}
                                        placeholder="john@example.com"
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.email}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 
                                        dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 
                                        outline-none transition-all duration-200"
                                        placeholder="Project Inquiry"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Message*
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={4}
                                        className={`w-full px-4 py-2 rounded-lg border ${errors.message ? 'border-red-500 dark:border-red-400' : 'dark:border-gray-600'
                                            } dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 
                                        outline-none transition-all duration-200`}
                                        placeholder="Your message..."
                                    />
                                    {errors.message && (
                                        <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.message}</p>
                                    )}
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full inline-flex items-center justify-center px-6 py-3 bg-indigo-600 
                                    text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200
                                    disabled:opacity-70 disabled:cursor-not-allowed"
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

                            {/* Map or Additional Content */}
                            <div className="mt-8">
                                <div className="bg-gray-100 dark:bg-gray-800 rounded-xl h-64">
                                    <div className="w-full h-full rounded-xl overflow-hidden">
                                        <img
                                            src="/images/logos/location.png"
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