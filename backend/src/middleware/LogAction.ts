import { ActivityLog } from "@root/orm/entities/ActivityLog";
import { MiddlewareFn, ResolverData } from "type-graphql";

export const LogAction: MiddlewareFn<AppContext> = async (
	{ info, context, args }: ResolverData<AppContext>,
	next
) => {
	const userId = context.req.session.userId;
	const kindergardenId = context.req.session.selectedKindergarden;
	const groupId = context.req.session.selectedGroup;
	await ActivityLog.insert({
		userId,
		args,
		kindergardenId,
		groupId,
		action: {
			function: info.fieldName,
			type: info.path.typename
		}
	});
	return next();
};
