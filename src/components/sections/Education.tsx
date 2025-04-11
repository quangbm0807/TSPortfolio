import { motion } from 'framer-motion';
import { GraduationCap, Award, } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface Education {
    institution: string;
    degree: string;
    period: string;
    logo?: string;
    achievements?: string[];
}

interface CertificateType {
    name: string;
    issuer: string;
    date: string;
    icon?: React.ReactNode;
}

const educationList: Education[] = [
    {
        institution: "FPT Polytechnic College",
        degree: "Software Development (Java)",
        period: "08/2024 - Present",
        achievements: ["GPA: 9.2/10", "Top Outstanding Student in multiple terms"]
    },
    {
        institution: "Ton Duc Thang University",
        degree: "Mechatronics Engineering",
        period: "10/2020 - 03/2022"
    }
];

const certificates: CertificateType[] = [
    {
        name: "Hospital Data Analytics",
        issuer: "FPT Polytechnic Workshop",
        date: "2024",
        icon: <Award className="w-5 h-5 text-blue-500" />
    },
    {
        name: "Java Web Application Development",
        issuer: "FPT Polytechnic Workshop",
        date: "2024",
        icon: <Award className="w-5 h-5 text-green-500" />
    },
    {
        name: "ReactJS Tutorial",
        issuer: "Great Learning",
        date: "2024",
        icon: <Award className="w-5 h-5 text-purple-500" />
    },
    {
        name: "Spring Boot & Angular Development",
        issuer: "Udemy",
        date: "2024",
        icon: <Award className="w-5 h-5 text-red-500" />
    }
];

export const EducationSection = () => {
    return (
        <section id="education" className="py-20 relative overflow-hidden">
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
                            Education & Certifications
                        </motion.h2>
                        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            My academic background and professional certifications
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Education Column */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center mb-6">
                                <GraduationCap className="w-8 h-8 text-indigo-600 mr-3" />
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    Education
                                </h3>
                            </div>

                            <div className="space-y-8">
                                {educationList.map((edu, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                                                    {edu.institution}
                                                </h4>
                                                <p className="text-indigo-600 dark:text-indigo-400 mb-2">
                                                    {edu.degree}
                                                </p>
                                            </div>
                                            <Badge variant="outline" className="bg-indigo-50 dark:bg-indigo-900/30">
                                                {edu.period}
                                            </Badge>
                                        </div>

                                        {edu.achievements && (
                                            <div className="mt-4">
                                                <div className="flex items-center mb-2">
                                                    <Award className="w-4 h-4 text-yellow-500 mr-2" />
                                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                        Achievements
                                                    </span>
                                                </div>
                                                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 ml-2 space-y-1">
                                                    {edu.achievements.map((achievement, i) => (
                                                        <li key={i}>{achievement}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Certifications Column */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center mb-6">
                                <Award className="w-8 h-8 text-indigo-600 mr-3" />
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    Certifications
                                </h3>
                            </div>

                            <div className="space-y-4">
                                {certificates.map((cert, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center"
                                    >
                                        <div className="p-2 mr-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-full">
                                            {cert.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium text-gray-900 dark:text-white">
                                                {cert.name}
                                            </h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {cert.issuer}
                                            </p>
                                        </div>
                                        <Badge variant="outline" className="ml-auto">
                                            {cert.date}
                                        </Badge>
                                    </motion.div>
                                ))}
                            </div>


                        </motion.div>

                    </div>
                    {/* Visual Element */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="mt-8 p-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl text-white"
                    >
                        <h4 className="font-bold text-xl mb-2">Continuous Learning</h4>
                        <p className="opacity-90">
                            Always expanding my skills through courses, workshops, and self-study to stay
                            current with the latest technologies and best practices in software development.
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};