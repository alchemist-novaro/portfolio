import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ShowcaseItem } from "@/types/constants";
import type { ShowcaseProps } from "@/types/props";

function DetailView({ item }: { item: ShowcaseItem }) {
    return (
        <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mt-8"
        >
            <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">{item.description}</p>

            {/* Buttons if available */}
            {item.buttons && (
                <div className="flex flex-wrap justify-center gap-4 mt-6">
                    {item.buttons.map((btn, idx) => {
                        const Icon = btn.icon;
                        return (
                            <Button
                                key={idx}
                                asChild
                                variant={btn.variant}
                                disabled={btn.disabled}
                                className={`${btn.disabled && "cursor-not-allowed"}`}
                            >
                                {btn.disabled ? (
                                    <span className="flex items-center">
                                        {Icon && <Icon className="mr-2 h-4 w-4" />}
                                        {btn.label}
                                    </span>
                                ) : (
                                    <Link
                                        to={btn.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center"
                                    >
                                        {Icon && <Icon className="mr-2 h-4 w-4" />}
                                        {btn.label}
                                    </Link>
                                )}
                            </Button>
                        );
                    })}
                </div>
            )}
        </motion.div>
    );
}

export default function SliderShowcase({
    items,
    title,
    autoRotate = false,
    autoRotateInterval = 5000,
    height
}: ShowcaseProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isManualControl, setIsManualControl] = useState(false);

    // Auto-rotation
    useEffect(() => {
        if (!autoRotate || isManualControl || items.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % items.length);
        }, autoRotateInterval);
        return () => clearInterval(interval);
    }, [autoRotate, autoRotateInterval, items.length, isManualControl]);

    // Reset manual control after 10s
    useEffect(() => {
        if (!isManualControl) return;
        const timeout = setTimeout(() => setIsManualControl(false), 10000);
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

    // Rotate items array dynamically for the effect
    const rotatedItems = [
        ...items.slice(currentIndex),
        ...items.slice(0, currentIndex),
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="pb-16 relative overflow-hidden"
        >
            <div className="container mx-auto px-6">
                {/* Title */}
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold text-center mb-8"
                >
                    {title}
                </motion.h2>

                {/* Slider Showcase */}
                <div className="relative mb-8 flex items-center justify-center">
                    <div
                        className="relative w-full flex items-center justify-center"
                        style={{ perspective: "1000px", height: height ? `${height}px` : "400px" }}
                    >
                        <AnimatePresence mode="sync">
                            {rotatedItems.map((item, index) => {
                                const isActive = index === Math.floor(rotatedItems.length / 2);
                                const isPrev = index <= Math.floor(rotatedItems.length / 2) - 1;
                                const isNext = index >= Math.floor(rotatedItems.length / 2) + 1;
                                return (
                                    <motion.div
                                        key={item.id}
                                        className="absolute flex items-center justify-center cursor-pointer"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{
                                            opacity: isActive ? 1 : 0.4,
                                            scale: isActive ? 1 : 0.85,
                                            x: (index - Math.floor(rotatedItems.length / 2)) * 350,
                                        }}
                                        transition={{
                                            type: "spring",
                                            damping: 20,
                                            stiffness: 100,
                                            duration: 0.6,
                                        }}
                                        style={{
                                            zIndex: isActive ? 1000 : isPrev || isNext ? 500 : 100,
                                        }}
                                    >
                                        <div
                                            className="max-w-sm w-full"
                                            onClick={() => {
                                                setCurrentIndex((items.indexOf(item) + items.length - 1) % items.length);
                                                setIsManualControl(true);
                                            }}
                                        >
                                            {item.card}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-4">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={handlePrevious}
                        className="rounded-full"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>

                    <div className="flex gap-2">
                        {rotatedItems.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setCurrentIndex((items.indexOf(item) + items.length - 1) % items.length);
                                    setIsManualControl(true);
                                }}
                                className={`w-2 h-2 rounded-full transition-all ${index === Math.floor(rotatedItems.length / 2)
                                        ? "bg-primary w-6"
                                        : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                                    }`}
                            />
                        ))}
                    </div>

                    <Button
                        variant="outline"
                        size="icon"
                        onClick={handleNext}
                        className="rounded-full"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>

                {/* Detail View */}
                {rotatedItems[Math.floor(rotatedItems.length / 2)] && (
                    <DetailView item={rotatedItems[Math.floor(rotatedItems.length / 2)]} />
                )}
            </div>
        </motion.div>
    );
}