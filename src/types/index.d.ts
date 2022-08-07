export class DarkMode {
  setDarkMode(darkMode: boolean, doSave = true): void;
  inDarkMode(): boolean;
}

declare global {
  const darkmode: DarkMode;
}
