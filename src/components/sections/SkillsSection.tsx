import { motion } from 'framer-motion';
import {
    Code2,
    Database,
    Layout,
    Terminal,
    GitBranch,
    Cloud,
    Palette,
    Monitor,
    Settings,
    Globe,
    Server,
    Lock
} from 'lucide-react';

interface Skill {
    name: string;
    level: number;
    color: string;
}

interface SkillCategory {
    title: string;
    Icon: any;
    skills: Skill[];
}

const skillCategories: SkillCategory[] = [
    {
        title: "Frontend Development",
        Icon: Layout,
        skills: [
            { name: "React/Next.js", level: 90, color: "indigo" },
            { name: "TypeScript", level: 85, color: "blue" },
            { name: "Tailwind CSS", level: 95, color: "cyan" },
            { name: "Vue.js", level: 80, color: "emerald" }
        ]
    },
    {
        title: "Backend Development",
        Icon: Server,
        skills: [
            { name: "Node.js", level: 85, color: "green" },
            { name: "Python/Django", level: 80, color: "yellow" },
            { name: "Java Spring", level: 75, color: "orange" },
            { name: "GraphQL", level: 70, color: "pink" }
        ]
    },
    {
        title: "Database & Cloud",
        Icon: Cloud,
        skills: [
            { name: "MongoDB", level: 85, color: "emerald" },
            { name: "PostgreSQL", level: 80, color: "blue" },
            { name: "AWS", level: 75, color: "yellow" },
            { name: "Docker", level: 80, color: "cyan" }
        ]
    },
    {
        title: "Tools & Others",
        Icon: Settings,
        skills: [
            { name: "Git/GitHub", level: 90, color: "orange" },
            { name: "Agile/Scrum", level: 85, color: "indigo" },
            { name: "CI/CD", level: 80, color: "purple" },
            { name: "Testing", level: 75, color: "pink" }
        ]
    }
];

const SkillBar = ({ skill }: { skill: Skill }) => (
    <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {skill.name}
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
                {skill.level}%
            </span>
        </div>
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`h-full bg-${skill.color}-500 rounded-full`}
            />
        </div>
    </div>
);

const SkillCard = ({ category }: { category: SkillCategory }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
    >
        <div className="flex items-center mb-6">
            <category.Icon className="w-6 h-6 text-indigo-500 mr-3" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {category.title}
            </h3>
        </div>
        <div className="space-y-4">
            {category.skills.map((skill) => (
                <SkillBar key={skill.name} skill={skill} />
            ))}
        </div>
    </motion.div>
);

const AdditionalSkills = () => {
    const tools = [
        { name: "Git", Icon: GitBranch },
        { name: "Docker", Icon: Terminal },
        { name: "REST APIs", Icon: Globe },
        { name: "SQL", Icon: Database },
        { name: "UI/UX", Icon: Palette },
        { name: "Security", Icon: Lock },
        { name: "DevOps", Icon: Code2 },
        { name: "Testing", Icon: Monitor }
    ];

    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12">
            {tools.map(({ name, Icon }) => (
                <motion.div
                    key={name}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                    <Icon className="w-5 h-5 text-indigo-500 mr-2" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {name}
                    </span>
                </motion.div>
            ))}
        </div>
    );
};

export const SkillsSection = () => {
    return (
        <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900">
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
                            A comprehensive overview of my technical skills and proficiency levels
                            in various technologies and tools.
                        </p>
                    </div>

                    {/* Main Skills Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {skillCategories.map((category) => (
                            <motion.div
                                key={category.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <SkillCard category={category} />
                            </motion.div>
                        ))}
                    </div>

                    {/* Additional Skills */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <AdditionalSkills />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};