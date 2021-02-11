import { Request, Response } from "express";
import { Session, SessionData } from "express-session";
import { Redis } from "ioredis";

export type AppContext = {
  req: Request & {
    session: Session &
      Partial<SessionData> & {
        userId: number;
        selectedKindergarden: number;
        selectedGroup: number;
      };
  };
  res: Response;
  redis: Redis;
};
