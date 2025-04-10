import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ZoomOut } from 'lucide-react';

interface ImageModalProps {
    isOpen: boolean;
    imageUrl: string;
    altText: string;
    onClose: () => void;
}

export const ImageModal = ({ isOpen, imageUrl, altText, onClose }: ImageModalProps) => {
    const [zoom, setZoom] = useState(1);

    useEffect(() => {
        if (!isOpen) {
            setZoom(1);
        }
    }, [isOpen]);

    // Close modal when escape key is pressed
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener('keydown', handleEsc);
        }

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [isOpen, onClose]);

    const handleZoomIn = () => {
        setZoom(prev => Math.min(prev + 0.25, 3));
    };

    const handleZoomOut = () => {
        setZoom(prev => Math.max(prev - 0.25, 0.5));
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: "spring", duration: 0.4 }}
                        className="relative max-w-4xl w-full mx-auto"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on content
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute -top-12 right-0 p-2 text-white hover:text-gray-300 rounded-full transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Zoom controls */}
                        <div className="absolute -top-12 left-0 flex space-x-2">
                            <button
                                onClick={handleZoomOut}
                                className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                                disabled={zoom <= 0.5}
                            >
                                <ZoomOut className="w-5 h-5" />
                            </button>
                            <button
                                onClick={handleZoomIn}
                                className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                                disabled={zoom >= 3}
                            >
                                <ZoomIn className="w-5 h-5" />
                            </button>
                            <span className="flex items-center text-white text-sm px-2">
                                {Math.round(zoom * 100)}%
                            </span>
                        </div>

                        {/* Image container */}
                        <div className="overflow-auto bg-black rounded-lg max-h-[80vh] flex items-center justify-center">
                            <motion.img
                                src={imageUrl}
                                alt={altText}
                                className="max-w-full object-contain"
                                style={{ transform: `scale(${zoom})`, transformOrigin: 'center' }}
                                transition={{ type: "spring", duration: 0.3 }}
                            />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};