declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    REDIS_URL: string;
    REDIS_PASSWORD: string;
    CORS_ORIGIN: string;
    SESSION_SECRET: string;
    REDIS_PORT: string;
  }
}
