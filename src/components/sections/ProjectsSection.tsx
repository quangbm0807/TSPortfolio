import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

interface Project {
    title: string;
    description: string;
    image: string;
    tech: string[];
    github?: string;
    demo?: string;
    featured?: boolean;
}

const projects: Project[] = [
    {
        title: "E-commerce Platform",
        description: "A full-stack e-commerce platform with real-time inventory management, payment processing, and admin dashboard.",
        image: "/api/placeholder/800/600",
        tech: ["React", "Node.js", "MongoDB", "Stripe", "Redis"],
        github: "https://github.com",
        demo: "https://demo.com",
        featured: true
    },
    {
        title: "Task Management App",
        description: "A collaborative task management application with real-time updates, file sharing, and team chat functionality.",
        image: "/api/placeholder/800/600",
        tech: ["Vue.js", "Firebase", "Tailwind CSS", "WebSocket"],
        github: "https://github.com",
        demo: "https://demo.com",
        featured: true
    },
    {
        title: "AI-Powered Analytics",
        description: "Data analytics platform using machine learning to provide insights and predictions for business metrics.",
        image: "/api/placeholder/800/600",
        tech: ["Python", "TensorFlow", "React", "FastAPI"],
        github: "https://github.com",
        featured: true
    },
    {
        title: "Social Media Dashboard",
        description: "Comprehensive dashboard for managing and analyzing social media presence across multiple platforms.",
        image: "/api/placeholder/800/600",
        tech: ["Next.js", "GraphQL", "PostgreSQL", "Chart.js"],
        demo: "https://demo.com"
    }
];

const ProjectCard = ({ project }: { project: Project }) => {
    return (
        <motion.div
            whileHover={{ y: -10 }}
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg group"
        >
            {/* Image Container */}
            <div className="relative overflow-hidden">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors duration-200"
                        >
                            <Github className="w-5 h-5 text-gray-900" />
                        </a>
                    )}
                    {project.demo && (
                        <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors duration-200"
                        >
                            <ExternalLink className="w-5 h-5 text-gray-900" />
                        </a>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {project.title}
                    {project.featured && (
                        <span className="ml-2 px-2 py-1 text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded-full">
                            Featured
                        </span>
                    )}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                        <span
                            key={tech}
                            className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export const ProjectsSection = () => {
    return (
        <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900">
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
                            Featured Projects
                        </motion.h2>
                        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            A collection of my recent work, showcasing my skills in web development,
                            design, and problem-solving.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <ProjectCard project={project} />
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mt-12"
                    >
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-200"
                        >
                            <Github className="w-5 h-5 mr-2" />
                            View More on GitHub
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};