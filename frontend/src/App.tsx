import { Switch, Route } from "wouter";
import { queryClient } from "@/lib/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { useAuth } from "@/hooks/use-auth";
import { routes } from "@/routes";
import ThemeProvider from "@/components/providers/theme";
import LoadingProvider from "@/components/providers/loading";
import Layout from "@/components/layout";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <Layout>
      <Switch>
        {isLoading || !isAuthenticated ? routes.unauthorized.map(route => (
          <Route path={route.path} key={route.name} component={route.component} />
        )) : routes.authorized.map(route => (
          <Route path={route.path} key={route.name} component={route.component} />
        ))}
        {routes.default.map(route => (
          <Route path={route.path} key={route.name} component={route.component} />
        ))}
        {routes.auth.map(route => (
          <Route path={route.path} key={route.name} component={route.component} />
        ))}
        <Route component={routes.none[0].component} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="theme">
        <LoadingProvider>
          <Router />
          <Toaster />
        </LoadingProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
