import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ui/theme-provider";
import { useAuth } from "@/hooks/use-auth";
import { usePortfolioData } from "@/hooks/use-portfolio-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sun,
  Moon,
  Monitor,
  Bell,
  Menu,
  X,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { routes } from "@/routes";

export default function Header() {
  const [location] = useLocation();
  const { theme, setTheme } = useTheme();
  const { isAuthenticated, isAdmin, user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { portfolioData } = usePortfolioData();

  const getThemeIcon = () => {
    if (theme === "dark") return Moon;
    if (theme === "light") return Sun;
    return Monitor;
  };

  const navigationItems = [
    ...(isAuthenticated ? 
        routes.authorized.filter(route => route.type.includes("h-navbar")) :
        routes.unauthorized.filter(route => route.type.includes("h-navbar"))),
    ...routes.default.filter(route => route.type.includes("h-navbar")),
    ...(isAuthenticated && isAdmin ? routes.admin.filter(route => route.type.includes("h-navbar")) : [])
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 backdrop-blur-md bg-background/80 border-b border-border"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <span className="text-xl font-bold text-primary">{portfolioData?.first_name} {(`${portfolioData?.last_name} `)[0].toUpperCase()}.</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                location === item.path ||
                (item.path !== "/" && location.startsWith(item.path));

              return (
                <Link key={item.path} href={item.path}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                      isActive
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                    }`}
                    data-testid={`nav-link-${item.name.toLowerCase().replace(" ", "-")}`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    data-testid="theme-toggle"
                  >
                    {(() => {
                      const ThemeIcon = getThemeIcon();
                      return <ThemeIcon className="h-4 w-4" />;
                    })()}
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    <Sun className="mr-2 h-4 w-4" />
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    <Moon className="mr-2 h-4 w-4" />
                    Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    <Monitor className="mr-2 h-4 w-4" />
                    System
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.div>

            {isAuthenticated ? (
              <>
                {/* Notification Bell */}
                <Link href="/alerts">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="relative"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      data-testid="notifications"
                    >
                      <Bell className="h-4 w-4" />
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1"
                      >
                        <Badge
                          variant="destructive"
                          className="text-xs px-1 py-0 h-5 w-5 flex items-center justify-center rounded-full"
                        >
                          3
                        </Badge>
                      </motion.div>
                    </Button>
                  </motion.div>
                </Link>

                {/* Profile Avatar with Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center space-x-2 cursor-pointer rounded-lg p-1 hover:bg-primary/5 transition-colors"
                      data-testid="profile-dropdown-trigger"
                    >
                      <Avatar className="border-2 border-primary">
                        <AvatarImage
                          src="https://i.ibb.co/zHTsJZyF/photo-2025-08-05-07-52-15.jpg"
                          alt={`${portfolioData?.first_name} ${portfolioData?.last_name}`}
                          className="object-cover"
                        />
                        <AvatarFallback>{(`${portfolioData?.first_name }`)[0].toUpperCase()}{(`${portfolioData?.last_name }`)[0].toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </motion.button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-2 py-1.5 text-sm">
                      <div className="font-medium">
                        {user?.first_name} {user?.last_name}
                      </div>
                      <div className="text-muted-foreground">{user?.email}</div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <a
                        href="/api/logout"
                        className="flex items-center cursor-pointer"
                        data-testid="logout-button"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </a>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button asChild data-testid="login-button">
                  <a href="/api/login">Login</a>
                </Button>
              </motion.div>
            )}

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                data-testid="mobile-menu-toggle"
              >
                {mobileMenuOpen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 pb-4 border-t border-border"
            >
              <div className="flex flex-col space-y-2 pt-4">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    location === item.path ||
                    (item.path !== "/" && location.startsWith(item.path));

                  return (
                    <Link key={item.path} href={item.path}>
                      <motion.div
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors cursor-pointer ${
                          isActive
                            ? "text-primary bg-primary/10"
                            : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                        }`}
                        data-testid={`mobile-nav-link-${item.name.toLowerCase().replace(" ", "-")}`}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </motion.div>
                    </Link>
                  );
                })}

                {!isAuthenticated && (
                  <motion.div whileTap={{ scale: 0.95 }} className="pt-2">
                    <Button
                      asChild
                      className="w-full"
                      data-testid="mobile-login-button"
                    >
                      <a href="/api/login">Login</a>
                    </Button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
