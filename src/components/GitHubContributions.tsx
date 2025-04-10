// src/components/GitHubContributions.tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Calendar, Activity } from 'lucide-react';

interface ContributionDay {
    date: string;
    count: number;
    level: number;
}

interface ContributionData {
    totalContributions: number;
    weeks: ContributionDay[][];
}

interface ContributionBlockProps {
    count: number;
    date: string;
    level: number;
}

const ContributionBlock = ({ count, date, level }: ContributionBlockProps) => {
    // Calculate the color based on contribution level (0-4)
    const getColor = (level: number) => {
        if (level === 0) return 'bg-gray-200 dark:bg-gray-800';
        if (level === 1) return 'bg-green-200 dark:bg-green-900';
        if (level === 2) return 'bg-green-300 dark:bg-green-700';
        if (level === 3) return 'bg-green-400 dark:bg-green-600';
        return 'bg-green-500 dark:bg-green-500';
    };

    return (
        <motion.div
            whileHover={{ scale: 1.2 }}
            className={`w-3 h-3 rounded-sm ${getColor(level)} transition-colors duration-200`}
            title={`${count} contributions on ${date}`}
        />
    );
};

export default function GitHubContributions() {
    const [contributionData, setContributionData] = useState<ContributionData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error] = useState<string | null>(null);

    useEffect(() => {
        // This would normally fetch from GitHub API, but we'll use a simulation for the demo
        simulateContributionData()
            .then(data => {
                setContributionData(data);
                setIsLoading(false);
            })
    }, []);

    const simulateContributionData = (): Promise<ContributionData> => {
        return new Promise((resolve) => {
            const now = new Date();
            const oneYearAgo = new Date();
            oneYearAgo.setFullYear(now.getFullYear() - 1);

            // Generate 53 weeks (approximately a year) of data
            const weeks: ContributionDay[][] = [];
            for (let i = 0; i < 53; i++) {
                const days: ContributionDay[] = [];
                for (let j = 0; j < 7; j++) {
                    // Simulate more activity for certain periods visible in your contribution graph
                    let level = 0;

                    // Create patterns similar to what we see in the image
                    // Higher probability of contributions on Mondays, Wednesdays and Fridays
                    const isActiveDay = j === 0 || j === 2 || j === 4;

                    // Create clusters of activity
                    const isActiveWeek = (i >= 10 && i <= 15) || (i >= 25 && i <= 30) || (i >= 40 && i <= 48);

                    if (isActiveWeek && isActiveDay) {
                        // Higher chance of contribution during active periods
                        level = Math.floor(Math.random() * 4) + 1; // 1-4
                    } else if (Math.random() > 0.8) {
                        // Small chance of random contributions elsewhere
                        level = Math.floor(Math.random() * 3) + 1; // 1-3
                    }

                    const currentDate = new Date(oneYearAgo);
                    currentDate.setDate(oneYearAgo.getDate() + (i * 7) + j);

                    days.push({
                        date: currentDate.toISOString().split('T')[0],
                        count: level === 0 ? 0 : Math.floor(Math.random() * 10) + 1,
                        level
                    });
                }
                weeks.push(days);
            }

            // Simulate total contribution count
            const totalContributions = 5718;

            resolve({
                totalContributions,
                weeks
            });
        });
    };

    // Function to get month labels
    const getMonthLabels = () => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const now = new Date();
        const labels = [];

        for (let i = 11; i >= 0; i--) {
            const monthIndex = (now.getMonth() - i + 12) % 12;
            labels.push(months[monthIndex]);
        }

        return labels.reverse();
    };

    if (isLoading) {
        return (
            <div className="flex justify-center py-10">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-10 text-red-500">
                {error}
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
                <div className="flex items-center mb-4 md:mb-0">
                    <Github className="w-6 h-6 text-indigo-500 mr-2" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        GitHub Contributions
                    </h3>
                </div>

                <div className="flex items-center space-x-4">
                    <span className="text-gray-600 dark:text-gray-300 flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Last Year
                    </span>
                    <span className="text-gray-600 dark:text-gray-300 flex items-center">
                        <Activity className="w-4 h-4 mr-1" />
                        {contributionData?.totalContributions} contributions
                    </span>
                </div>
            </div>

            <div className="overflow-x-auto">
                <div className="min-w-max">
                    {/* Month labels */}
                    <div className="flex mb-1 pl-10">
                        {getMonthLabels().map((month, i) => (
                            <div key={i} className="flex-1 text-xs text-gray-500 dark:text-gray-400 text-center">
                                {month}
                            </div>
                        ))}
                    </div>

                    {/* Day labels and contribution grid */}
                    <div className="flex">
                        <div className="pr-2">
                            <div className="h-3 w-10"></div> {/* Empty space for alignment */}
                            <div className="h-3 w-10 text-xs text-gray-500 dark:text-gray-400 text-right">Mon</div>
                            <div className="h-3 w-10"></div>
                            <div className="h-3 w-10 text-xs text-gray-500 dark:text-gray-400 text-right">Wed</div>
                            <div className="h-3 w-10"></div>
                            <div className="h-3 w-10 text-xs text-gray-500 dark:text-gray-400 text-right">Fri</div>
                            <div className="h-3 w-10"></div>
                        </div>

                        {/* Contribution grid */}
                        <div className="flex gap-1">
                            {contributionData?.weeks.map((week, weekIndex) => (
                                <div key={weekIndex} className="flex flex-col gap-1">
                                    {week.map((day, dayIndex) => (
                                        <ContributionBlock
                                            key={`${weekIndex}-${dayIndex}`}
                                            count={day.count}
                                            date={day.date}
                                            level={day.level}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contribution level indicators */}
                    <div className="flex justify-end items-center mt-4 text-xs text-gray-500 dark:text-gray-400">
                        <span className="mr-2">Less</span>
                        <div className="flex gap-1">
                            <div className="w-3 h-3 rounded-sm bg-gray-200 dark:bg-gray-800"></div>
                            <div className="w-3 h-3 rounded-sm bg-green-200 dark:bg-green-900"></div>
                            <div className="w-3 h-3 rounded-sm bg-green-300 dark:bg-green-700"></div>
                            <div className="w-3 h-3 rounded-sm bg-green-400 dark:bg-green-600"></div>
                            <div className="w-3 h-3 rounded-sm bg-green-500 dark:bg-green-500"></div>
                        </div>
                        <span className="ml-2">More</span>
                    </div>
                </div>
            </div>

            <div className="mt-6 text-center">
                <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://github.com/quangbm0807"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                    <Github className="w-5 h-5 mr-2" />
                    Visit GitHub Profile
                </motion.a>
            </div>
        </motion.div>
    );
}