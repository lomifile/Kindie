import { MiddlewareFn } from "type-graphql";

export const isKinderGardenSelected: MiddlewareFn<AppContext> = (
  { context },
  next
) => {
  if (!context.req.session.selectedKindergarden) {
    throw new Error("Kindergraden not selected");
  }
  return next();
};
