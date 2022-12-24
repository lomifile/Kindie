import { graphql, GraphQLSchema } from "graphql";
import { Maybe } from "graphql/jsutils/Maybe";
import { createSchema } from "../utils/createSchema";

interface Options {
	source: string;
	variableValues?: Maybe<{
		[key: string]: unknown;
	}>;
	userId?: number;
	selectedKindergarden?: number;
	selectedGroup?: number;
}

let schema: GraphQLSchema;

export const gCall = async ({
	source,
	variableValues,
	userId,
	selectedKindergarden,
	selectedGroup
}: Options) => {
	if (!schema) {
		schema = await createSchema();
	}

	return graphql({
		schema,
		source,
		variableValues,
		contextValue: {
			req: {
				session: {
					userId,
					selectedGroup,
					selectedKindergarden,
					destroy: jest.fn().mockImplementation((fn) => fn(false))
				} as unknown as SessionType
			},
			res: {
				clearCookie: jest.fn()
			}
		}
	});
};
