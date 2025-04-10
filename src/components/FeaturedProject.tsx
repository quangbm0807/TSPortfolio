import { motion } from 'framer-motion';
import { Github, ExternalLink, Code } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface FeaturedProjectProps {
    title: string;
    description: string;
    image: string;
    technologies: string[];
    github?: string;
    demo?: string;
    reverse?: boolean;
    role?: string;
    teamSize?: string;
}

export const FeaturedProject = ({
    title,
    description,
    image,
    technologies,
    github,
    demo,
    reverse = false,
    role,
    teamSize
}: FeaturedProjectProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
        >
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${reverse ? 'lg:flex-row-reverse' : ''}`}>
                {/* Project Image */}
                <motion.div
                    className="relative"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="relative overflow-hidden rounded-xl shadow-2xl group">
                        <img
                            src={image}
                            alt={title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                            <div className="w-full p-6 flex justify-between items-center">
                                <h3 className="text-2xl font-bold text-white">{title}</h3>
                                <div className="flex gap-3">
                                    {github && (
                                        <motion.a
                                            href={github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ y: -5 }}
                                            className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                                        >
                                            <Github className="w-5 h-5" />
                                        </motion.a>
                                    )}
                                    {demo && (
                                        <motion.a
                                            href={demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ y: -5 }}
                                            className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                                        >
                                            <ExternalLink className="w-5 h-5" />
                                        </motion.a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Project Info */}
                <div className={`${reverse ? 'lg:pr-8' : 'lg:pl-8'}`}>
                    <div className="space-y-4">
                        <div>
                            <Badge className="mb-3 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border-none">
                                Featured Project
                            </Badge>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h3>
                        </div>

                        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg shadow-lg">
                            <p className="text-gray-700 dark:text-gray-300">{description}</p>
                        </div>

                        {(role || teamSize) && (
                            <div className="flex flex-wrap gap-4">
                                {role && (
                                    <div className="flex items-center gap-2">
                                        <Code className="w-4 h-4 text-indigo-500" />
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Role: {role}
                                        </span>
                                    </div>
                                )}
                                {teamSize && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Team Size: {teamSize}
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="flex flex-wrap gap-2">
                            {technologies.map((tech, index) => (
                                <motion.span
                                    key={tech}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full"
                                >
                                    {tech}
                                </motion.span>
                            ))}
                        </div>

                        <div className="flex gap-4 pt-2">
                            {github && (
                                <motion.a
                                    href={github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                                >
                                    <Github className="w-4 h-4 mr-2" />
                                    View Code
                                </motion.a>
                            )}
                            {demo && (
                                <motion.a
                                    href={demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                                >
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    Live Demo
                                </motion.a>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative element */}
            <div className={`absolute top-1/2 -translate-y-1/2 ${reverse ? 'left-0 -translate-x-1/2' : 'right-0 translate-x-1/2'} w-20 h-20 rounded-full bg-indigo-500/20 blur-3xl -z-10`}></div>
        </motion.div>
    );
};