import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Particles } from "@/components/ui/particles";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Rocket, Play } from "lucide-react";
import { usePortfolioData } from "@/hooks/use-portfolio-data";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const floatVariants = {
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const glowVariants = {
  animate: {
    boxShadow: [
      "0 0 20px rgba(99, 102, 241, 0.5)",
      "0 0 40px rgba(99, 102, 241, 0.8)",
      "0 0 20px rgba(99, 102, 241, 0.5)",
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function HeroSection() {
  const { portfolioData } = usePortfolioData();

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      <Particles />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-6 text-center relative z-10"
      >
        {/* Animated Profile Card */}
        <motion.div variants={itemVariants} className="relative mb-8 inline-block">
          <motion.div 
            variants={floatVariants}
            animate="animate"
            className="w-48 h-48 mx-auto mb-6 relative"
          >
            <motion.div
              variants={glowVariants}
              animate="animate"
              className="w-full h-full rounded-full overflow-hidden"
            >
              <Avatar className="w-full h-full border-4 border-primary">
                <AvatarImage 
                  src={portfolioData?.avatar}
                  alt={`${portfolioData?.first_name} ${portfolioData?.last_name}`}
                  className="object-cover"
                />
                <AvatarFallback className="text-4xl">{(`${portfolioData?.first_name }`)[0].toUpperCase()}{(`${portfolioData?.last_name }`)[0].toUpperCase()}</AvatarFallback>
              </Avatar>
            </motion.div>
            
            {/* Dynamic lighting ring */}
            <motion.div 
              className="absolute inset-0 rounded-full bg-primary/20"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>

        {/* Main Title */}
        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold mb-4"
        >
          <span className="text-primary">
            {portfolioData?.first_name} {portfolioData?.last_name}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          variants={itemVariants}
          className="text-xl md:text-2xl text-muted-foreground mb-8"
        >
          AI Solutions Architect
        </motion.p>

        {/* Call-to-Action Buttons */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="lg" 
              className="px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-shadow"
              data-testid="view-portfolio-button"
            >
              <Rocket className="mr-2 h-5 w-5" />
              View Portfolio
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-4 text-lg border-2 border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              data-testid="try-demos-button"
            >
              <Play className="mr-2 h-5 w-5" />
              Try Live Demos
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
