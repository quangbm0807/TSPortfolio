import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { FeaturedProject } from '../FeaturedProject';

interface Project {
    title: string;
    description: string;
    image: string;
    tech: string[];
    github?: string;
    demo?: string;
    featured?: boolean;
    role?: string;
    teamSize?: string;
}

const featuredProjects = [
    {
        title: "Typing App",
        description: "This app measures typing speed, tracks typing history, and displays progress through visual charts based on typing records. I developed it independently using React and TypeScript, with a focus on performance and user experience.",
        image: "/api/placeholder/800/600",
        tech: ["React", "TypeScript", "Ant Design", "Recharts", "Confetti"],
        github: "https://github.com/quangbm0807/typing-app",
        demo: "https://github.com/pages/typing-app",
        role: "Fullstack Developer",
        teamSize: "1"
    },
    {
        title: "Freelancer Platform",
        description: "The platform enables clients to find freelancers for various projects and allows freelancers to search for job opportunities. I was responsible for developing specific APIs, creating a realtime notification service with Stomp & SockJS, training a chatbot with DialogFlow, and building the frontend interface.",
        image: "/api/placeholder/800/600",
        tech: ["SpringBoot", "Restful APIs", "MySQL", "ReactJS", "DialogFlow", "Stomp", "SocketIO"],
        github: "https://github.com/quangbm0807/freelancer-platform",
        role: "Fullstack Developer",
        teamSize: "3"
    },
    {
        title: "Food Services",
        description: "Built with a Java backend and ReactJS frontend, the platform enables clients to find and order from various food service providers. My role focused on developing the frontend interface with ReactJS based on Figma mockups, implementing UI components, and making API calls.",
        image: "/api/placeholder/800/600",
        tech: ["ReactJS", "I18N", "Axios", "Antd"],
        demo: "https://youtube.com/demo",
        role: "Frontend Developer",
        teamSize: "3"
    }
];

const regularProjects: Project[] = [
    {
        title: "Weather App",
        description: "A simple weather app that uses the OpenWeatherMap API to show current weather and allows users to search for other locations.",
        image: "/api/placeholder/800/600",
        tech: ["React", "TypeScript", "Ant Design", "Axios"],
        github: "https://github.com/quangbm0807/weather-app",
        demo: "https://github.com/pages/weather-app",
        role: "Developer",
        teamSize: "1"
    },
    {
        title: "Restaurant Management",
        description: "Built with Java Swing for the frontend and SQL Server with JDBC for the backend, this platform provides full functionality for managing a restaurant.",
        image: "/api/placeholder/800/600",
        tech: ["Java Swing", "SQL Server", "JDBC"],
        demo: "https://youtube.com/demo",
        role: "Fullstack Developer",
        teamSize: "6"
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
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {project.description}
                </p>

                {(project.role || project.teamSize) && (
                    <div className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                        {project.role && <span className="mr-3">Role: {project.role}</span>}
                        {project.teamSize && <span>Team Size: {project.teamSize}</span>}
                    </div>
                )}

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

export const EnhancedProjectsSection = () => {
    return (
        <section id="projects" className="py-20 relative overflow-hidden">
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
                            My Projects
                        </motion.h2>
                        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            A showcase of my recent work, demonstrating my skills in web development,
                            UI/UX design, and problem-solving.
                        </p>
                    </div>

                    {/* Featured Projects */}
                    <div className="space-y-32 mb-32">
                        {featuredProjects.map((project, index) => (
                            <FeaturedProject
                                key={project.title}
                                title={project.title}
                                description={project.description}
                                image={project.image}
                                technologies={project.tech}
                                github={project.github}
                                demo={project.demo}
                                reverse={index % 2 === 1}
                                role={project.role}
                                teamSize={project.teamSize}
                            />
                        ))}
                    </div>

                    {/* Other Projects */}
                    <div>
                        <h3 className="text-2xl font-bold text-center mb-10 text-gray-900 dark:text-white">
                            Other Noteworthy Projects
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {regularProjects.map((project, index) => (
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
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mt-16"
                    >
                        <a
                            href="https://github.com/quangbm0807"
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