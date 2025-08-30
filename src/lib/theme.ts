import { writable } from "svelte/store";
import { browser } from "$app/environment";

// Theme definitions
export const themes = {
  dark: {
    "--color-bg": "#0c0d14",
    "--color-bg-layer1": "#1b1d25",
    "--color-bg-layer2": "#171921",
    "--color-bg-layer3": "#2f3548",
    "--color-accent-1": "#9ba9ed",
    "--color-accent-1-hover": "#292c40",
    "--color-accent-2": "#2f3548",
    "--color-accent-2-hover": "#3c4158",
    "--color-fg": "#ffffffe6",
    "--color-tag": "#ffffff80",
    "--color-icon": "#ffffffbf",
  },
  light: {
    "--color-bg": "#ffffff",
    "--color-bg-layer1": "#f2f2ff",
    "--color-bg-layer2": "#ecf1f5ff",
    "--color-bg-layer3": "#dee2e6",
    "--color-accent-1": "#4c6ef5",
    "--color-accent-1-hover": "#DDE1FF",
    "--color-accent-2": "#DDE1FF",
    "--color-accent-2-hover": "#CADAFF",
    "--color-fg": "#212529",
    "--color-tag": "#000000c0",
    "--color-icon": "#3333a0bf",
  },
} as const;

export type ThemeMode = keyof typeof themes;

// Get initial theme from localStorage or default to 'dark'
function getInitialTheme(): ThemeMode {
  if (!browser) return "dark";

  const stored = localStorage.getItem("theme") as ThemeMode;
  if (stored && stored in themes) {
    return stored;
  }

  // Check system preference
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

// Create theme store
export const currentTheme = writable<ThemeMode>(getInitialTheme());

// Function to apply theme to document
export function applyTheme(theme: ThemeMode) {
  if (!browser) return;

  const root = document.documentElement;
  const themeValues = themes[theme];

  Object.entries(themeValues).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });

  localStorage.setItem("theme", theme);
}

// Function to toggle theme
export function toggleTheme() {
  currentTheme.update((current) => {
    const newTheme = current === "dark" ? "light" : "dark";
    applyTheme(newTheme);
    return newTheme;
  });
}

// Function to set specific theme
export function setTheme(theme: ThemeMode) {
  currentTheme.set(theme);
  applyTheme(theme);
}

// Initialize theme system
export function initializeTheme() {
  if (!browser) return;

  const theme = getInitialTheme();
  currentTheme.set(theme);
  applyTheme(theme);

  // Listen for system theme changes
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  mediaQuery.addEventListener("change", (e) => {
    const storedTheme = localStorage.getItem("theme");
    if (!storedTheme) {
      const newTheme = e.matches ? "dark" : "light";
      setTheme(newTheme);
    }
  });
}
