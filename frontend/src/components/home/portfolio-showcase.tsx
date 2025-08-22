import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, FolderOpen } from "lucide-react";
import type { CircularShowcaseItem } from "@/types/constants";
import type { PortfolioItem } from "@/types/packets";
import { usePortfolio } from "@/hooks/use-portfolio";
import CircularShowcase from "./circular-showcase";

function PortfolioCard({ item }: { item: PortfolioItem }) {
    return (
        <Card className="overflow-hidden w-100 shadow-lg hover:shadow-2xl transition-shadow duration-300 backdrop-blur-md">
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
    const { portfolios } = usePortfolio();
    const cardItems: CircularShowcaseItem[] = portfolios?.filter((item) => item.featured)?.map((item) => ({
        id: item.id,
        title: item.title,
        card: <PortfolioCard key={item.id} item={item} />,
        description: item.description,
        url: item.redirect_url,
        url_label: "View Project",
        url_icon: ExternalLink
    })) || [];

    return (
        <section className="py-20 bg-muted/30">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="container mx-auto px-6"
            >
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
                            <FolderOpen className="mr-2 h-4 w-4" />
                            View All Projects
                        </a>
                    </Button>
                </motion.div>
            </motion.div>
        </section>
    );
}
