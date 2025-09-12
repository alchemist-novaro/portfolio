import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Cpu, Server } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { DemoItem } from "@/types/constants";
import { useDemos } from "@/hooks/use-demos";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
    hover: {
        scale: 1.02,
        rotateY: 2,
        rotateX: 2,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 20,
        },
    },
};

function DemoCard({ item }: { item: DemoItem }) {
    const tierInfo = item.config;

    return (
        <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="group cursor-pointer h-full"
            data-testid={`demo-card-${item.id}`}
        >
            <Card className="overflow-hidden h-full shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="relative overflow-hidden">
                    <motion.img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                    />

                    {/* Tier Badge */}
                    <motion.div
                        className="absolute top-4 right-4"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Badge className={`${tierInfo.color} text-white font-bold px-3 py-1`}>
                            {tierInfo.label}
                        </Badge>
                    </motion.div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <CardHeader className="pb-3">
                    <CardTitle className="text-xl group-hover:text-bright-primary transition-colors duration-200">
                        {item.title}
                    </CardTitle>
                </CardHeader>

                <CardContent className="pt-0">
                    <CardDescription className="mb-4 line-clamp-2">
                        {item.description}
                    </CardDescription>

                    {/* Machine + VRAM + Price Section */}
                    <div className="flex flex-col gap-2 text-sm">
                        <div className="flex items-center gap-2">
                            {item.machine_type === "GPU" ? (
                                <Server className="h-4 w-4 text-primary" />
                            ) : (
                                <Cpu className="h-4 w-4 text-primary" />
                            )}
                            <span className="capitalize">{item.machine_type}</span>
                        </div>

                        {item.vram_usage && <div className="flex items-center gap-2">
                            <span className="font-medium">VRAM:</span>
                            <span>{item.vram_usage}</span>
                        </div>}

                        <div className="flex flex-col">
                            <span className="font-medium">Price:</span>
                            <span className="text-muted-foreground">
                                Centralized: {item.price.centralized}/gen
                            </span>
                            {item.price.decentralized && <span className="text-muted-foreground">
                                Decentralized: {item.price.decentralized}/gen
                            </span>}
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 mt-6">
                        {tierInfo.buttons.map((btn, idx) => {
                            const Icon = btn.icon;
                            return (
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    key={idx}
                                >
                                    <Button
                                        asChild
                                        variant={btn.variant}
                                        disabled={btn.disabled}
                                        className={`${btn.disabled && "cursor-not-allowed"} w-full`}
                                    >
                                        {btn.disabled ? (
                                            <span className="flex items-center">
                                                {Icon && <Icon className="mr-2 h-4 w-4" />}
                                                {btn.label}
                                            </span>
                                        ) : (
                                            <Link
                                                to={`${item.url}&type=${btn.type}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center"
                                            >
                                                {Icon && <Icon className="mr-2 h-4 w-4" />}
                                                {btn.label}
                                            </Link>
                                        )}
                                    </Button>
                                </motion.div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}

function DemoSkeleton() {
    return (
        <Card className="overflow-hidden">
            <Skeleton className="w-full h-48" />
            <CardHeader>
                <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3 mb-4" />
                <div className="flex justify-between mb-4">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-3 w-16" />
                </div>
                <Skeleton className="h-10 w-full" />
            </CardContent>
        </Card>
    );
}

export function Demos() {
    const { demos, isLoading, error } = useDemos();

    return (
        <section className="py-32 bg-background">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold mb-4">
                        Demos
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Experience our AI technologies firsthand with interactive demonstrations
                        and real-time processing capabilities.
                    </p>
                </motion.div>

                {isLoading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <DemoSkeleton key={index} />
                        ))}
                    </div>
                ) : error ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12"
                    >
                        <p className="text-muted-foreground mb-4">Unable to load demos at the moment.</p>
                        <p className="text-sm text-muted-foreground">Please try again later.</p>
                    </motion.div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {demos?.map((item) => (
                            <DemoCard key={item.id} item={item} />
                        ))}
                    </motion.div>
                )}
            </div>
        </section>
    );
}

export default Demos;