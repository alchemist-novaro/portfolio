import { motion } from "framer-motion";
import { useLocation } from "wouter";
import Header from './header';
import Footer from './footer';
import { routes } from "@/routes";
import type { LayoutProps } from "@/types/props";

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  
  const layoutPaths = [
    ...routes.unauthorized.map((r) => r.path),
    ...routes.authorized.map((r) => r.path),
    ...routes.admin.map((r) => r.path),
    ...routes.default.map((r) => r.path)
  ];
  const layout = layoutPaths.some((path) => path === "/" ? location === "/" : location.startsWith(path));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900"
    >
      {layout && <Header />}
      <main>{children}</main>
      {layout && <Footer />}
    </motion.div>
  );
}