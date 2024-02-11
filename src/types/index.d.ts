export class DarkMode {
  setDarkMode(darkMode: boolean, doSave = true): void;
  get inDarkMode(): boolean;
}

declare global {
  const darkmode: DarkMode;
}
