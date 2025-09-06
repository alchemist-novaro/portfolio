import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { PortfolioItem } from "@/types/packets";
import { usePortfolio } from "@/hooks/use-portfolio";

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

function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      className="group cursor-pointer h-full"
      data-testid={`portfolio-card-${item.id}`}
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
          <CardTitle className="text-xl group-hover:text-bright-primary transition-colors duration-200">
            {item.title}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="pt-0">
          <CardDescription className="mb-4 line-clamp-3">
            {item.description}
          </CardDescription>
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              asChild 
              className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200"
              variant="outline"
              data-testid={`view-project-${item.id}`}
            >
              <Link
                to={item.redirect_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
                data-testid="view-item-button"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                View Project
              </Link>
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function PortfolioSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="w-full h-48" />
      <CardHeader>
        <div className="flex gap-2 mb-3">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
        </div>
        <Skeleton className="h-6 w-3/4" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-4" />
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  );
}

export function Portfolio() {
  const { portfolios, isLoading, error } = usePortfolio();

  return (
    <section className="py-32 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Portfolio
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore my latest AI and machine learning projects showcasing cutting-edge solutions 
            for real-world challenges.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <PortfolioSkeleton key={index} />
            ))}
          </div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground mb-4">Unable to load portfolio items at the moment.</p>
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
            {portfolios?.map((item) => (
              <PortfolioCard key={item.id} item={item} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default Portfolio;