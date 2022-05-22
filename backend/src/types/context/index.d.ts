import { Request, Response } from "express";
import { Session, SessionData } from "express-session";
import { Redis } from "ioredis";

declare global {
  export interface AppContext {
    req: Request & {
      session: Session &
        Partial<SessionData> & {
          userId: number;
          selectedKindergarden: number | undefined;
          selectedChildren: number;
          selectedGroup: number;
        };
    };
    res: Response;
    redis: Redis;
  }
}

export {};
