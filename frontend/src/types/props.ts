import type { ReactNode } from "react";
import { Room } from "livekit-client";
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

export interface VoiceAssistantProps {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    room: Room
}