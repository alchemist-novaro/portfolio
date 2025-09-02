import type { ReactNode } from "react";
import type { Theme, ShowcaseItem } from "./constants";

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

export interface ShowcaseProps {
  items: ShowcaseItem[],
  title: string,
  autoRotate?: boolean,
  autoRotateInterval?: number,
  height?: number
}

export interface SliderShowcaseProps {

}