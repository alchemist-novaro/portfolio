import { Switch, Route } from "wouter";
import { queryClient } from "@/lib/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { useAuth } from "@/hooks/use-auth";
import { routes } from "@/routes"
import Layout from "@/components/layout";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <Layout>
      <Switch>
        {isLoading || !isAuthenticated ? (
          <>
            {routes.unauthorized.map(route => (
              <Route path={route.path} key={route.name} component={route.component} />
            ))}
          </>
        ) : (
          <>
            {routes.authorized.map(route => (
              <Route path={route.path} key={route.name} component={route.component} />
            ))}
          </>
        )}
        <>
          {routes.default.map(route => (
            <Route path={route.path} key={route.name} component={route.component} />
          ))}
        </>
        <Route component={routes.none[0].component!} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="theme">
        <TooltipProvider>
          <Router />
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
