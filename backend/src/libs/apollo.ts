import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "@apollo/server-plugin-landing-page-graphql-playground";
import {
	UserResolver,
	StaffMembersResolver,
	MotherResolver,
	KindergardenResolver,
	GroupsResolver,
	FatherResolver,
	ContactResolver,
	ChildrenResolver,
	AttendanceResolver
} from "@graphql/resolvers";
import { buildSchemaSync } from "type-graphql";
import { LogAccess } from "@root/middleware/LogAccess";
import { ActivityLogResolver } from "@root/graphql/resolvers/ActivityLog";
import { httpServer } from "@root/server";

export const apolloServer = new ApolloServer<AppContext>({
	schema: buildSchemaSync({
		resolvers: [
			UserResolver,
			StaffMembersResolver,
			MotherResolver,
			KindergardenResolver,
			GroupsResolver,
			FatherResolver,
			ContactResolver,
			ChildrenResolver,
			AttendanceResolver,
			ActivityLogResolver
		],
		validate: false,
		globalMiddlewares: [LogAccess]
	}),
	plugins: [
		ApolloServerPluginDrainHttpServer({ httpServer }),
		ApolloServerPluginLandingPageGraphQLPlayground({})
	]
});
