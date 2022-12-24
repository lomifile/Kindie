import { buildSchema } from "type-graphql";

import { ChildrenResolver } from "../graphql/resolvers/Children";
import { ContactResolver } from "../graphql/resolvers/Contact";
import { FatherResolver } from "../graphql/resolvers/Father";
import { GroupsResolver } from "../graphql/resolvers/Groups";
import { KindergardenResolver } from "../graphql/resolvers/Kindergarden";
import { MotherResolver } from "../graphql/resolvers/Mother";
import { StaffMembersResolver } from "../graphql/resolvers/StaffMembers";
import { UserResolver } from "../graphql/resolvers/User";
import { AttendanceResolver } from "../graphql/resolvers";

export const createSchema = async () =>
	await buildSchema({
		resolvers: [
			UserResolver,
			KindergardenResolver,
			GroupsResolver,
			ChildrenResolver,
			StaffMembersResolver,
			FatherResolver,
			MotherResolver,
			ContactResolver,
			AttendanceResolver
		],
		authChecker: ({ context: { req } }) => {
			return !!req.session.userId;
		}
	});
