import { motion } from 'framer-motion';
import { Rocket, Heart, Star, CloudLightning } from 'lucide-react';
import { ResumeDownload } from '../ResumeDownload';
import { ImageCarousel } from '../ImageCarousel';

const profileImages = [
    { url: "/images/profile/avatar3.jpg", alt: "Bui Minh Quang profile picture" },
    { url: "/images/profile/avatar.jpg", alt: "Bui Minh Quang profile picture 2" },
    { url: "/images/profile/avatar2.jpg", alt: "Bui Minh Quang profile picture 3" },
];

const FeatureCard = ({ Icon, title, description }: { Icon: any, title: string, description: string }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg"
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
            <div className="container mx-auto px-4 " >
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
                                Hello! I'm a Fullstack Developer with a strong foundation in Java and React development. Currently studying Software Development at FPT Polytechnic College and Mechatronics Engineering at Ton Duc Thang University.
                            </p>
                            <p className="text-lg text-gray-600 dark:text-gray-300">
                                I specialize in building responsive web applications using React and developing backend services with Java/Spring Boot. I'm passionate about creating elegant solutions that provide excellent user experiences with a GPA of 9.2/10 and recognition as a top outstanding student.
                            </p>
                            <div className="pt-4 flex flex-wrap gap-4">
                                <a
                                    href="#contact"
                                    className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                                >
                                    Get in Touch
                                </a>
                                <ResumeDownload file="/resume.pdf" />
                            </div>
                        </motion.div>

                        {/* Image Carousel */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <ImageCarousel images={profileImages} autoplaySpeed={6000} />
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