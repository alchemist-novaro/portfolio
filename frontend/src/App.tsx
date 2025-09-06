import { BrowserRouter, Routes, Route } from "react-router-dom";
import { queryClient } from "@/lib/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { useAuth } from "@/hooks/use-auth";
import { routes } from "@/routes";
import ThemeProvider from "@/components/providers/theme";
import LoadingProvider from "@/components/providers/loading";
import Layout from "@/components/layout";

function Router() {
  const { isAuthenticated } = useAuth();

  return (
    <Layout>
      <Routes>
        {isAuthenticated
          ? routes.authorized.map((route) => (
              <Route
                path={route.path}
                key={route.name}
                element={<route.component />}
              />
            ))
          : routes.unauthorized.map((route) => (
              <Route
                path={route.path}
                key={route.name}
                element={<route.component />}
              />
            ))}

        {routes.default.map((route) => (
          <Route
            path={route.path}
            key={route.name}
            element={<route.component />}
          />
        ))}

        {routes.auth.map((route) => (
          <Route
            path={route.path}
            key={route.name}
            element={<route.component />}
          />
        ))}

        {routes.none.map((route) => (
          <Route
            path="*"
            key={route.name}
            element={<route.component />}
          />
        ))}
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="theme">
        <LoadingProvider>
          <BrowserRouter>
            <Router />
            <Toaster />
          </BrowserRouter>
        </LoadingProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
