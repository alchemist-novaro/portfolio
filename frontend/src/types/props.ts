import type { ReactNode } from "react";
import type { Theme, CircularShowcaseItem } from "./constants";

export interface LayoutProps {
  children: React.ReactNode
}

export interface ThemeProviderProps {
  children: React.ReactNode,
  defaultTheme?: Theme,
  storageKey?: string,
}

export interface LoadingProviderProps {
  children: ReactNode
}

export interface CircularShowcaseProps {
  items: CircularShowcaseItem[],
  title: string,
  autoRotate?: boolean,
  autoRotateInterval?: number
}