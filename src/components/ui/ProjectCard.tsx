import { motion } from 'framer-motion';

interface ProjectCardProps {
    title: string;
    description: string;
    tech: string[];
}

export const ProjectCard = ({ title, description, tech }: ProjectCardProps) => {
    return (
        <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
                <div className="flex flex-wrap gap-2">
                    {tech.map((t, i) => (
                        <span
                            key={i}
                            className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-200 rounded-full text-sm"
                        >
                            {t}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};