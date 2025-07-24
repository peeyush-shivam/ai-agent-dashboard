export interface ThemeColors {
  // Background colors
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
    card: string;
    modal: string;
  };
  // Text colors
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    inverse: string;
  };
  // Border colors
  border: {
    primary: string;
    secondary: string;
    accent: string;
  };
  // Status colors
  status: {
    success: string;
    warning: string;
    error: string;
    info: string;
    running: string;
    idle: string;
  };
  // Interactive colors
  interactive: {
    primary: string;
    secondary: string;
    hover: string;
    active: string;
    disabled: string;
  };
  // Accent colors
  accent: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
}

export const lightTheme: ThemeColors = {
  background: {
    primary: "#ffffff",
    secondary: "#f8fafc",
    tertiary: "#f1f5f9",
    card: "#ffffff",
    modal: "#ffffff",
  },
  text: {
    primary: "#1e293b",
    secondary: "#64748b",
    tertiary: "#94a3b8",
    inverse: "#ffffff",
  },
  border: {
    primary: "#e2e8f0",
    secondary: "#f1f5f9",
    accent: "#3b82f6",
  },
  status: {
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#3b82f6",
    running: "#10b981",
    idle: "#6b7280",
  },
  interactive: {
    primary: "#3b82f6",
    secondary: "#64748b",
    hover: "#2563eb",
    active: "#1d4ed8",
    disabled: "#cbd5e1",
  },
  accent: {
    primary: "#3b82f6",
    secondary: "#8b5cf6",
    tertiary: "#06b6d4",
  },
};

export const darkTheme: ThemeColors = {
  background: {
    primary: "#0f172a",
    secondary: "#1e293b",
    tertiary: "#334155",
    card: "#1e293b",
    modal: "#1e293b",
  },
  text: {
    primary: "#f8fafc",
    secondary: "#cbd5e1",
    tertiary: "#94a3b8",
    inverse: "#0f172a",
  },
  border: {
    primary: "#334155",
    secondary: "#475569",
    accent: "#3b82f6",
  },
  status: {
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#3b82f6",
    running: "#10b981",
    idle: "#6b7280",
  },
  interactive: {
    primary: "#3b82f6",
    secondary: "#64748b",
    hover: "#60a5fa",
    active: "#93c5fd",
    disabled: "#475569",
  },
  accent: {
    primary: "#3b82f6",
    secondary: "#8b5cf6",
    tertiary: "#06b6d4",
  },
};

export type Theme = "light" | "dark";

export const getThemeColors = (theme: Theme): ThemeColors => {
  return theme === "light" ? lightTheme : darkTheme;
};
