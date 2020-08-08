declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_GA_TOKEN: string;
      REACT_APP_BUILD_HASH: string;
      NODE_ENV: 'development' | 'production';
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
