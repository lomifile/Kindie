declare namespace NodeJS {
  interface ProcessEnv {
    REDIS_URL: string;
    REDIS_PORT: string;
    REDIS_PASSWORD: string;
    PORT: string;
    SESSION_SECRET: string;
    CORS_ORIGIN: string;
  }
}
