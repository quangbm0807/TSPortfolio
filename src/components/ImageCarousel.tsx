import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageModal } from './ImageModal';

interface ImageCarouselProps {
    images: { url: string; alt: string }[];
    autoplaySpeed?: number;
}

export const ImageCarousel = ({ images, autoplaySpeed = 5000 }: ImageCarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string>('');
    const [isPaused, setIsPaused] = useState(false);

    // Autoplay functionality
    useEffect(() => {
        if (images.length <= 1 || isPaused) return;

        const interval = setInterval(() => {
            setDirection(1);
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, autoplaySpeed);

        return () => clearInterval(interval);
    }, [images.length, autoplaySpeed, isPaused]);

    const handleNext = () => {
        setDirection(1);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrevious = () => {
        setDirection(-1);
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const handleImageClick = (imageUrl: string) => {
        setSelectedImage(imageUrl);
        setIsModalOpen(true);
    };

    // Variants for slide animations
    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? '100%' : '-100%',
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            x: direction < 0 ? '100%' : '-100%',
            opacity: 0,
        }),
    };

    return (
        <div
            className="relative aspect-square rounded-2xl overflow-hidden shadow-xl"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Main carousel */}
            <div className="relative w-full h-full overflow-hidden">
                <AnimatePresence initial={false} custom={direction} mode="sync">
                    <motion.img
                        key={currentIndex}
                        src={images[currentIndex].url}
                        alt={images[currentIndex].alt}
                        className="absolute w-full h-full object-cover cursor-pointer"
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: 'spring', stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 },
                        }}
                        onClick={() => handleImageClick(images[currentIndex].url)}
                    />
                </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            {images.length > 1 && (
                <>
                    <button
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors z-10"
                        onClick={handlePrevious}
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors z-10"
                        onClick={handleNext}
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </>
            )}

            {/* Indicators */}
            {images.length > 1 && (
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            className={`w-2 h-2 rounded-full transition-all ${index === currentIndex
                                    ? 'bg-white w-4'
                                    : 'bg-white/50 hover:bg-white/80'
                                }`}
                            onClick={() => {
                                setDirection(index > currentIndex ? 1 : -1);
                                setCurrentIndex(index);
                            }}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}

            {/* Image Modal */}
            <ImageModal
                isOpen={isModalOpen}
                imageUrl={selectedImage}
                altText="Enlarged image"
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};