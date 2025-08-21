import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import type { PortfolioItem, CircularShowcaseItem } from "@/types/constants";
import CircularShowcase from "./circular-showcase";

// Mock data for demonstration
const mockPortfolioItems: PortfolioItem[] = [
    {
        id: 1,
        title: "AI Image Recognition System",
        description: "Advanced computer vision system for real-time object detection and classification using TensorFlow and OpenCV.",
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        redirect_url: "#",
        skills: ["Computer Vision", "TensorFlow", "Python"],
        featured: true,
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        id: 2,
        title: "NLP Analytics Platform",
        description: "Sentiment analysis and text processing platform for enterprise applications with natural language understanding.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        redirect_url: "#",
        skills: ["NLP", "Transformers", "PyTorch"],
        featured: true,
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        id: 3,
        title: "AI Business Intelligence",
        description: "Predictive analytics platform with automated insights generation for data-driven decision making.",
        image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        redirect_url: "#",
        skills: ["Generative AI", "PyTorch", "React"],
        featured: true,
        created_at: new Date(),
        updated_at: new Date(),
    }
];

function PortfolioCard({ item }: { item: PortfolioItem }) {
    return (
        <Card className="overflow-hidden w-80 shadow-lg hover:shadow-2xl transition-shadow duration-300 backdrop-blur-md">
            <div className="relative overflow-hidden">
                <motion.img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <CardHeader className="pb-3">
                <div className="flex flex-wrap gap-2 mb-3">
                    {item.skills?.map((skill, index) => (
                        <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                            data-testid={`skill-badge-${skill.toLowerCase().replace(' ', '-')}`}
                        >
                            {skill}
                        </Badge>
                    ))}
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors duration-200">
                    {item.title}
                </CardTitle>
            </CardHeader>

            <CardContent className="pt-0">
                <CardDescription className="mb-4 line-clamp-3">
                    {item.description}
                </CardDescription>
            </CardContent>
        </Card>
    );
}

export default function PortfolioShowcase() {
    const { data: portfolioItems } = useQuery<PortfolioItem[]>({
        queryKey: ["/portfolio?featured=true"],
        retry: false,
    });

    // Use mock data if API fails
    const items = portfolioItems || mockPortfolioItems;
    const cardItems: CircularShowcaseItem[] = items.map((item) => ({
        id: item.id,
        title: item.title,
        card: <PortfolioCard key={item.id} item={item} />,
        description: item.description,
        url: item.redirect_url,
        url_label: "View Project"
    }));

    return (
        <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-6">
                <CircularShowcase
                    items={cardItems}
                    title="Portfolio"
                    autoRotate={true}
                />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center"
                >
                    <Button size="lg" variant="outline" data-testid="view-all-portfolio">
                        <a href="/portfolio" className="flex items-center">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View All Projects
                        </a>
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
