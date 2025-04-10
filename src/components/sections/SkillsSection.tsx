import { motion } from 'framer-motion';
import {
    Database,
    Layout,
    Terminal,
    GitBranch,
    Cloud,
    Palette,
    Globe,
    Server,

} from 'lucide-react';

interface Skill {
    name: string;
    icon: React.ReactNode;
    description: string;
    tags: string[];
}

const skills: Skill[] = [
    {
        name: 'Frontend Development',
        icon: <Layout className="w-8 h-8 text-indigo-500" />,
        description: 'Building responsive and interactive user interfaces with modern frameworks',
        tags: ['ReactJS', 'AngularJS', 'TypeScript', 'Ant Design', 'Axios']
    },
    {
        name: 'Backend Development',
        icon: <Server className="w-8 h-8 text-blue-500" />,
        description: 'Creating scalable server-side applications and APIs',
        tags: ['Java', 'Spring Boot', 'Spring MVC', 'RESTful APIs']
    },
    {
        name: 'Database',
        icon: <Database className="w-8 h-8 text-emerald-500" />,
        description: 'Working with various database systems for data storage and management',
        tags: ['MySQL', 'SQL Server', 'PostgreSQL', 'JPA', 'ORM']
    },
    {
        name: 'Development Tools',
        icon: <Terminal className="w-8 h-8 text-red-500" />,
        description: 'Using professional development tools and environments',
        tags: ['VSCode', 'JetBrains', 'XAMPP', 'Eclipse', 'Git', 'Postman']
    }
];

const SkillCard = ({ skill }: { skill: Skill }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
    >
        <div className="flex items-start space-x-4">
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                {skill.icon}
            </div>
            <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {skill.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {skill.description}
                </p>
                <div className="flex flex-wrap gap-2">
                    {skill.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 text-sm bg-indigo-50 dark:bg-indigo-900/30 
                                     text-indigo-600 dark:text-indigo-300 rounded-full"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    </motion.div>
);

export const SkillsSection = () => {
    return (
        <section id="skills" className="py-20 relative overflow-hidden">
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
                            Skills & Expertise
                        </motion.h2>
                        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            A comprehensive overview of my technical skills and expertise in various
                            areas of software development and design.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {skills.map((skill, index) => (
                            <motion.div
                                key={skill.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <SkillCard skill={skill} />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};