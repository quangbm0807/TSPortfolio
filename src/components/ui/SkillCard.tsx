import { motion } from 'framer-motion';
import { Code2, Database, Layout, Terminal, Palette, Server } from 'lucide-react';

const SkillCard = ({ Icon, title, skills }: { Icon: any, title: string, skills: string[] }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
    >
        <div className="flex items-center mb-4">
            <Icon className="w-6 h-6 text-indigo-500 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        </div>
        <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
                <span
                    key={index}
                    className="px-3 py-1 text-sm bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 rounded-full"
                >
                    {skill}
                </span>
            ))}
        </div>
    </motion.div>
);

export const SkillsSection = () => {
    const skillCategories = [
        {
            Icon: Layout,
            title: "Frontend",
            skills: ["React", "Vue.js", "TypeScript", "Tailwind CSS", "Next.js"]
        },
        {
            Icon: Server,
            title: "Backend",
            skills: ["Node.js", "Python", "Java", "Express", "Django"]
        },
        {
            Icon: Database,
            title: "Database",
            skills: ["PostgreSQL", "MongoDB", "Redis", "MySQL"]
        },
        {
            Icon: Terminal,
            title: "DevOps",
            skills: ["Docker", "AWS", "CI/CD", "Linux"]
        },
        {
            Icon: Code2,
            title: "Languages",
            skills: ["JavaScript", "Python", "Java", "TypeScript", "SQL"]
        },
        {
            Icon: Palette,
            title: "Design",
            skills: ["Figma", "Adobe XD", "UI/UX", "Responsive Design"]
        }
    ];

    return (
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
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
                            My Skills & Expertise
                        </motion.h2>
                        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            A comprehensive overview of my technical skills and areas of expertise
                            in software development and design.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {skillCategories.map((category, index) => (
                            <motion.div
                                key={category.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <SkillCard {...category} />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};