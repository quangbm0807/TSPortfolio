import { motion } from 'framer-motion';
import { Rocket, Heart, Star, CloudLightning } from 'lucide-react';

const FeatureCard = ({ Icon, title, description }: { Icon: any, title: string, description: string }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
    >
        <div className="flex items-center mb-4">
            <Icon className="w-6 h-6 text-indigo-500 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {title}
            </h3>
        </div>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </motion.div>
);

export const AboutSection = () => {
    const features = [
        {
            Icon: Rocket,
            title: "Fast Learner",
            description: "Quick to grasp new technologies and adapt to changing requirements."
        },
        {
            Icon: Heart,
            title: "Passionate",
            description: "Deeply passionate about creating elegant solutions to complex problems."
        },
        {
            Icon: CloudLightning,
            title: "Efficient",
            description: "Focus on writing clean, efficient, and maintainable code."
        },
        {
            Icon: Star,
            title: "Detail-Oriented",
            description: "Strong attention to detail and commitment to quality."
        }
    ];

    return (
        <section id="about" className="py-20bg-gradient-creative from-primary-500 via-secondary-500 to-accent-500">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="max-w-6xl mx-auto"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Text Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                                About Me
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300">
                                Hello! I'm a passionate full-stack developer with 5+ years of experience
                                in building web applications. I specialize in React, Node.js, and
                                modern web technologies.
                            </p>
                            <p className="text-lg text-gray-600 dark:text-gray-300">
                                My journey in tech started when I built my first website at 15.
                                Since then, I've worked with various technologies and frameworks,
                                always staying up-to-date with the latest industry trends.
                            </p>
                            <div className="pt-4">
                                <a
                                    href="#contact"
                                    className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                                >
                                    Get in Touch
                                </a>
                            </div>
                        </motion.div>

                        {/* Image */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
                                <img
                                    src="/api/placeholder/600/600"
                                    alt="About me"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <FeatureCard {...feature} />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};