import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
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
import { redis } from "@libs/redis";

export const apolloServer = new ApolloServer({
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
			AttendanceResolver
		],
		validate: false
	}),
	plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
	context: ({ req, res }) => ({ req, res, redis })
});
