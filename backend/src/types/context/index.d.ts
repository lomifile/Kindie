import { Request, Response } from "express";
import type {
  Session as ExpressSessionType,
  SessionData as ExpressSessionDataType,
} from "express-session";
import { Redis } from "ioredis";

declare global {
  export type SessionType = ExpressSessionType &
    Partial<ExpressSessionDataType> & {
      userId: number | undefined;
      selectedKindergarden: number | undefined;
      selectedChildren: number | undefined;
      selectedGroup: number | undefined;
    };
  export interface AppContext {
    req: Request & {
      session: SessionType;
    };
    res: Response;
    redis: Redis;
  }
}

export {};
