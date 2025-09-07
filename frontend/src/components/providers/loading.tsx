import { createContext } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { usePortfolio } from "@/hooks/use-portfolio";
import { useDemos } from "@/hooks/use-demos";
import { useTestimonials } from "@/hooks/use-testimonials";
import type { LoadingProviderProps } from "@/types/props";
import { useProfile } from "@/hooks/use-profile";

const LoadingContext = createContext<null>(null);

export default function LoadingProvider({ children }: LoadingProviderProps) {
  const { isLoading: authLoading } = useAuth();
  const { isLoading: portfolioLoading } = usePortfolio();
  const { isLoading: demoLoading } = useDemos();
  const { isLoading: testimonialLoading } = useTestimonials();
  const { isLoading: profileLoading } = useProfile();

  const isLoading = authLoading || profileLoading ||
    portfolioLoading || demoLoading || testimonialLoading;

  return (
    <LoadingContext.Provider value={null}>
      {isLoading && <LoadingScreen />}
      <div style={{ display: isLoading ? 'none' : 'block' }}>
        {children}
      </div>
    </LoadingContext.Provider>
  );
}

function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      <div className="text-center space-y-6">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
          }}
          className="flex justify-center"
        >
          <Loader2 className="h-12 w-12 text-bright-primary" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-2"
        >
          <h2 className="text-2xl font-semibold text-foreground">Loading</h2>
          <p className="text-muted-foreground">Loading your data...</p>
        </motion.div>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "200px" }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="h-1 bg-bright-primary mx-auto rounded-full"
        />
      </div>
    </motion.div>
  );
}