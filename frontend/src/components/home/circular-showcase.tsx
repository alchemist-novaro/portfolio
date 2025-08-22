import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CircularShowcaseItem } from "@/types/constants";
import type { CircularShowcaseProps } from "@/types/props";

function DetailView({ item }: { item: CircularShowcaseItem }) {
    const Icon = item?.url_icon;

    return (
        <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mt-8"
        >
            <>
                <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    {item.description}
                </p>

                {item.url && (
                    <Button
                        asChild={!item.url_disabled}
                        variant={item.url_variant}
                        className="mt-4"
                        disabled={item.url_disabled}
                    >
                        {item.url_disabled ? (
                            <span
                                className="flex items-center cursor-not-allowed"
                                data-testid="view-item-button"
                            >
                                {Icon && <Icon className="mr-2 h-4 w-4" />}
                                {item.url_label || "View Details"}
                            </span>
                        ) : (
                            <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center"
                                data-testid="view-item-button"
                            >
                                {Icon && <Icon className="mr-2 h-4 w-4" />}
                                {item.url_label || "View Details"}
                            </a>
                        )}
                    </Button>
                )}
            </>
        </motion.div>
    );
}

export default function CircularShowcase({
    items,
    title,
    autoRotate = false,
    autoRotateInterval = 5000,
    height
}: CircularShowcaseProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isManualControl, setIsManualControl] = useState(false);

    // Auto-rotation effect
    useEffect(() => {
        if (!autoRotate || isManualControl || items.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % items.length);
        }, autoRotateInterval);

        return () => clearInterval(interval);
    }, [autoRotate, autoRotateInterval, items.length, isManualControl]);

    // Reset manual control after a delay
    useEffect(() => {
        if (!isManualControl) return;

        const timeout = setTimeout(() => {
            setIsManualControl(false);
        }, 10000); // Reset after 10 seconds

        return () => clearTimeout(timeout);
    }, [isManualControl, currentIndex]);

    const handlePrevious = () => {
        setIsManualControl(true);
        setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    };

    const handleNext = () => {
        setIsManualControl(true);
        setCurrentIndex((prev) => (prev + 1) % items.length);
    };

    const getCardPosition = (index: number) => {
        const totalitems = items.length;
        const angleStep = (2 * Math.PI) / totalitems;
        const currentAngle = index * angleStep;

        // Adjust for current active item
        const relativeAngle = currentAngle - (currentIndex * angleStep);

        // Calculate position in 3D space
        const radius = 180;
        const x = Math.sin(relativeAngle) * radius * 1.7;
        const z = Math.cos(relativeAngle) * radius;

        // Scale and opacity based on z position
        const scale = 0.6 + (z + radius) / (2 * radius) * 0.4; // Scale between 0.6 and 1.0
        const opacity = 0.3 + (z + radius) / (2 * radius) * 0.7; // Opacity between 0.3 and 1.0

        return {
            x,
            z,
            scale,
            opacity,
            rotateY: (relativeAngle * 180) / Math.PI,
        };
    };

    if (items.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground">No items to display</p>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="pb-16 relative overflow-hidden"
        >
            <div className="container mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold text-center mb-20"
                >
                    {title}
                </motion.h2>

                {/* 3D Circular Showcase */}
                <div className="relative mb-20 flex items-center justify-center">
                    <div
                        className="relative w-full flex items-center justify-center"
                        style={{ perspective: "1000px", height: height ? `${height}px` : "400px" }}
                    >
                        <AnimatePresence mode="sync">
                            {items.map((item, index) => {
                                const position = getCardPosition(index);
                                const isActive = index === currentIndex;

                                return (
                                    <motion.div
                                        key={item.id}
                                        className="absolute flex items-center justify-center cursor-pointer"
                                        initial={{ opacity: 0 }}
                                        animate={{
                                            opacity: position.opacity,
                                            scale: position.scale,
                                            x: position.x,
                                            z: position.z,
                                            rotateY: position.rotateY,
                                        }}
                                        transition={{
                                            type: "spring",
                                            damping: 20,
                                            stiffness: 100,
                                            duration: 0.8,
                                        }}
                                        style={{
                                            transformStyle: "preserve-3d",
                                            zIndex: isActive ? 1000 : Math.floor(position.z + 100),
                                        }}
                                    >
                                        <div
                                            className="max-w-sm w-full"
                                            onClick={() => {
                                                setCurrentIndex(index);
                                                setIsManualControl(true);
                                            }}
                                        >{item.card}</div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Navigation Controls */}
                <div className="flex items-center justify-center gap-4">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={handlePrevious}
                        className="rounded-full"
                        data-testid="previous-button"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>

                    {/* Indicators */}
                    <div className="flex gap-2">
                        {items.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setCurrentIndex(index);
                                    setIsManualControl(true);
                                }}
                                className={`w-2 h-2 rounded-full transition-all ${index === currentIndex
                                    ? "bg-primary w-6"
                                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                                    }`}
                                data-testid={`indicator-${index}`}
                            />
                        ))}
                    </div>

                    <Button
                        variant="outline"
                        size="icon"
                        onClick={handleNext}
                        className="rounded-full"
                        data-testid="next-button"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>

                {/* Active Item Details */}
                {items[currentIndex] && <DetailView item={items[currentIndex]} />}
            </div>
        </motion.div>
    );
}