import { MiddlewareFn } from "type-graphql";

export const isGroupSelected: MiddlewareFn<AppContext> = (
	{ context },
	next
) => {
	if (!context.req.session.selectedGroup) {
		throw new Error("Group not selected");
	}
	return next();
};
