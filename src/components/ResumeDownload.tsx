import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';
import { useState } from 'react';

interface ResumeDownloadProps {
    file: string;
    className?: string;
}

export const ResumeDownload = ({ file, className = '' }: ResumeDownloadProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.a
            href={file}
            download
            className={`inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-700 
                       text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative flex items-center">
                <motion.div
                    className="flex items-center"
                    animate={{ x: isHovered ? -5 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <FileText className="w-5 h-5 mr-2" />
                    <span className="font-medium">Resume</span>
                </motion.div>

                <motion.div
                    className="absolute right-0"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{
                        opacity: isHovered ? 1 : 0,
                        x: isHovered ? 0 : -10
                    }}
                    transition={{ duration: 0.3 }}
                >
                    <Download className="w-5 h-5 ml-2" />
                </motion.div>
            </div>
        </motion.a>
    );
};