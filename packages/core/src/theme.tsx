import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { DesignTokens, defaultTokens, darkTokens } from './tokens';
import { mergeTokens, tokensToCSS, generateCSSString } from './css-vars';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeContextValue {
  tokens: DesignTokens;
  mode: ThemeMode;
  resolvedMode: 'light' | 'dark';
  setMode: (mode: ThemeMode) => void;
  setTokens: (tokens: Partial<DesignTokens>) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export interface ThemeProviderProps {
  children: ReactNode;
  defaultMode?: ThemeMode;
  customTokens?: Partial<DesignTokens>;
  storageKey?: string;
  attribute?: string;
  enableSystem?: boolean;
}

/**
 * Hook to access the current theme context
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

/**
 * Hook to get CSS variables for the current theme
 */
export function useThemeCSS(): Record<string, string> {
  const { tokens } = useTheme();
  return tokensToCSS(tokens);
}

/**
 * Theme provider component that manages theme state and injects CSS variables
 */
export function ThemeProvider({
  children,
  defaultMode = 'system',
  customTokens = {},
  storageKey = 'pixelforge-theme',
  attribute = 'data-theme',
  enableSystem = true,
}: ThemeProviderProps) {
  const [mode, setModeState] = useState<ThemeMode>(defaultMode);
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light');
  const [customThemeTokens, setCustomThemeTokens] =
    useState<Partial<DesignTokens>>(customTokens);

  // Determine the resolved theme mode
  const resolvedMode = mode === 'system' ? systemTheme : mode;

  // Merge base tokens with dark overrides and custom tokens
  const baseTokens =
    resolvedMode === 'dark'
      ? mergeTokens(defaultTokens, darkTokens)
      : defaultTokens;

  const tokens = mergeTokens(baseTokens, customThemeTokens);

  // Load theme from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored && ['light', 'dark', 'system'].includes(stored)) {
        setModeState(stored as ThemeMode);
      }
    } catch (error) {
      console.warn('Failed to load theme from localStorage:', error);
    }
  }, [storageKey]);

  // Listen for system theme changes
  useEffect(() => {
    if (!enableSystem) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    function handleChange(e: MediaQueryListEvent) {
      setSystemTheme(e.matches ? 'dark' : 'light');
    }

    setSystemTheme(mediaQuery.matches ? 'dark' : 'light');

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, [enableSystem]);

  // Update DOM attribute and CSS variables when theme changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const root = window.document.documentElement;

    // Set data attribute
    root.setAttribute(attribute, resolvedMode);

    // Inject CSS variables
    const cssVars = tokensToCSS(tokens);
    Object.entries(cssVars).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });

    return () => {
      // Cleanup: remove our CSS variables
      Object.keys(cssVars).forEach(property => {
        root.style.removeProperty(property);
      });
    };
  }, [resolvedMode, tokens, attribute]);

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);

    try {
      window.localStorage.setItem(storageKey, newMode);
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
    }
  };

  const setTokens = (newTokens: Partial<DesignTokens>) => {
    setCustomThemeTokens((prev: Partial<DesignTokens>) =>
      mergeTokens(prev as DesignTokens, newTokens)
    );
  };

  const contextValue: ThemeContextValue = {
    tokens,
    mode,
    resolvedMode,
    setMode,
    setTokens,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Component to generate and inject CSS for themes (useful for SSR)
 */
export interface ThemeStylesProps {
  tokens?: DesignTokens;
  darkTokens?: Partial<DesignTokens>;
}

export function ThemeStyles({
  tokens = defaultTokens,
  darkTokens: customDarkTokens = darkTokens,
}: ThemeStylesProps) {
  const lightCSS = generateCSSString(tokensToCSS(tokens), ':root');
  const darkMerged = mergeTokens(tokens, customDarkTokens);
  const darkCSS = generateCSSString(
    tokensToCSS(darkMerged),
    '[data-theme="dark"]'
  );

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `${lightCSS}\n\n${darkCSS}`,
      }}
    />
  );
}
