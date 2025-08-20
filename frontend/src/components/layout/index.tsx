// import { Navbar } from './Navbar';
import Footer from './footer';
import type { LayoutProps } from "@/types/props";

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* <Navbar /> */}
      <main>{children}</main>
      <Footer />
    </div>
  );
}