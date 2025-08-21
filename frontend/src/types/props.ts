import type { ReactNode } from "react";
import type { Theme } from "./constants";

export interface LayoutProps {
  children: React.ReactNode;
}

export interface ThemeProviderProps {
  children: React.ReactNode,
  defaultTheme: Theme | undefined,
  storageKey: string | undefined,
}

export interface LoadingProviderProps {
  children: ReactNode;
}