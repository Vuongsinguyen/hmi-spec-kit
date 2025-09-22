import React, { createContext, useContext, useState, useEffect } from 'react';

const themes = {
  standard: {
    name: 'Standard',
    colors: {
      primary: '#007bff',
      secondary: '#6c757d',
      success: '#28a745',
      danger: '#dc3545',
      warning: '#ffc107',
      info: '#17a2b8',
      light: '#f8f9fa',
      dark: '#343a40',
      background: '#ffffff',
      surface: '#ffffff',
      text: '#212529',
      textSecondary: '#6c757d',
      border: '#dee2e6',
      shadow: 'rgba(0, 0, 0, 0.1)',
    },
    borderRadius: '4px',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  },
  darkNight: {
    name: 'Dark Night',
    colors: {
      primary: '#6c757d',
      secondary: '#495057',
      success: '#28a745',
      danger: '#dc3545',
      warning: '#ffc107',
      info: '#17a2b8',
      light: '#495057',
      dark: '#212529',
      background: '#121212',
      surface: '#1e1e1e',
      text: '#ffffff',
      textSecondary: '#adb5bd',
      border: '#495057',
      shadow: 'rgba(0, 0, 0, 0.3)',
    },
    borderRadius: '4px',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  },
  hmiClassic: {
    name: 'HMI Classic',
    colors: {
      primary: '#6c757d',
      secondary: '#9ca3af',
      success: '#10b981',
      danger: '#ef4444',
      warning: '#f59e0b',
      info: '#3b82f6',
      light: '#e5e7eb',
      dark: '#374151',
      background: '#f3f4f6',
      surface: '#ffffff',
      text: '#111827',
      textSecondary: '#6b7280',
      border: '#d1d5db',
      shadow: 'rgba(0, 0, 0, 0.1)',
    },
    borderRadius: '0px',
    fontFamily: '"Courier New", monospace',
  },
  hmiFuture: {
    name: 'HMI Future',
    colors: {
      primary: 'rgba(255, 255, 255, 0.2)',
      secondary: 'rgba(255, 255, 255, 0.1)',
      success: 'rgba(34, 197, 94, 0.8)',
      danger: 'rgba(239, 68, 68, 0.8)',
      warning: 'rgba(245, 158, 11, 0.8)',
      info: 'rgba(59, 130, 246, 0.8)',
      light: 'rgba(255, 255, 255, 0.1)',
      dark: 'rgba(255, 255, 255, 0.8)',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      surface: 'rgba(255, 255, 255, 0.1)',
      text: '#ffffff',
      textSecondary: 'rgba(255, 255, 255, 0.7)',
      border: 'rgba(255, 255, 255, 0.2)',
      shadow: 'rgba(0, 0, 0, 0.2)',
    },
    borderRadius: '20px',
    fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
    backdropFilter: 'blur(20px)',
    glassEffect: true,
  },
};

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState('standard');

  useEffect(() => {
    // Apply theme to CSS variables
    const theme = themes[currentTheme];
    const root = document.documentElement;

    // Set data-theme attribute for theme-specific styling
    root.setAttribute('data-theme', currentTheme);

    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });

    root.style.setProperty('--border-radius', theme.borderRadius);
    root.style.setProperty('--font-family', theme.fontFamily);

    if (theme.backdropFilter) {
      root.style.setProperty('--backdrop-filter', theme.backdropFilter);
    }
    if (theme.glassEffect) {
      root.style.setProperty('--glass-effect', 'true');
    } else {
      root.style.setProperty('--glass-effect', 'false');
    }

    // Apply background for future theme
    if (currentTheme === 'hmiFuture') {
      document.body.style.background = theme.colors.background;
      document.body.style.backgroundAttachment = 'fixed';
    } else {
      document.body.style.background = theme.colors.background;
      document.body.style.backgroundAttachment = 'initial';
    }
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{
      currentTheme,
      setCurrentTheme,
      themes,
      theme: themes[currentTheme]
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}