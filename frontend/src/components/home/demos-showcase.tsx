import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Cpu, Server } from "lucide-react";
import type { DemoItem } from "@/types/constants";
import type { ShowcaseItem } from "@/types/constants";
import { useDemos } from "@/hooks/use-demos";
import CircularShowcase from "./circular-showcase";

function DemoCard({ item }: { item: DemoItem }) {
  return (
    <Card className="overflow-hidden w-100 shadow-lg hover:shadow-2xl transition-shadow duration-300 group">
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
          <Badge className={`${item.config.color} text-white font-bold px-3 py-1`}>
            {item.config.label}
          </Badge>
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="text-xl group-hover:text-primary transition-colors duration-200">
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
              Centralized: {item.price.centralized}/trial
            </span>
            {item.price.decentralized && <span className="text-muted-foreground">
              Decentralized: {item.price.decentralized}/trial
            </span>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function DemosShowcase() {
  const { demos } = useDemos();
  const cardItems: ShowcaseItem[] = demos?.map((item) => ({
    id: item.id,
    title: item.title,
    card: <DemoCard key={item.id} item={item} />,
    description: item.description,
    buttons: item.config.buttons.map((button) => ({
      url: `${item.url}&type=${button.type}`,
      ...button
    }))
  })) || [];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <CircularShowcase
          items={cardItems}
          title="Live Demos"
          autoRotate={true}
          height={450}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Button size="lg" variant="outline" data-testid="view-all-demos">
            <a className="flex items-center" href="/demos">
              <Play className="mr-2 h-4 w-4" />
              View All Demos
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
