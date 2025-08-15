"use client"

import * as React from "react"
import { useTheme as useNextTheme } from "next-themes"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
  attribute?: "class"
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}

export function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  return <useNextTheme.ThemeProvider {...props}>{children}</useNextTheme.ThemeProvider>
}

export const useTheme = useNextTheme;
