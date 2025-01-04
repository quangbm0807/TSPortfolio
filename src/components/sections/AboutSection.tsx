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
            title: "Quick Learner",
            description: "Achieved top outstanding student status multiple terms, demonstrating ability to grasp new concepts quickly."
        },
        {
            Icon: Heart,
            title: "Passionate Developer",
            description: "Dedicated to creating efficient and user-friendly applications with modern technologies."
        },
        {
            Icon: CloudLightning,
            title: "Full Stack Capable",
            description: "Experienced in both frontend and backend development with React, Java, and Spring Boot."
        },
        {
            Icon: Star,
            title: "Achievement Oriented",
            description: "Maintained a 9.2/10 GPA while working on multiple real-world projects."
        }
    ];

    return (
        <section id="about" className="py-20 relative overflow-hidden">
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
                                Hello! I'm a passionate Frontend Developer with strong foundation in Java development. Currently pursuing Software Development and Mechatronics Engineering at FPT Polytechnic College and Ton Duc Thang University.
                            </p>
                            <p className="text-lg text-gray-600 dark:text-gray-300">
                                I specialize in building responsive web applications using React and TypeScript, with experience in both frontend and backend development. My goal is to create elegant solutions that provide excellent user experiences.
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