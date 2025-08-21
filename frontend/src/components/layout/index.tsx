import { motion } from "framer-motion";
import Header from './header';
import Footer from './footer';
import type { LayoutProps } from "@/types/props";

export default function Layout({ children }: LayoutProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900"
    >
      <Header />
      <main>{children}</main>
      <Footer />
    </motion.div>
  );
}