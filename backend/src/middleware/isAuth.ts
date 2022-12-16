import { MiddlewareFn } from "type-graphql";

/**
 *
 * isAuth: Checks if user is authenticated in session object
 *
 * @param { context }
 * @param next
 * @return Promise<any>
 */

export const isAuth: MiddlewareFn<AppContext> = ({ context }, next) => {
    if (!context.req.session.userId) {
        throw new Error("Not authenticated");
    }
    return next();
};
