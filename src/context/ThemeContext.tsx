import React, { ReactElement, ReactNode, useEffect } from 'react';

type ThemeContextOutput = {
  darkMode: boolean;
};

const ThemeContext = React.createContext<ThemeContextOutput | undefined>(
  undefined
);

export const ThemeProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  const [state, setState] = React.useState<boolean>(darkmode.inDarkMode);

  useEffect(() => {
    // MutationObserver may not trigger in rare cases on page load
    // Look at localStorage as failsafe
    const inDarkModeLocalStorage = localStorage.getItem(
      'bs.prefers-color-scheme'
    );
    if (inDarkModeLocalStorage !== undefined) {
      setState(inDarkModeLocalStorage === 'dark' ? true : false);
    }
  }, []);

  useEffect(() => {
    // Observe theme change and update React state
    // Reactive switching of theme for React components that use the context
    const targetNode = document.documentElement;
    const observer = new MutationObserver((x) => {
      const node = x?.[0].target as HTMLElement;
      if (node.className === 'dark') {
        setState(true);
      } else if (node.className === 'light') {
        setState(false);
      }
    });
    observer.observe(targetNode, { attributes: true });
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ darkMode: state }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextOutput => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
