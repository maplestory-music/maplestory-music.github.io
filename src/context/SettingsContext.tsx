import React, { ReactElement, ReactNode, useEffect } from 'react';

const LOCAL_STORAGE_KEY = 'site-preferences';

interface ISettings {
  hideMinorTracks: boolean;
}

type SettingsContextOutput = {
  settings: ISettings;
  setSettings: (s: ISettings) => void;
};

const SettingsContext = React.createContext<SettingsContextOutput | undefined>(
  undefined
);

function getDefaultSettings(): ISettings {
  return {
    hideMinorTracks: false,
  };
}

function setLocalStorage(prefs: ISettings): void {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(prefs));
}

export const SettingsProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  const [prefs, setPrefs] = React.useState<ISettings>(getDefaultSettings());

  const persistSettings = (prefs: ISettings) => {
    setPrefs(prefs);
    setLocalStorage(prefs);
  };

  useEffect(() => {
    const prefsJson = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (prefsJson === null) {
      const defaultPrefs = getDefaultSettings();
      setLocalStorage(defaultPrefs);
      setPrefs(defaultPrefs);
    } else {
      const parsedPrefs = JSON.parse(prefsJson) as ISettings;
      setPrefs(parsedPrefs);
    }
  }, []);

  return (
    <SettingsContext.Provider
      value={{ settings: prefs, setSettings: persistSettings }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextOutput => {
  const context = React.useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
