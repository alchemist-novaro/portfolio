import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import type { TestimonialItem } from "@/types/packets";
import type { CircularShowcaseItem } from "@/types/constants";
import { useTestimonials } from "@/hooks/use-testimonials";
import CircularShowcase from "./circular-showcase";

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, index) => (
                <motion.div
                    key={index}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                >
                    <Star
                        className={`h-4 w-4 ${index < rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                    />
                </motion.div>
            ))}
            <span className="ml-2 text-sm text-muted-foreground">{rating}.0</span>
        </div>
    );
}

function TestimonialCard({ item }: { item: TestimonialItem }) {
    return (
        <Card className="h-full w-100 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-background to-muted/20">
            <CardContent className="p-6 h-full flex flex-col">
                <div className="mb-4">
                    <StarRating rating={item.rating} />
                </div>

                <blockquote className="text-muted-foreground mb-6 flex-grow">
                    "{item.content}"
                </blockquote>

                <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12 border-2 border-primary/20">
                        <AvatarImage
                            src={item.avatar || undefined}
                            alt={item.name}
                            className="object-cover"
                        />
                        <AvatarFallback>
                            {item.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="font-semibold text-foreground">
                            {item.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                            {item.role}, {item.company}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default function TestimonialsShowcase() {
    const { testimonials } = useTestimonials();
    const cardItems: CircularShowcaseItem[] = testimonials?.filter((item) => item.featured)?.map((item) => ({
        id: item.id,
        title: item.name,
        card: <TestimonialCard key={item.id} item={item} />,
        description: item.content,
    })) || [];

    return (
        <section className="py-20 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5">
            <div className="container mx-auto px-6">
                <CircularShowcase
                    items={cardItems}
                    title="Testimonials"
                    autoRotate={true}
                />
            </div>
        </section>
    );
}
