import React, { ReactElement, ReactNode } from 'react';

const LOCAL_STORAGE_KEY = 'site-preferences';

interface ISettings {
  hideMinorTracks: boolean;
  distinctKmstVersion: boolean;
  jsonOptimizedTrackIdCopy: boolean;
}

type SettingsContextOutput = {
  settings: ISettings;
  setSettings: (s: ISettings) => void;
};

const SettingsContext = React.createContext<SettingsContextOutput | undefined>(
  undefined
);

const defaultSettings: ISettings = {
  hideMinorTracks: false,
  distinctKmstVersion: false,
  jsonOptimizedTrackIdCopy: false,
};

function getDefaultSettings(): ISettings {
  const prefsJson = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (prefsJson === null) {
    const defaultPrefs = defaultSettings;
    setLocalStorage(defaultPrefs);
    return defaultPrefs;
  } else {
    const parsedPrefs = JSON.parse(prefsJson) as ISettings;
    return parsedPrefs;
  }
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
