//declaro el namespace NodeJS con la interface ProcessEnv para poder tener acceso a todas las variables process.env desde cualquier lugar de mi app y no tener que estar recordando como se llaman

declare namespace NodeJS {
  interface ProcessEnv {
    DB_HOST: string;
    DB_PORT: number;
    DB_USER: string;
    DB_PASS: string;
    DB_DIALECT: string;
    DB_NAME_TEST: string;
    DB_NAME_DEVELOPMENT: string;
    DB_NAME_PRODUCTION: string;
  }
}
