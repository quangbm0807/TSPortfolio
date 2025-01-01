import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';

interface Experience {
    title: string;
    company: string;
    period: string;
    description: string[];
    technologies: string[];
}

const experiences: Experience[] = [
    {
        title: "Senior Frontend Developer",
        company: "Tech Corp Inc.",
        period: "2022 - Present",
        description: [
            "Led the development of a next-generation SaaS platform",
            "Improved application performance by 40%",
            "Mentored junior developers and conducted code reviews"
        ],
        technologies: ["React", "TypeScript", "Next.js", "GraphQL"]
    },
    {
        title: "Full Stack Developer",
        company: "Innovation Labs",
        period: "2020 - 2022",
        description: [
            "Developed and maintained multiple client applications",
            "Implemented CI/CD pipelines reducing deployment time by 60%",
            "Collaborated with design team to improve UI/UX"
        ],
        technologies: ["Vue.js", "Node.js", "PostgreSQL", "Docker"]
    },
    {
        title: "Software Engineer",
        company: "StartUp Co",
        period: "2018 - 2020",
        description: [
            "Built RESTful APIs for mobile applications",
            "Implemented real-time features using WebSocket",
            "Optimized database queries improving response time"
        ],
        technologies: ["Python", "Django", "React Native", "Redis"]
    }
];

export const ExperienceSection = () => {
    return (
        <section id='experience' className="py-20 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="text-center mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white"
                        >
                            Work Experience
                        </motion.h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            My professional journey and contributions in the tech industry
                        </p>
                    </div>

                    <div className="space-y-12">
                        {experiences.map((experience, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-lg"
                            >
                                <div className="flex items-center mb-4">
                                    <Briefcase className="w-6 h-6 text-indigo-500 mr-3" />
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                            {experience.title}
                                        </h3>
                                        <p className="text-indigo-600 dark:text-indigo-400">
                                            {experience.company}
                                        </p>
                                    </div>
                                    <div className="ml-auto flex items-center text-gray-500 dark:text-gray-400">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        {experience.period}
                                    </div>
                                </div>

                                <ul className="ml-6 mb-4 space-y-2">
                                    {experience.description.map((item, i) => (
                                        <li key={i} className="text-gray-600 dark:text-gray-300 list-disc">
                                            {item}
                                        </li>
                                    ))}
                                </ul>

                                <div className="flex flex-wrap gap-2">
                                    {experience.technologies.map((tech, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 text-sm bg-indigo-100 dark:bg-indigo-900/30 
                               text-indigo-600 dark:text-indigo-300 rounded-full"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};