declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    REDIS_URL: string;
    CORS_ORIGIN: string;
    SESSION_SECRET: string;
    REDIS_PORT: string;
    NODE_ENV: string;
    NODEMAILER_EMAIL: string;
    NODEMAILER_PASSWORD: string;
  }
}